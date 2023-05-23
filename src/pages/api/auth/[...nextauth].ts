import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '@utils/authUtils'
import { NextAuthOptions, RequestInternal } from 'next-auth'
import { ethers } from 'ethers'

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      async authorize(credentials: {
        username: string
        password: string
        signedNonce?: string
        address_wallet?: string
      }) {
        const prisma = new PrismaClient()
        prisma.$connect()
        if (!credentials) return null

        const { username, password, signedNonce, address_wallet } = credentials

        let user
        if (address_wallet && signedNonce) {
          user = await prisma.users.findFirst({
            where: { address_wallet: address_wallet },
            include: {
              nonce: true
            }
          })

          if (!user) {
            prisma.$disconnect()
            throw new Error('No user found')
          }
          const signerAddress = ethers.verifyMessage(
            user.nonce?.nonce!,
            signedNonce
          )

          if (signerAddress !== user.address_wallet) {
            prisma.$disconnect()
            throw new Error('Something wrong happened!')
          }

          // Check that the nonce is not expired
          if (user.nonce?.expires! < new Date()) {
            prisma.$disconnect()
            throw new Error('Token has expired!')
          }
        } else {
          user = await prisma.users.findFirst({
            where: { username: username }
          })

          if (!user) {
            prisma.$disconnect()
            return
            // throw new Error('No user found')
          }

          const isValid = await verifyPassword(password, user.password)
          if (!isValid) {
            prisma.$disconnect()
            return
            // throw new Error('Could not log you in')
          }
        }

        // Compute the signer address from the saved nonce and the received signature

        // Check that the signer address matches the public address
        //  that is trying to sign in

        // Everything is fine, clear the nonce and return the user
        // await prisma.crypto_nonce.delete({ where: { id: user.nonce_id! } })
        //-----------------------------------------

        prisma.$disconnect()
        return {
          name: user.id,
          image: user.avatar,
          email: user.role,
          walletAddress: user.address_wallet
        }
      }
    })
  ]
}

export default NextAuth(authOptions)

import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '@utils/authUtils'
import { NextAuthOptions } from 'next-auth'
import { ethers } from 'ethers'

export const authOptions: NextAuthOptions = {
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.walletAddress = user.walletAddress
      }
      return token
    },
    session({ session, token }) {
      /* Step 2: update the session.user based on the token object */
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.walletAddress = token.walletAddress
      }
      return session
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        signedNonce: { label: 'Signed Nonce', type: 'text' },
        address_wallet: {
          label: 'Address Wallet',
          type: 'text',
          placeholder: '0x...'
        }
      },
      async authorize(credentials) {
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
            return null
            // throw new Error('No user found')
          }

          const isValid = await verifyPassword(password, user.password)
          if (!isValid) {
            prisma.$disconnect()
            return null
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
          id: user.id.toString(),
          name: user.username,
          image: user.avatar,
          email: user.email,
          walletAddress: user.address_wallet,
          role: user.role
        }
      }
    })
  ]
}

export default NextAuth(authOptions)

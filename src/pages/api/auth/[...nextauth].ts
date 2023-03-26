import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '@utils/authUtils'
import { NextAuthOptions } from 'next-auth'

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
        role: string
      }) {
        const prisma = new PrismaClient()
        prisma.$connect()
        let user
        if (credentials!.role === 'candidate') {
          user = await prisma.candidates.findFirst({
            where: { username: credentials!.username }
          })
        } else {
          user = await prisma.recruiters.findFirst({
            where: { username: credentials!.username }
          })
        }
        if (!user) {
          prisma.$disconnect()
          throw new Error('No user found')
        }

        const isValid = await verifyPassword(
          credentials!.password,
          user.password
        )
        if (!isValid) {
          prisma.$disconnect()
          throw new Error('Could not log you in')
        }
        console.log(isValid)
        prisma.$disconnect()
        return { name: user.id, image: user.avatar, email: user.role }
      }
    })
  ]
}

export default NextAuth(authOptions)

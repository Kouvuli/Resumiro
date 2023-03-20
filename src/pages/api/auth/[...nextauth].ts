import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { verifyPassword } from '@utils/authUtils'

export default NextAuth({
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        domain: {
          label: 'Domain',
          type: 'text ',
          placeholder: 'CORPNET',
          value: 'CORPNET'
        },
        username: { label: 'Username', type: 'text ', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const prisma = new PrismaClient()
        prisma.$connect()

        const user = await prisma.candidates.findFirst({
          where: { username: credentials!.username }
        })

        if (!user) {
          throw new Error('No user found')
        }

        const isValid = verifyPassword(credentials!.password, user.password)
        if (!isValid) {
          throw new Error('Could not log you in')
        }
        prisma.$disconnect()
        return { username: user.username }
      }
    })
  ]
})

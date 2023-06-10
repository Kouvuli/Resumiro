// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@utils/authUtils'
import { randomToken } from '@utils/cryptoUtil'
type Data = {
  message: string
  status: string
  data?: any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return
  }
  const { username, password, address_wallet, role } = req.body
  const prisma = new PrismaClient()
  prisma.$connect()

  if (!username || !password || !address_wallet) {
    res.status(400).json({
      message: 'Missing username, password or wallet address',
      status: 'error'
    })
    return
  }

  let newUser
  const hashedPassword = await hashPassword(password)

  const existingUser = await prisma.users.findFirst({
    where: {
      username: username
    }
  })
  if (existingUser) {
    res.status(400).json({
      message: 'User already exists',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  newUser = await prisma.users
    .create({
      data: {
        username: username,
        password: hashedPassword,
        address_wallet: address_wallet,
        role: role,
        room: {
          create: {
            token: randomToken()
          }
        }
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'Internal server error',
        status: 'error'
      })
      prisma.$disconnect()
      return
    })

  prisma.$disconnect()
  res
    .status(201)
    .json({ data: newUser, message: 'Successfully create user', status: 'ok' })
  return
}

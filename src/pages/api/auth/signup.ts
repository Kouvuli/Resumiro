// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@utils/authUtils'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password, address_wallet } = req.body

  const prisma = new PrismaClient()
  prisma.$connect()

  if (!username || !password) {
    res.status(400).json({
      message: 'Missing username or password',
      status: 'error'
    })
    return
  }

  prisma.$connect()

  const existingUser = await prisma.candidates.findFirst({
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

  const hashedPassword = await hashPassword(password)
  const newUser = await prisma.candidates
    .create({
      data: {
        username: username,
        password: hashedPassword,
        address_wallet: address_wallet,
        role: 'candidate'
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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, roles } from '@prisma/client'
import { hashPassword } from '@utils/authUtils'
import { getToken } from 'next-auth/jwt'
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

  if (!username || !password) {
    res.status(400).json({
      message: 'Missing username or password',
      status: 'error'
    })
    return
  }

  prisma.$connect()

  let newUser
  const hashedPassword = await hashPassword(password)

  if (role === 'candidate') {
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
    newUser = await prisma.candidates
      .create({
        data: {
          username: username,
          password: hashedPassword,
          address_wallet: address_wallet,

          role: roles.candidate
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
  } else {
    const existingUser = await prisma.recruiters.findFirst({
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

    if (role === 'admin_recruiter') {
      newUser = await prisma.recruiters
        .create({
          data: {
            username: username,
            password: hashedPassword,
            address_wallet: address_wallet,

            role: roles.recruiter,
            is_admin: true
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
    } else {
      newUser = await prisma.recruiters
        .create({
          data: {
            username: username,
            password: hashedPassword,
            address_wallet: address_wallet,

            role: roles.recruiter,
            is_admin: false
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
    }
  }
  prisma.$disconnect()
  res
    .status(201)
    .json({ data: newUser, message: 'Successfully create user', status: 'ok' })
  return
}

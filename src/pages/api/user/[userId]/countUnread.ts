import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  const { userId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(userId)
    const user = await prisma.notifications_users
      .count({
        where: {
          AND: [
            { user_id: id },
            {
              is_read: false
            }
          ]
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something went wrong',
          status: 'error'
        })
        prisma.$disconnect()
        return
      })
    if (!user) {
      res.status(200).json({
        message: 'Successfully count user notification',
        status: 'ok',
        data: 0
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully count user notification',
      status: 'ok',
      data: user
    })
    prisma.$disconnect()
    return
  }
}

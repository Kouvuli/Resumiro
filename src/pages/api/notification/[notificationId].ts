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
  const { notificationId } = req.query
  prisma.$connect()
  let id = Number(notificationId)

  if (req.method === 'DELETE') {
    const data = await prisma.notifications
      .delete({
        where: {
          id: id
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
    if (!data) {
      res.status(404).json({
        message: 'Cannot delete notification',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully deleted notification',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

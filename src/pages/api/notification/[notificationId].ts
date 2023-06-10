import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }

  const { notificationId } = req.query
  prisma.$connect()
  let id = Number(notificationId)

  if (req.method === 'DELETE') {
    await prisma.notifications_users.deleteMany({
      where: {
        notification_id: id
      }
    })
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

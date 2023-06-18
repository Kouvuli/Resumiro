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

  const { userId } = req.query
  prisma.$connect()
  let id = Number(userId)

  if (req.method === 'PATCH') {
    if (Number(session.user?.id) !== id) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }

    const user = await prisma.notifications_users
      .updateMany({
        where: { user_id: id },
        data: {
          is_read: true
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
      res.status(404).json({
        message: 'Cannot read all user notifications',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully read user notifications',
      status: 'ok',
      data: user
    })
    prisma.$disconnect()
    return
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
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
  const prisma = new PrismaClient()
  const { userId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(userId)
    const user = await prisma.users
      .findFirst({
        where: { id: id },
        include: {
          room: true
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
        message: 'Cannot get user room token',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get user room token',
      status: 'ok',
      data: user.room?.token
    })
    prisma.$disconnect()
    return
  }
}

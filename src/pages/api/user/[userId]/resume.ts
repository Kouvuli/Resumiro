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
    const user = await prisma.resumes
      .findMany({
        where: { owner_id: id },
        orderBy: {
          create_at: 'desc'
        },
        include: {
          owner: true
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
        message: 'Cannot get user resumes',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get user resumes',
      status: 'ok',
      data: user
    })
    prisma.$disconnect()
    return
  }
}

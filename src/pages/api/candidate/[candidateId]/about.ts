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

  if (!session || session.user?.role !== 'candidate') {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const prisma = new PrismaClient()
  const { candidateId } = req.query
  prisma.$connect()
  if (req.method === 'PATCH') {
    const { about } = req.body
    if (Number(session.user?.id) !== Number(candidateId)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const data = await prisma.users.update({
      where: {
        id: Number(candidateId)
      },
      data: {
        about: about
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update about for candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully update about for candidate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

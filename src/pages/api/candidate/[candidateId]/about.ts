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
  const { candidateId } = req.query
  prisma.$connect()
  if (req.method === 'PATCH') {
    const { about } = req.body

    const data = await prisma.candidates.update({
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

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
  const { recruiterId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(recruiterId)
    const recruiter = await prisma.recruiters
      .findFirst({
        where: { id: id },
        include: {
          company: true
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
    if (!recruiter) {
      res.status(404).json({
        message: 'Recruiter not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get recruiter',
      status: 'ok',
      data: recruiter
    })
    prisma.$disconnect()
    return
  }
}

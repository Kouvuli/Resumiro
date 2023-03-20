import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type Data = {
  message: string
  status: string
  pagination?: object
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'GET') {
    const { page, limit } = req.query
    let p = Number(page)
    let l = Number(limit)
    const data = await prisma.resumes.findMany({
      skip: p ? (p - 1) * l : 0,
      take: l ? l : 10,
      orderBy: {
        create_at: 'desc'
      }
    })

    const totalResumes = await prisma.resumes.count()
    res.status(200).json({
      message: 'Successfully get resumes',
      status: 'ok',
      pagination: {
        total: Math.round(totalResumes / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

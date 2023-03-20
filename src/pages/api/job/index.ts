import type { NextApiRequest, NextApiResponse } from 'next'
import { jobs, PrismaClient } from '@prisma/client'
export type Data = {
  message: string
  status: string
  pagination?: {
    total: string
    page?: string | string[]
    limit?: string | string[]
  }
  data: jobs[]
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
    const data = await prisma.jobs.findMany({
      skip: p ? (p - 1) * l : 0,
      take: l ? l : 10,
      orderBy: {
        create_at: 'desc'
      },
      include: {
        company: true
      }
    })

    const totalJobs = await prisma.jobs.count()
    res.status(200).json({
      message: 'Successfully get jobs',
      status: 'ok',
      pagination: {
        total: Math.round(totalJobs / l).toString(),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

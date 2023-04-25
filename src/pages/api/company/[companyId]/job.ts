import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
export type Data = {
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
    const { companyId, page = 1, limit = 8 } = req.query
    let p = Number(page)
    let l = Number(limit)

    const data = await prisma.jobs.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        company_id: Number(companyId)
      },

      include: {
        company: true,
        location: true
      }
    })

    const totalJobs = await prisma.jobs.count({
      where: {
        company_id: Number(companyId)
      }
    })
    res.status(200).json({
      message: 'Successfully get jobs of company',
      status: 'ok',
      pagination: {
        total: Math.round(totalJobs / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

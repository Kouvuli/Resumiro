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
    const { page, limit, location } = req.query
    let p = Number(page)
    let l = Number(limit)
    let data
    if (location !== undefined && location !== '') {
      data = await prisma.companies.findMany({
        skip: p ? (p - 1) * l : 0,
        take: l ? l : 10,
        where: {
          location: {
            name: location
          }
        },
        orderBy: {
          name: 'asc'
        },
        include: {
          jobs: true,
          location: true
        }
      })
    }
    data = await prisma.companies.findMany({
      skip: p ? (p - 1) * l : 0,
      take: l ? l : 10,

      orderBy: {
        name: 'asc'
      },
      include: {
        jobs: true,
        location: true
      }
    })

    const totalCompanies = await prisma.companies.count()
    res.status(200).json({
      message: 'Successfully get companies',
      status: 'ok',
      pagination: {
        total: Math.round(totalCompanies / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

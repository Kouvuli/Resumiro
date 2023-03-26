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
    const {
      page = 1,
      limit = 9,
      location = 'Ho_Chi_Minh',
      order_by = 'alphabet_asc',
      q
    } = req.query
    let p = Number(page)
    let l = Number(limit)
    let data
    let locationId
    if (location && location !== '') {
      if (location === 'Ho_Chi_Minh') {
        locationId = 1
      } else if (location === 'Ha_Noi') {
        locationId = 2
      } else if (location === 'Da_Nang') {
        locationId = 3
      }
    }

    data = await prisma.companies.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        AND: [
          {
            location_id: locationId
          },
          {
            name: {
              search: q?.toString()
            }
          }
        ]
      },

      include: {
        jobs: true,
        location: true
      }
    })

    if (order_by === 'alphabet') {
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    }

    const totalCompanies = await prisma.companies.count({
      where: {
        location_id: locationId,
        name: {
          search: q?.toString()
        }
      }
    })
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

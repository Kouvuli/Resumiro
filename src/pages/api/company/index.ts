import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
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
  const session = await getServerSession(req, res, authOptions)

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
    let qArr: any
    if (q !== '' || q !== null) {
      qArr = q?.toString().split(' ')
    }

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
              search: q ? qArr.join('|') : undefined
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
          search: q ? qArr.join('|') : undefined
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
  } else if (req.method === 'POST') {
    if (!session || session.user?.role !== 'admin') {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const { name, logo, background, about, location_id, scale } = req.body

    const user = await prisma.users.findFirst({
      where: {
        id: Number(session.user?.id)
      }
    })
    if (user?.company_id !== null) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }

    let data = await prisma.companies.create({
      data: {
        name: name,
        logo: logo,
        background: background,
        about: about,
        location_id: location_id,
        scale: scale
      }
    })
    if (!data) {
      res.status(400).json({
        message: 'Cannot create company',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully create company',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

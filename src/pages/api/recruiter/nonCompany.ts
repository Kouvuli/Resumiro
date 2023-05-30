import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
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
  const session = await getServerSession(req, res, authOptions)

  if (!session || session.user?.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'GET') {
    const { q, page = 1, limit = 8 } = req.query
    let p = Number(page)
    let l = Number(limit)
    let qList: any = []
    if (q !== '' || q !== null) {
      qList = q?.toString().split(' ')
    }

    const data = await prisma.users.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        AND: [
          {
            company_id: null
          },

          {
            username: {
              search: q ? qList.join('|') : undefined
            }
          }
        ]
      }
    })

    const totalRecruiters = await prisma.users.count({
      where: {
        AND: [
          {
            company_id: null
          },
          {
            username: {
              search: q ? qList.join('|') : undefined
            }
          }
        ]
      }
    })
    res.status(200).json({
      message: 'Successfully get companies',
      status: 'ok',
      pagination: {
        total: Math.round(totalRecruiters / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

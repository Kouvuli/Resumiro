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
  const { receiverId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    const { page = 1, limit = 9, q } = req.query
    let p = Number(page)
    let l = Number(limit)
    let qArr: any
    if (q !== '' || q !== null) {
      qArr = q?.toString().split(' ')
    }
    const data = await prisma.request.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        AND: [
          {
            receiver_id: Number(receiverId)
          },
          {
            owner: {
              username: {
                search: q ? qArr.join('|') : undefined
              }
            }
          }
        ]
      },

      include: {
        owner: true,
        certificate: true,
        experience: true
      }
    })
    const total = await prisma.request.count({
      where: {
        AND: [
          {
            receiver_id: Number(receiverId)
          },
          {
            owner: {
              username: {
                search: q ? qArr.join('|') : undefined
              }
            }
          }
        ]
      }
    })
    res.status(200).json({
      message: 'Successfully get requests',
      status: 'ok',
      pagination: {
        total: Math.round(total / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
export type Data = {
  message: string
  status: string
  data?: any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'GET') {
    const { companyId } = req.query

    const data = await prisma.users.findFirst({
      where: {
        AND: [
          {
            company_id: Number(companyId)
          },
          {
            role: 'admin'
          }
        ]
      }
    })
    if (!data) {
      res.status(404).json({
        message: 'Admin of company not found!',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get admin of company',
      status: 'ok',

      data: data
    })
    prisma.$disconnect()
    return
  }
}

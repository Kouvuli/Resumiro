import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
type Data = {
  message: string
  status: string
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
  const { recruiterId } = req.query
  prisma.$connect()
  if (req.method === 'PATCH') {
    const { company_id } = req.body

    const data = await prisma.users.update({
      where: {
        id: Number(recruiterId)
      },
      data: {
        company_id: company_id
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update company for recruiter',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully update company for recruiter',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

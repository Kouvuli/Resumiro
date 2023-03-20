import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const prisma = new PrismaClient()
    const { companyId } = req.query
    prisma.$connect()
    let id = Number(companyId)

    const data = await prisma.companies
      .findFirst({
        where: { id: id }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something went wrong',
          status: 'error'
        })
        prisma.$disconnect()
        return
      })
    if (!data) {
      res.status(404).json({
        message: 'Company not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get company',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

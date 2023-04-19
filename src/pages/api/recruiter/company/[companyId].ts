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
  const prisma = new PrismaClient()
  const { companyId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(companyId)
    const recruiters = await prisma.recruiters
      .findMany({
        where: { AND: [{ is_admin: false }, { company_id: id }] }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something went wrong',
          status: 'error'
        })
        prisma.$disconnect()
        return
      })
    if (!recruiters) {
      res.status(404).json({
        message: 'Recruiters not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get recruiters from company id',
      status: 'ok',
      data: recruiters
    })
    prisma.$disconnect()
    return
  }
}

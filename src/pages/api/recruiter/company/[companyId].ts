import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/prisma'
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

  if (
    !session ||
    (session.user?.role !== 'recruiter' && session.user?.role !== 'admin')
  ) {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }

  const { companyId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(companyId)
    const recruiters = await prisma.users
      .findMany({
        where: { AND: [{ role: 'recruiter' }, { company_id: id }] }
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

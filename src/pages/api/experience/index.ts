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

  if (!session || session.user?.role !== 'candidate') {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'POST') {
    const { position, start, finish, company_id, user_id, source } = req.body
    const existingCandidate = await prisma.users.findFirst({
      where: {
        id: Number(user_id)
      }
    })
    const existingCompany = await prisma.companies.findFirst({
      where: {
        id: Number(company_id)
      }
    })

    if (!existingCompany) {
      res.status(404).json({
        message: 'Company not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    if (!existingCandidate) {
      res.status(404).json({
        message: 'Candidate not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    let data = await prisma.experiences.create({
      data: {
        position: position,
        start: start,
        finish: finish,
        company_id: company_id,
        user_id: user_id,
        source: source,
        status: 'pending'
      }
    })
    if (!data) {
      res.status(400).json({
        message: 'Cannot create experience',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully create experience',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

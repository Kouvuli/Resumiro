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
  prisma.$connect()
  if (req.method === 'POST') {
    const { name, verified_at, candidate_id, source } = req.body
    const existingCandidate = await prisma.users.findFirst({
      where: {
        id: Number(candidate_id)
      }
    })

    if (!existingCandidate) {
      res.status(404).json({
        message: 'Candidate not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    let data = await prisma.certificates.create({
      data: {
        name: name,
        verified_at: new Date(verified_at),
        user_id: Number(candidate_id),
        source: source,
        status: 'pending'
      }
    })
    if (!data) {
      res.status(400).json({
        message: 'Cannot create certificate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully create certificate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

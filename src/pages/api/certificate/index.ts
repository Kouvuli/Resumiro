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

  if (!session || session.user?.role !== 'candidate') {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  prisma.$connect()
  if (req.method === 'POST') {
    const { name, verified_at, candidate_id, source } = req.body
    if (Number(candidate_id) !== Number(session.user.id)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

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

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
    const { candidateId } = req.query
    prisma.$connect()
    let id = Number(candidateId)

    const candidate = await prisma.candidates
      .findFirst({
        where: { id: id },
        include: {
          resumes: true,
          candidates_skills: {
            select: {
              skill: true
            }
          },
          experiences: {
            include: {
              company: true
            }
          },
          certificates: true
        }
      })
      .catch(() => {
        res.status(500).json({
          message: 'Something went wrong',
          status: 'error'
        })
        prisma.$disconnect()
        return
      })
    if (!candidate) {
      res.status(404).json({
        message: 'Candidate not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get candidate',
      status: 'ok',
      data: candidate
    })
    prisma.$disconnect()
    return
  }
}

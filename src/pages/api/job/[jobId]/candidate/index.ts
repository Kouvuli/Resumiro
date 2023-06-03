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
  const { jobId } = req.query
  prisma.$connect()

  const existingJob = await prisma.jobs.findFirst({
    where: {
      id: Number(jobId)
    }
  })
  if (!existingJob) {
    res.status(404).json({
      message: 'Job not found',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  if (req.method === 'POST') {
    const { candidate_id } = req.body

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

    const alreadyApplyJob = await prisma.jobs_applicants.findFirst({
      where: {
        applicant_id: Number(candidate_id),
        job_id: Number(jobId)
      }
    })
    if (alreadyApplyJob) {
      res.status(400).json({
        message: 'Candidate already apply job',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.jobs_applicants.create({
      data: {
        applicant_id: Number(candidate_id),
        job_id: Number(jobId)
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot apply job for candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully apply job for candidate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

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
    const existingCandidate = await prisma.candidates.findFirst({
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

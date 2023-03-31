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
  const { jobId, candidateId } = req.query
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
  if (req.method === 'GET') {
    const data = await prisma.jobs_applicants.findFirst({
      where: {
        applicant_id: Number(candidateId),
        job_id: Number(jobId)
      }
    })
    if (!data) {
      res.status(200).json({
        message: 'Candidate not applied',
        status: 'success'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Candidate already apply job',
      status: 'success',
      data: data
    })
  } else if (req.method === 'DELETE') {
    const data = await prisma.jobs_applicants.delete({
      where: {
        job_id_applicant_id: {
          applicant_id: Number(candidateId),
          job_id: Number(jobId)
        }
      }
    })
    if (!data) {
      res.status(200).json({
        message: 'Cannot cancel applied job',
        status: 'success'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully cancel applied job',
      status: 'success',
      data: data
    })
  }
}

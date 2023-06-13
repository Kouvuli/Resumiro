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

  if (!session) {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }

  const { resumeId, recruiterId } = req.query
  prisma.$connect()

  const existingResume = await prisma.resumes.findFirst({
    where: {
      id: Number(resumeId)
    }
  })
  if (!existingResume) {
    res.status(404).json({
      message: 'Resume not found',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }
  if (req.method === 'GET') {
    const data = await prisma.resume_allowed_user.findFirst({
      where: {
        resume_id: Number(resumeId),
        user_id: Number(recruiterId)
      }
    })
    if (!data) {
      res.status(200).json({
        message: 'Resume is unable to view',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Recruiter allow to watch',
      status: 'ok',
      data: data
    })
  }
}

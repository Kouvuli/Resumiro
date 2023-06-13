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

  const { resumeId } = req.query
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

  if (req.method === 'POST') {
    const { recruiter_id } = req.body

    const existingRecruiter = await prisma.users.findFirst({
      where: {
        id: Number(recruiter_id)
      }
    })

    if (!existingRecruiter) {
      res.status(404).json({
        message: 'Recruiter not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const owner = await prisma.resumes.findFirst({
      where: {
        id: Number(resumeId),
        owner_id: Number(session.user.id)
      }
    })

    if (!owner) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const alreadyAllowed = await prisma.resume_allowed_user.findFirst({
      where: {
        user_id: Number(recruiter_id),
        resume_id: Number(resumeId)
      }
    })
    if (alreadyAllowed) {
      res.status(400).json({
        message: 'Reruiter already allowed to view',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.resume_allowed_user.create({
      data: {
        user_id: Number(recruiter_id),
        resume_id: Number(resumeId)
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot allow recruiter to view resume',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully allow recruiter to view resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

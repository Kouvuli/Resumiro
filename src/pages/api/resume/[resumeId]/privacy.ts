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
  const { resumeId } = req.query
  let id = Number(resumeId)
  const existingResume = prisma.resumes.findFirst({
    where: {
      id: id
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
  prisma.$connect()

  if (req.method === 'PATCH') {
    const { is_public } = req.body
    const user = await prisma.users.findFirst({
      where: {
        id: Number(session.user?.id)
      },
      include: {
        resumes: true
      }
    })
    let isOwned = false

    user?.resumes.forEach((item: any) => {
      if (item.id === id) {
        isOwned = true
      }
    })

    if (!isOwned) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const data = await prisma.resumes
      .update({
        where: { id: id },
        data: {
          is_public: is_public
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
    if (!data) {
      res.status(404).json({
        message: 'Cannot update resume',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully update resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

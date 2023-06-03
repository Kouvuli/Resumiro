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
  prisma.$connect()
  let id = Number(resumeId)
  if (req.method === 'DELETE') {
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
    await prisma.resume_allowed_user.deleteMany({
      where: {
        resume_id: id
      }
    })
    const data = await prisma.resumes
      .delete({
        where: {
          id: id
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
        message: 'Cannot delete resume',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully deleted resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

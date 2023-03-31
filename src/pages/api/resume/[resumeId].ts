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
  const { resumeId } = req.query
  prisma.$connect()
  let id = Number(resumeId)
  if (req.method === 'GET') {
    const data = await prisma.resumes
      .findFirst({
        where: { id: id },
        include: {
          owner: true
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
        message: 'Resume not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
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

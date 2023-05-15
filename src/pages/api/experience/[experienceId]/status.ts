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
  prisma.$connect()
  const { experienceId } = req.query
  const existingExperience = await prisma.experiences.findFirst({
    where: {
      id: Number(experienceId)
    }
  })

  if (!existingExperience) {
    res.status(404).json({
      message: 'Experience not found',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  if (req.method === 'PATCH') {
    const { status } = req.body

    if (!status) {
      res.status(400).json({
        message: 'Missing input',
        status: 'error'
      })
      return
    }

    const data = await prisma.experiences.update({
      where: {
        id: Number(experienceId!)
      },
      data: {
        status: status
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update experience status',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully updated experience status',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

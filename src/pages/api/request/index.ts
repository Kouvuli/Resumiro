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
  if (req.method === 'POST') {
    const { content, certificate_id, experience_id, receiver_id, owner_id } =
      req.body

    const existingOwner = await prisma.users.findFirst({
      where: {
        id: owner_id
      }
    })

    if (!existingOwner) {
      res.status(400).json({
        message: 'Owner not exist',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const existingReceiver = await prisma.users.findFirst({
      where: {
        id: receiver_id
      }
    })

    if (!existingReceiver) {
      res.status(400).json({
        message: 'Receiver not exist',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.request.create({
      data: {
        receiver_id: receiver_id,
        certificate_id: certificate_id,
        experience_id: experience_id,
        content: content,
        create_at: new Date(),
        owner_id: owner_id
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot create resume',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully create resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

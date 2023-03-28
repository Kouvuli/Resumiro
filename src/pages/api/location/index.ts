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
  if (req.method !== 'GET') {
    return
  }

  const data = await prisma.locations.findMany()

  if (!data) {
    res.status(400).json({
      message: 'Cannot get locations',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  res.status(200).json({
    message: 'Successfully get locations',
    status: 'ok',
    data: data
  })
  prisma.$disconnect()
  return
}

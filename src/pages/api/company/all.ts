import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/prisma'
type Data = {
  message: string
  status: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  prisma.$connect()
  if (req.method !== 'GET') {
    return
  }
  let data

  data = await prisma.companies.findMany()
  if (!data) {
    res.status(400).json({
      message: 'Cannot get all companies',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  res.status(200).json({
    message: 'Successfully get all companies',
    status: 'ok',
    data: data
  })
  prisma.$disconnect()
  return
}

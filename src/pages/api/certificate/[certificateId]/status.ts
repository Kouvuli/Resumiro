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

  if (!session || session.user?.role !== 'admin') {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const prisma = new PrismaClient()
  prisma.$connect()
  const { certificateId } = req.query
  const existingCertificate = await prisma.certificates.findFirst({
    where: {
      id: Number(certificateId)
    }
  })

  if (!existingCertificate) {
    res.status(404).json({
      message: 'Certificate not found',
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

    const data = await prisma.certificates.update({
      where: {
        id: Number(certificateId!)
      },
      data: {
        status: status
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update certificate status',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully updated certificate status',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

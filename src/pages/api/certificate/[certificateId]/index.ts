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
    const { name, verified_at, source } = req.body

    let data
    if (!name || !verified_at) {
      res.status(400).json({
        message: 'Missing input',
        status: 'error'
      })
      return
    }

    data = await prisma.certificates.update({
      where: {
        id: Number(certificateId!)
      },
      data: {
        name: name,
        source: source,
        verified_at: new Date(verified_at)
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update certificate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully updated certificate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
    await prisma.request.deleteMany({
      where: {
        certificate_id: Number(certificateId!)
      }
    })
    const data = await prisma.certificates
      .delete({
        where: {
          id: Number(certificateId!)
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
        message: 'Cannot delete certificate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully deleted certificate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

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
  const { requestId } = req.query
  const existingRequest = await prisma.request.findFirst({
    where: {
      id: Number(requestId)
    }
  })

  if (!existingRequest) {
    res.status(404).json({
      message: 'Request not found',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  if (req.method === 'DELETE') {
    const data = await prisma.request
      .delete({
        where: {
          id: Number(requestId!)
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
        message: 'Cannot delete request',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully deleted request',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

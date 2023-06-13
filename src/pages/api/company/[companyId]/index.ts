import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/prisma'
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

  const { companyId } = req.query
  let id = Number(companyId)
  prisma.$connect()
  if (req.method === 'GET') {
    const data = await prisma.companies
      .findFirst({
        where: { id: id },
        include: {
          location: true
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
        message: 'Company not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get company',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'PATCH') {
    if (!session || session.user?.role !== 'admin') {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const {
      name,
      logo,
      background,
      about,
      location_id,
      scale,
      website,
      address,
      introduction
    } = req.body

    const user = await prisma.users.findFirst({
      where: {
        company_id: Number(companyId),
        role: 'admin'
      }
    })
    if (Number(user!.id) !== Number(session.user?.id)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }

    let data = await prisma.companies.update({
      where: {
        id: id
      },
      data: {
        name: name,
        logo: logo,
        background: background,
        about: about,
        location_id: location_id,
        scale: scale,
        website: website,
        address: address,
        introduction: introduction
      }
    })
    if (!data) {
      res.status(400).json({
        message: 'Cannot update company',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully update company',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

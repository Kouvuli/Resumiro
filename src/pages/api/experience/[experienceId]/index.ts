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
    const { position, start, finish, company_id, source } = req.body

    if (!position || !start || !finish || !company_id || !source) {
      res.status(400).json({
        message: 'Missing input',
        status: 'error'
      })
      return
    }

    const existingCompany = await prisma.companies.findFirst({
      where: {
        id: Number(company_id)
      }
    })

    if (!existingCompany) {
      res.status(404).json({
        message: 'Company not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.experiences.update({
      where: {
        id: Number(experienceId!)
      },
      data: {
        source: source,
        position: position,
        start: start,
        finish: finish,
        company_id: company_id
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot update experience',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully updated experience',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
    await prisma.request.deleteMany({
      where: {
        experience_id: Number(experienceId!)
      }
    })
    const data = await prisma.experiences
      .delete({
        where: {
          id: Number(experienceId!)
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
        message: 'Cannot delete experience',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully deleted experience',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

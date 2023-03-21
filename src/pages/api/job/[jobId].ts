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
  if (req.method === 'GET') {
    const prisma = new PrismaClient()
    const { jobId } = req.query
    prisma.$connect()
    let id = Number(jobId)

    const jobs = await prisma.jobs
      .findFirst({
        where: { id: id },
        include: {
          company: {
            include: {
              jobs: {
                where: {
                  id: {
                    not: id
                  }
                },
                include: {
                  location: true,
                  company: true
                }
              }
            }
          },
          location: true,
          jobs_skills: {
            select: {
              skill: true
            }
          }
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
    if (!jobs) {
      res.status(404).json({
        message: 'Job not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get job',
      status: 'ok',
      data: jobs
    })
    prisma.$disconnect()
    return
  }
}

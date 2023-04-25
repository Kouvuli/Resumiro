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
  const { recruiterId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(recruiterId)
    const recruiter = await prisma.recruiters
      .findFirst({
        where: { id: id },
        include: {
          company: true,
          jobs: {
            include: {
              location: true,
              company: true,
              jobs_skills: true,
              jobs_applicants: {
                include: {
                  applicant: true
                }
              }
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
    if (!recruiter) {
      res.status(404).json({
        message: 'Recruiter not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get recruiter',
      status: 'ok',
      data: recruiter
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'PATCH') {
    const { avatar, background, full_name, email, phone } = req.body
    const data = await prisma.recruiters
      .update({
        where: {
          id: Number(recruiterId)
        },
        data: {
          avatar: avatar,
          background: background,
          full_name: full_name,
          phone: phone,
          email: email
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
      res.status(400).json({
        message: 'Cannot update recruiter',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully update recruiter',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}
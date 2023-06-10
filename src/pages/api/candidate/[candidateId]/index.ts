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

  if (!session) {
    res.status(401).json({
      message: 'Unauthorized',
      status: 'error'
    })
    return
  }
  const { candidateId } = req.query
  prisma.$connect()
  if (req.method === 'GET') {
    let id = Number(candidateId)

    const candidate = await prisma.users
      .findFirst({
        where: { id: id },
        include: {
          resumes: {
            orderBy: {
              create_at: 'desc'
            },
            include: {
              owner: true
            }
          },
          users_skills: {
            select: {
              skill: true
            }
          },
          experiences: {
            include: {
              company: true
            }
          },
          certificates: true
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
    if (!candidate) {
      res.status(404).json({
        message: 'Candidate not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully get candidate',
      status: 'ok',
      data: candidate
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'PATCH') {
    const { avatar, background, full_name, email, phone } = req.body
    if (Number(session.user?.id) !== Number(candidateId)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const data = await prisma.users
      .update({
        where: {
          id: Number(candidateId)
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
        message: 'Cannot update candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully update candidate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

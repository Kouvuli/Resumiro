import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/prisma'
import { getServerSession } from 'next-auth'
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
  const { candidateId } = req.query
  prisma.$connect()
  if (req.method === 'POST') {
    const { skill_id } = req.body
    if (Number(session.user?.id) !== Number(candidateId)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const existingSkill = await prisma.skills.findFirst({
      where: {
        id: Number(skill_id)
      }
    })

    if (!existingSkill) {
      res.status(404).json({
        message: 'Skill not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const existingSkillWithCandidate = await prisma.users_skills.findFirst({
      where: {
        user_id: Number(candidateId),
        skill_id: Number(skill_id)
      }
    })

    if (existingSkillWithCandidate) {
      res.status(400).json({
        message: 'Skill already added for candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.users_skills.create({
      data: {
        user_id: Number(candidateId),
        skill_id: Number(skill_id)
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot add skill for candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully add skill for candidate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
    const { skill_id } = req.body
    if (Number(session.user?.id) !== Number(candidateId)) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const existingSkill = await prisma.skills.findFirst({
      where: {
        id: Number(skill_id)
      }
    })

    if (!existingSkill) {
      res.status(404).json({
        message: 'Skill not found',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.users_skills.delete({
      where: {
        user_id_skill_id: {
          user_id: Number(candidateId),
          skill_id: Number(skill_id)
        }
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot skill skill for candidate',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully delete skill for candidate',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

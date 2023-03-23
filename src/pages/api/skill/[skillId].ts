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
  const { skillId } = req.query
  const existingSkill = await prisma.skills.findFirst({
    where: {
      id: Number(skillId)
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

  if (req.method === 'PATCH') {
    const { name } = req.body

    let data
    if (!name) {
      res.status(400).json({
        message: 'Missing input',
        status: 'error'
      })
      return
    }
    if (name) {
      data = await prisma.skills.update({
        where: {
          id: Number(skillId!)
        },
        data: {
          name: name
        }
      })
    }

    if (!data) {
      res.status(400).json({
        message: 'Cannot update skill',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully updated skill',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
    const data = await prisma.skills
      .delete({
        where: {
          id: Number(skillId!)
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
        message: 'Cannot delete skill',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully deleted skill',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

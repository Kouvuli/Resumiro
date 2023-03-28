import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { includes } from 'lodash'
type Data = {
  message: string
  status: string
  pagination?: object
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient()
  prisma.$connect()
  if (req.method === 'GET') {
    const {
      page = 1,
      limit = 8,
      order_by = 'create_at_desc',
      q,
      skill
    } = req.query
    let p = Number(page)
    let l = Number(limit)
    let skillArr: any
    if (skill && skill.toString() !== '') {
      const skills = skill?.toString().split(',')
      skillArr = skills!.map(item => {
        return { name: item }
      })
      // const allSkills = await prisma.skills.findMany()
      // skills.forEach(skill => {
      //   allSkills.forEach(item => {
      //     if (item.name === skill) {
      //       skillArr.push({ skill_id: item.id })
      //     }
      //   })
      // })
    }

    const data = await prisma.resumes.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        AND: [
          {
            owner: {
              candidates_skills: {
                some: {
                  skill: {
                    OR: skillArr
                  }
                }
              }
            }
          },
          {
            title: {
              search: q?.toString()
            }
          }
        ]
      },
      include: {
        owner: {
          include: {
            candidates_skills: true
          }
        }
      }
    })
    if (order_by === 'create_at_asc') {
      data.sort((a, b) => {
        if (a.create_at < b.create_at) {
          return -1
        }
        if (a.create_at > b.create_at) {
          return 1
        }
        return 0
      })
    } else if (order_by === 'create_at_desc') {
      data.sort((a, b) => {
        if (a.create_at > b.create_at) {
          return -1
        }
        if (a.create_at < b.create_at) {
          return 1
        }
        return 0
      })
    } else if (order_by === 'alphabet') {
      data.sort((a, b) => {
        if (a.title! < b.title!) {
          return -1
        }
        if (a.title! > b.title!) {
          return 1
        }
        return 0
      })
    }
    const totalResumes = await prisma.resumes.count({
      where: {
        AND: [
          {
            owner: {
              candidates_skills: {
                some: {
                  skill: {
                    OR: skillArr
                  }
                }
              }
            }
          },
          {
            title: {
              search: q?.toString()
            }
          }
        ]
      }
    })
    res.status(200).json({
      message: 'Successfully get resumes',
      status: 'ok',
      pagination: {
        total: Math.round(totalResumes / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  }
}

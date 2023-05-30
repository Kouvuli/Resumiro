import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
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
  const session = await getServerSession(req, res, authOptions)

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
    let qArr: any
    if (q !== '' || q !== null) {
      qArr = q?.toString().split(' ')
    }

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
              users_skills: {
                every: {
                  skill: {
                    OR: skillArr
                  }
                }
              }
            }
          },
          {
            title: {
              search: q ? qArr.join('|') : undefined
            }
          }
        ]
      },
      include: {
        owner: {
          include: {
            users_skills: true
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
              users_skills: {
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
              search: q ? qArr.join('|') : undefined
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
  } else if (req.method === 'POST') {
    if (!session || session.user?.role !== 'candidate') {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    const { title, resume, resume_key, owner_id } = req.body

    const existingOwner = await prisma.users.findFirst({
      where: {
        id: owner_id
      }
    })

    if (!existingOwner) {
      res.status(400).json({
        message: 'User not exist',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    const data = await prisma.resumes.create({
      data: {
        title: title,
        create_at: new Date(),
        data: resume,
        owner_id: owner_id,
        resume_key: resume_key,
        is_public: false
      }
    })

    if (!data) {
      res.status(400).json({
        message: 'Cannot create resume',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully create resume',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

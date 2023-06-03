import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@pages/api/auth/[...nextauth]'
export type Data = {
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
      q,
      page = 1,
      limit = 8,
      location,
      order_by = 'create_at_desc',
      job_type,
      experience,
      min_salary,
      max_salary
    } = req.query
    let p = Number(page)
    let l = Number(limit)
    let qArr: any
    if (q !== '' || q !== null) {
      qArr = q?.toString().split(' ')
    }

    let locationArr: any
    if (location && location.toString() !== '') {
      const locations = location?.toString().split(',')

      locationArr = locations!.map(item => {
        if (item === 'Ho_Chi_Minh') {
          return { location_id: 1 }
        } else if (item === 'Ha_Noi') {
          return { location_id: 2 }
        } else if (item === 'Da_Nang') {
          return { location_id: 3 }
        }
      })
    }
    let jobTypeArr: any
    if (job_type && job_type !== '') {
      const jobTypes = job_type?.toString().split(',')
      // if (filterArr) {
      //   jobTypes!.map(item => {
      //     if (item === 'full_time') {
      //       filterArr.push({ job_type: 'Full-time' })
      //     } else if (item === 'part_time') {
      //       filterArr.push({ job_type: 'Part-time' })
      //     } else if (item === 'intern') {
      //       filterArr.push({ job_type: 'Intern' })
      //     }
      //   })
      // } else {
      jobTypeArr = jobTypes!.map(item => {
        if (item === 'full_time') {
          return { job_type: 'Full-time' }
        } else if (item === 'part_time') {
          return { job_type: 'Part-time' }
        } else if (item === 'intern') {
          return { job_type: 'Intern' }
        }
      })
      // }
    }
    let experienceArr: any
    if (experience && experience !== '') {
      const experiences = experience?.toString().split(',')
      // if (filterArr) {
      //   experiences!.map(item => {
      //     if (item === '0_1') {
      //       filterArr.push({
      //         experience: {
      //           lt: 12
      //         }
      //       })
      //     } else if (item === '1_3') {
      //       filterArr.push({
      //         experience: {
      //           gte: 12,
      //           lt: 36
      //         }
      //       })
      //     } else if (item === '3_5') {
      //       filterArr.push({
      //         experience: {
      //           gte: 36,
      //           lt: 60
      //         }
      //       })
      //     } else if (item === '5_10') {
      //       filterArr.push({
      //         experience: {
      //           gte: 60,
      //           lt: 120
      //         }
      //       })
      //     } else if (item === '10') {
      //       filterArr.push({
      //         experience: {
      //           gte: 120
      //         }
      //       })
      //     }
      //   })
      // } else {
      experienceArr = experiences!.map(item => {
        if (item === '0_1') {
          return {
            experience: {
              lt: 12
            }
          }
        } else if (item === '1_3') {
          return {
            experience: {
              gte: 12,
              lt: 36
            }
          }
        } else if (item === '3_5') {
          return {
            experience: {
              gte: 36,
              lt: 60
            }
          }
        } else if (item === '5_10') {
          return {
            experience: {
              gte: 60,
              lt: 120
            }
          }
        } else if (item === '10') {
          return {
            experience: {
              gte: 120
            }
          }
        }
      })
      // }
    }
    let salaryArr: any
    if (min_salary && max_salary && max_salary !== '' && min_salary !== '') {
      // if (filterArr) {
      //   filterArr.push({
      //     salary: {
      //       gte: Number(min_salary),
      //       lte: Number(max_salary)
      //     }
      //   })
      // } else {
      salaryArr = [
        {
          salary: {
            gte: Number(min_salary),
            lte: Number(max_salary)
          }
        }
      ]
      // }
    }
    const data = await prisma.jobs.findMany({
      skip: (p - 1) * l,
      take: l,
      where: {
        AND: [
          {
            OR: salaryArr
          },
          {
            OR: locationArr
          },
          {
            OR: experienceArr
          },
          {
            OR: jobTypeArr
          },
          {
            title: {
              search: q ? qArr.join('|') : undefined
            }
          }
        ]
      },

      include: {
        company: true,
        location: true
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
        if (a.title < b.title) {
          return -1
        }
        if (a.title > b.title) {
          return 1
        }
        return 0
      })
    }

    const totalJobs = await prisma.jobs.count({
      where: {
        AND: [
          {
            OR: salaryArr
          },
          {
            OR: locationArr
          },
          {
            OR: experienceArr
          },
          {
            OR: jobTypeArr
          }
        ],
        title: {
          search: q ? qArr.join('|') : undefined
        }
      }
    })
    res.status(200).json({
      message: 'Successfully get jobs',
      status: 'ok',
      pagination: {
        total: Math.round(totalJobs / l),
        page: page,
        limit: limit
      },
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)

    if (
      !session ||
      (session.user?.role !== 'recruiter' && session.user?.role !== 'admin')
    ) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }
    const {
      title,
      location_id,
      salary,
      field_id,
      company_id,
      experience,
      job_type,
      owner_id,
      skill
    } = req.body
    const user = await prisma.users.findFirst({
      where: {
        id: Number(session.user?.id)
      }
    })
    if (
      Number(session.user.id) !== Number(owner_id) ||
      user?.company_id === null
    ) {
      res.status(401).json({
        message: 'Unauthorized',
        status: 'error'
      })
      return
    }

    let data = await prisma.jobs.create({
      data: {
        title: title,
        location_id: location_id,
        salary: salary,
        field_id: field_id,
        experience: experience,
        job_type: job_type,
        company_id: company_id,
        owner_id: owner_id,
        create_at: new Date()
      }
    })

    if (skill && skill !== '') {
      const skills = skill?.toString().split(',')
      const skillsData = skills?.map((item: string) => {
        return {
          job_id: data.id,
          skill_id: Number(item)
        }
      })

      await prisma.jobs_skills.createMany({
        data: skillsData
      })
    }

    if (!data) {
      res.status(400).json({
        message: 'Cannot create job',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully create job',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

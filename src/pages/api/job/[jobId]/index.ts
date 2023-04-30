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
  const { jobId } = req.query
  prisma.$connect()
  let id = Number(jobId)

  const existingJob = prisma.jobs.findFirst({
    where: {
      id: id
    }
  })

  if (!existingJob) {
    res.status(404).json({
      message: 'Job not found',
      status: 'error'
    })
    prisma.$disconnect()
    return
  }

  if (req.method === 'GET') {
    const jobs = await prisma.jobs
      .findFirst({
        where: { id: id },
        include: {
          owner: {
            include: {
              room: true
            }
          },
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
  } else if (req.method === 'PATCH') {
    const {
      title,
      location_id,
      salary,
      field_id,
      experience,
      job_type,
      skill
    } = req.body

    let data = await prisma.jobs.update({
      where: {
        id: id
      },
      data: {
        title: title,
        location_id: location_id,
        salary: salary,
        field_id: field_id,
        experience: experience,
        job_type: job_type,
        update_at: new Date()
      }
    })

    if (skill && skill !== '') {
      await prisma.jobs_skills.deleteMany({
        where: {
          job_id: id
        }
      })
      const skills = skill?.toString().split(',')
      const skillsData = skills?.map((item: string) => {
        return {
          job_id: id,
          skill_id: Number(item)
        }
      })
      await prisma.jobs_skills.createMany({
        data: skillsData
      })
    }

    if (!data) {
      res.status(400).json({
        message: 'Cannot update job',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }

    res.status(200).json({
      message: 'Successfully update job',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  } else if (req.method === 'DELETE') {
    await prisma.jobs_skills.deleteMany({
      where: {
        job_id: id
      }
    })
    await prisma.jobs_applicants.deleteMany({
      where: {
        job_id: id
      }
    })
    const data = await prisma.jobs
      .delete({
        where: {
          id: id
        }
      })
      .catch(e => {
        res.status(500).json({
          message: e.message,
          status: 'error'
        })
        prisma.$disconnect()
        return
      })
    if (!data) {
      res.status(404).json({
        message: 'Cannot delete job',
        status: 'error'
      })
      prisma.$disconnect()
      return
    }
    res.status(200).json({
      message: 'Successfully deleted job',
      status: 'ok',
      data: data
    })
    prisma.$disconnect()
    return
  }
}

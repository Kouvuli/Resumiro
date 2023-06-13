import React from 'react'
import { JobCardProps } from '@components/cards/jobCard'
import { Container } from '@mui/material'
import Image from 'next/image'
import JobGrid from '@components/grid/jobGrid'
import ArticleLayout from '@components/layouts/article'
import _ from 'lodash'
import prisma from '@libs/prisma'
import { companies, jobs, locations } from '@prisma/client'

type JobListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: JobCardProps[]
}

interface CompanyJobPageProps {
  data: JobListPerPage
}

const CompanyJobpage: React.FC<CompanyJobPageProps> = ({ data }) => {
  return (
    <ArticleLayout title="Việc làm của công ty">
      <Container sx={{ my: 10 }}>
        {!_.isEmpty(data.data) ? (
          <JobGrid {...data} />
        ) : (
          <Image
            style={{ display: 'flex', margin: 'auto' }}
            src="/images/no-data-found.gif"
            height="450"
            width="450"
            alt="data-not-found"
          ></Image>
        )}
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: {
  req: any
  res: any
  query: any
}) {
  const { page, limit, id } = context.query
  let p = Number(page)
  let l = Number(limit)

  const jobs = await prisma.jobs.findMany({
    skip: (p - 1) * l,
    take: l,
    where: {
      company_id: Number(id)
    },

    include: {
      company: true,
      location: true
    }
  })
  const jobList = jobs.map(
    (
      job: jobs & {
        location: locations
        company: companies
      }
    ) => {
      return {
        id: job.id,
        logo: job.company.logo,
        jobTitle: job.title,
        companyName: job.company.name,
        location: job.location,
        salary: job.salary,
        experience: job.experience,
        createAt: job.create_at
      }
    }
  )
  const totalJobs = await prisma.jobs.count({
    where: {
      company_id: Number(id)
    }
  })

  return {
    props: {
      data: {
        perPage: limit,
        page: page,
        totalPage: Math.round(totalJobs / l),
        data: jobList
      }
    }
  }
}

export default CompanyJobpage

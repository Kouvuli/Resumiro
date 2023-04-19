import React from 'react'
import resumiroApi from '@apis/resumiroApi'
import { JobCardProps } from '@components/cards/jobCard'
import { Job } from '@shared/interfaces'
import { Container } from '@mui/material'
import Image from 'next/image'
import JobGrid from '@components/grid/jobGrid'
import ArticleLayout from '@components/layouts/article'
import _ from 'lodash'
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
  const jobs = await resumiroApi
    .getJobsOfCompany(context.query.id, context.query)
    .then(res => res.data)

  const jobList = jobs.data.map((job: Job) => {
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
  })

  return {
    props: {
      data: {
        perPage: jobs.pagination.limit,
        page: jobs.pagination.page,
        totalPage: jobs.pagination.total,
        data: jobList
      }
    }
  }
}

export default CompanyJobpage

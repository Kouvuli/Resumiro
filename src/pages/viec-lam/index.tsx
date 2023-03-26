import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Filter from '@components/lists/filter'
import JobGrid from '@components/grid/jobGrid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import ArticleLayout from '@components/layouts/article'
import { JobCardProps } from '@components/cards/jobCard'
import resumiroApi from '@apis/resumiroApi'
import { Job } from '@shared/interfaces'
import Image from 'next/image'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { jobSelector } from '@redux/selectors'
import jobSlice from '@redux/reducers/jobSlice'
import { useRouter } from 'next/router'
type JobListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: JobCardProps[]
}
interface JobPageProps {
  data: JobListPerPage
}

const orderOptions = [
  {
    value: 'create_at_desc',
    label: 'Mới nhất'
  },
  {
    value: 'create_at_asc',
    label: 'Cũ nhất'
  },
  {
    value: 'alphabet',
    label: 'A-Z'
  }
]

const JobPage: React.FC<JobPageProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    page,
    limit,
    total,
    q,
    location,
    order_by,
    job_type,
    min_salary,
    max_salary,
    experience
  } = useAppSelector(jobSelector)
  const searchHandler = () => {
    let query: any = {}
    if (page !== '') {
      query.page = 1
    }
    if (limit !== '') {
      query.limit = limit
    }
    if (q !== '') {
      query.q = q
    }
    if (location !== '') {
      query.location = location
    }
    if (order_by !== '') {
      query.order_by = order_by
    }
    if (job_type !== '') {
      query.job_type = job_type
    }
    if (experience !== '') {
      query.experience = experience
    }
    if (min_salary !== '' && max_salary !== '') {
      query.min_salary = min_salary
      query.max_salary = max_salary
    }
    router.push({
      pathname: router.pathname,
      query: query
    })
  }

  const handleJobOrderChange = (value: string) => {
    dispatch(jobSlice.actions.changeOrderBy(value))
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(jobSlice.actions.changeSearchText(e.target.value))
  }
  return (
    <ArticleLayout title="Việc làm">
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem" rowSpacing={2}>
          <SearchBar
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
          />

          <SearchResultBar
            options={orderOptions}
            numberSearch={data.data.length}
            handleChange={handleJobOrderChange}
          />

          <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} md={9}>
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
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { query: any }) {
  // const { page = 1, limit = 7 } = context.query
  const jobs = await resumiroApi.getJobs(context.query).then(res => res.data)

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

export default JobPage

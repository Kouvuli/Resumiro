import React from 'react'
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
import { Data } from '@pages/api/job'

type JobListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: JobCardProps[]
}
interface JobPageProps {
  data: JobListPerPage
}
// const jobList: JobListPerPage = {
//   perPage: 7,
//   page: 1,
//   totalPage: 10,
//   data: [
//     {
//       id: 1,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 2,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2022-03-25')
//     },
//     {
//       id: 3,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 4,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 5,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 6,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 7,
//       jobTitle: 'Nhân viên bảo trì thiết bị',
//       companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//       location: 'Hà Nội',
//       salary: ' VND 2.5 - 3 triệu',
//       experience: 'Từ 1 - 3 năm',
//       createAt: new Date('2023-03-16')
//     }
//   ]
// }

const JobPage: React.FC<JobPageProps> = ({ data }) => {
  return (
    <ArticleLayout title="Việc làm">
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem" rowSpacing={2}>
          <SearchBar />
          <SearchResultBar type={2} />
          <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} md={9}>
            <JobGrid {...data} />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps() {
  const jobs = await resumiroApi
    .getJobs({ page: 1, limit: 7 })
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

export default JobPage

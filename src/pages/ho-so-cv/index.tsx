import Container from '@mui/material/Container'
import React from 'react'
import Grid from '@mui/material/Grid'
import ResumeGrid from '@components/grid/resumeGrid'
import SuitableJob from '@components/lists/suitableJob'
import ArticleLayout from '@components/layouts/article'
import { ResumeCardProps } from '@components/cards/resumeCard'
import { JobCardProps } from '@components/cards/jobCard'
import resumiroApi from '@apis/resumiroApi'
import { Job, Resume } from '@shared/interfaces'
type ResumeListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: ResumeCardProps[]
}

// const resumeList: ResumeListPerPage = {
//   perPage: 7,
//   page: 1,
//   totalPage: 10,
//   data: [
//     {
//       id: 1,
//       resumeTitle: 'Java Intern',
//       data: '/images/Images_1.png',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 2,
//       resumeTitle: 'Java Intern',
//       data: '/images/Images_1.png',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 3,
//       resumeTitle: 'Java Intern',
//       data: '/images/Images_1.png',
//       createAt: new Date('2023-03-16')
//     },
//     {
//       id: 4,
//       resumeTitle: 'Java Intern',
//       data: '/images/Images_1.png',
//       createAt: new Date('2023-03-16')
//     }
//   ]
// }

// const suitableList: JobCardProps[] = [
//   {
//     id: 1,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     logo: '/images/Images_1.png',
//     createAt: new Date('2023-03-16')
//   },
//   {
//     id: 2,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     logo: '/images/Images_1.png',
//     createAt: new Date('2022-03-25')
//   },
//   {
//     id: 3,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     logo: '/images/Images_1.png',
//     createAt: new Date('2023-03-16')
//   },
//   {
//     id: 4,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     logo: '/images/Images_1.png',
//     createAt: new Date('2023-03-16')
//   }
// ]

interface ResumePageProps {
  resumeList: ResumeListPerPage
  suitableList: JobCardProps[]
}

const ResumePage: React.FC<ResumePageProps> = ({
  resumeList,
  suitableList
}) => {
  return (
    <ArticleLayout title="Hồ sơ - CV">
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem">
          <Grid item xs={12} md={7.5}>
            <ResumeGrid {...resumeList} />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <SuitableJob
              isResumePage
              items={suitableList}
              title="Danh sách công việc phù hợp"
            />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps() {
  const data1 = await resumiroApi.getCandidateById('1').then(res => res.data)
  const convertData = data1.data.resumes.map((item: Resume) => {
    return {
      id: item.id,
      resumeTitle: item.title,
      data: item.data,
      createAt: item.create_at
    }
  })

  const data2 = await resumiroApi
    .getJobs({ page: 1, limit: 7 })
    .then(res => res.data)
  const suitableList = data2.data.map((job: Job) => {
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
      resumeList: {
        page: null,
        totalPages: null,
        perPage: null,
        data: convertData
      },
      suitableList: suitableList
    }
  }
}

export default ResumePage

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
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

type ResumeListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: ResumeCardProps[]
}

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
            <ResumeGrid {...resumeList} title="CV đã tải lên" />
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

export async function getServerSideProps(context: { req: any; res: any }) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }
  if (session?.user?.email === 'recruiter') {
    return {
      redirect: {
        destination: '/ho-so-cv',
        permanent: false
      }
    }
  }
  const data1 = await resumiroApi
    .getCandidateById(session!.user!.name!)
    .then(res => res.data)

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

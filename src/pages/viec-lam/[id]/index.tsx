import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ArticleLayout from '@components/layouts/article'
import JobDetailCard from '@components/cards/detailCard/jobDetail/jobDetailCard'
import Typography from '@mui/material/Typography'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import DenseChip from '@components/ui/chip/DenseChip'
import { styled } from '@mui/material/styles'
import CompanyBriefCard from '@components/cards/detailCard/jobDetail/companyBriefCard'
import SuitableJob from '@components/lists/suitableJob'
import { Company, Job, Skill } from '@shared/interfaces'
import { JobCardProps } from '@components/cards/jobCard'
import parse from 'html-react-parser'
import resumiroApi from '@apis/resumiroApi'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { jobDetailSelector } from '@redux/selectors'
import { useSession } from 'next-auth/react'
import jobDetailSlice, {
  applyJob,
  cancelJob,
  checkIsApplied,
  createNotification
} from '@redux/reducers/jobDetailSlice'
import MySnackBar from '@components/ui/bar/snackbar'

const DetailJobList = styled(`ul`)(({ theme }) => ({
  listStyle: 'none',
  '& li p': {
    paddingTop: theme.spacing(1.5),
    lineHeight: '1.5rem',
    '&:before': {
      display: 'inline-block',
      content: '""',
      borderRadius: '0.375rem',
      height: '0.4rem',
      width: '0.4rem',
      marginRight: '0.5rem',
      marginBottom: '0.2rem',
      backgroundColor: theme.palette.text.primary
    }
  }
}))

// const suitableList: JobCardProps[] = [
//   {
//     id: 1,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     createAt: new Date('2023-03-16')
//   },
//   {
//     id: 2,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     createAt: new Date('2022-03-25')
//   },
//   {
//     id: 3,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     createAt: new Date('2023-03-16')
//   },
//   {
//     id: 4,
//     jobTitle: 'Nhân viên bảo trì thiết bị',
//     companyName: 'Công ty TNHH MTV Công nghệ Công nghiệp Việt Nam',
//     location: 'Hà Nội',
//     salary: ' VND 2.5 - 3 triệu',
//     experience: 'Từ 1 - 3 năm',
//     createAt: new Date('2023-03-16')
//   }
// ]
// interface JobDetail {
//   id: number
//   title: string
//   company: Company
//   location: string
//   salary: string
//   experience: string
//   position: string
//   requirements: string
//   benefits: string
//   jobs_skills: { skill: Skill }[]
//   createAt: string
//   updateAt: string | undefined
//   // jobs_applicants:[]
// }

interface JobDetailProps {
  data: Job
  sameCompanyJob: JobCardProps[]
}

const CustomListItem = styled(ListItem)(({}) => ({
  paddingLeft: 'unset'
}))

const JobDetailPage: React.FC<JobDetailProps> = ({ data, sameCompanyJob }) => {
  const {
    id,
    title,
    owner,
    company,
    owner_id,
    location,
    salary,
    experience,
    job_type,
    requirements,
    benefits,
    create_at,
    update_at,
    jobs_skills
  } = data
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const { isApplied, showMessage, message, messageType, loading } =
    useAppSelector(jobDetailSelector)

  useEffect(() => {
    dispatch(jobDetailSlice.actions.changeRoom({ room: owner.room.token }))
  }, [])
  useEffect(() => {
    if (session) {
      dispatch(
        checkIsApplied({
          candidateId: session!.user!.name!,
          jobId: id
        })
      )
    }
  }, [session])
  const applyHandler = () => {
    if (!isApplied) {
      dispatch(
        applyJob({
          id: id,
          data: {
            candidate_id: session!.user!.name!
          }
        })
      )
      dispatch(
        createNotification({
          author_id: Number(session!.user!.name!),
          title: 'Thông báo',
          content: 'mới ứng tuyển vào công việc của bạn',
          object_url: id.toString(),
          recipients: owner_id.toString(),
          notification_type_id: 3
        })
      )

      dispatch(jobDetailSlice.actions.changeApplyStatus({ isApplied: true }))
    } else {
      dispatch(
        cancelJob({
          candidateId: session!.user!.name!,
          jobId: id
        })
      )
      dispatch(jobDetailSlice.actions.changeApplyStatus({ isApplied: false }))
    }
  }
  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(jobDetailSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Chi tiết việc làm">
      <Container>
        <MySnackBar
          handleClose={handleSnackBarClose}
          message={message}
          messageType={messageType}
          showMessage={showMessage}
        />
        <Grid container marginTop="1rem " marginBottom="5rem">
          <Grid item xs={12} md={7.5}>
            <JobDetailCard
              isApply={isApplied}
              applyHandler={applyHandler}
              id={id}
              jobTitle={title}
              companyName={company.name}
              companyLogo={company.logo}
              location={location}
              salary={salary}
              experience={experience}
              job_type={job_type}
              createAt={create_at}
              updateAt={update_at}
            />
            <List>
              <CustomListItem>
                <Typography variant="h5">Skills</Typography>
              </CustomListItem>
              <CustomListItem sx={{ flexWrap: 'wrap' }}>
                {jobs_skills.map(({ skill }) => (
                  <DenseChip
                    style={{
                      fontWeight: 500,
                      marginRight: 1,
                      marginBottom: 1
                    }}
                    key={skill.id}
                    label={skill.name}
                  />
                ))}
              </CustomListItem>

              <CustomListItem
                sx={{
                  diplay: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start'
                }}
              >
                <Typography
                  sx={{
                    mt: 2,
                    fontSize: '18px',
                    fontWeight: 700
                  }}
                >
                  Chi tiết công việc
                </Typography>
                <Typography
                  sx={{
                    textDecoration: 'underline',
                    fontSize: '16px',
                    fontWeight: 700,
                    mt: 2
                  }}
                >
                  Yêu cầu ứng viên
                </Typography>
                <DetailJobList>
                  <li>
                    <p>{requirements}</p>
                  </li>
                </DetailJobList>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: 'underline',
                    fontSize: '16px',
                    fontWeight: 700,
                    mt: 2
                  }}
                >
                  Quyền lợi
                </Typography>
                <DetailJobList>
                  <li>
                    <p>{benefits}</p>
                  </li>
                </DetailJobList>
              </CustomListItem>
              <CustomListItem>
                <CompanyBriefCard
                  name={company.name}
                  logo={company.logo}
                  address={company.address}
                  scale={company.scale}
                  website={company.website}
                  id={company.id}
                />
              </CustomListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={4.5}>
            <SuitableJob title="Công việc tương tự" items={sameCompanyJob} />
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query

  const jobDetail = await resumiroApi.getJobById(id).then(res => res.data)
  const sameCompanyJob: JobCardProps[] = jobDetail.data.company.jobs.map(
    (job: Job) => {
      return {
        id: job.id,
        jobTitle: job.title,
        logo: job.company.logo,
        companyName: job.company.name,
        location: job.location,
        salary: job.salary,
        experience: job.experience,

        createAt: job.create_at
      }
    }
  )
  return {
    props: { data: jobDetail.data, sameCompanyJob }
  }
}

export default JobDetailPage

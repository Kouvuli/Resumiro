import React from 'react'
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

const DetailJobList = styled(`ul`)(({ theme }) => ({
  listStyle: 'none',
  '& li p': {
    paddingTop: theme.spacing(1.5),
    lineHeight: '1.5rem',
    '&:before': {
      display: 'inline-block',
      content: '""',
      '-webkit-border-radius': '0.375rem',
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
interface JobDetail {
  id: number
  title: string
  company: Company
  location: string
  salary: string
  experience: string
  position: string
  requirements: string
  benefits: string
  jobs_skills: { skill: Skill }[]
  createAt: string
  updateAt: string | undefined
  // jobs_applicants:[]
}

interface JobDetailProps {
  data: Job
  sameCompanyJob: JobCardProps[]
}

const JobDetailPage: React.FC<JobDetailProps> = ({ data, sameCompanyJob }) => {
  const {
    id,
    title,
    company,

    location,
    salary,
    experience,
    position,
    requirements,
    benefits,
    create_at,
    update_at,
    jobs_skills
  } = data
  return (
    <ArticleLayout title="Chi tiết việc làm">
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem">
          <Grid item xs={12} md={7.5}>
            <JobDetailCard
              id={id}
              jobTitle={title}
              companyName={company.name}
              companyLogo={company.logo}
              location={location}
              salary={salary}
              experience={experience}
              position={position}
              createAt={create_at}
              updateAt={update_at}
            />
            <List>
              <ListItem>
                <Typography variant="h5">Skills</Typography>
              </ListItem>
              <ListItem sx={{ flexWrap: 'wrap' }}>
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
              </ListItem>

              <ListItem
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
              </ListItem>
              <ListItem>
                <CompanyBriefCard
                  name={company.name}
                  logo={company.logo}
                  address={company.address}
                  scale={company.scale}
                  website={company.website}
                  id={company.id}
                />
              </ListItem>
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

  // const jobDetail: Job = {
  //   id: 1,
  //   jobTitle: 'Java Intern',
  //   companyName: 'DXC Technology Vietnam',
  //   companyLogo: '/images/Images_1.png',

  //   location: ' Hồ Chí Minh',
  //   salary: ' VND 5.000.000/Tháng',
  //   experience: 'Từ 1-3 năm',
  //   position: 'Thực tập',
  //   requirements: `
  //       <li>
  //           <p>
  //               Sinh viên năm cuối, sắp tốt nghiệp
  //               các ngành CNTT, Công nghệ phần mềm,
  //               Khoa học máy tính hoặc các ngành
  //               khác có liên quan.
  //           </p>
  //       </li>
  //       <li>
  //           <p>
  //               Nắm vững kiến thức và đã từng làm
  //               qua các dự án sử dụng Java/Java
  //               Spring Boot,...
  //           </p>
  //       </li>
  //       <li>
  //           <p>Có thể làm việc fulltime.</p>
  //       </li>`,
  //   benefits: `
  //       <li>
  //           <p>
  //               Nhận mức trợ cấp 5.000.000 VND/
  //               tháng.
  //           </p>
  //       </li>
  //       <li>
  //           <p>
  //               Nắm vững kiến thức và đã từng làm
  //               qua các dự án sử dụng Java/Java
  //               Spring Boot,...
  //           </p>
  //       </li>
  //       <li>
  //           <p>Có thể làm việc fulltime.</p>
  //       </li>
  //       `,
  //   skills: [
  //     { id: 1, name: 'Java' },
  //     { id: 2, name: 'Java Spring Boot' },
  //     { id: 3, name: 'Object-Oriented Programming (OOP)' },
  //     { id: 4, name: 'Java Swing' },
  //     { id: 5, name: 'Spring Framework' }
  //   ],
  //   createAt: new Date('2023-02-16').getTime(),
  //   updateAt: new Date('2023-03-10').getTime()
  // }

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

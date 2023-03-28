import SkillCard from '@components/cards/profileCard/skillsCard/skillsCard'
import { Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import ExperienceCard from '@components/cards/profileCard/experienceCard/experienceCard'
import AboutMeCard from '@components/cards/profileCard/aboutMeCard'
import EducationCard from '@components/cards/profileCard/educationCard/educationCard'
import BasicInfoCard from '@components/cards/profileCard/basicInfoCard'
import BackgroundCard from '@components/cards/profileCard/backgroundCard'
import ImagesCard from '@components/cards/profileCard/imagesCard'
import ArticleLayout from '@components/layouts/article'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import {
  fetchAllCompanies,
  fetchAllSkills,
  fetchCandidateById,
  fetchRecruiterById
} from '@redux/reducers/profileSlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'
import MySnackBar from '@components/ui/bar/snackbar'
import CompanyCard from '@components/cards/companyCard'
import CompanyBasicCard from '@components/cards/profileCard/companyBasicCard'
import resumiroApi from '@apis/resumiroApi'
import { candidates, companies, skills } from '@prisma/client'
import { Candidate, Company, Skill } from '@shared/interfaces'
interface CandidateProfilePageProps {
  user: Candidate
  allCompanies: Company[]
  allSkills: Skill[]
}

const CandidateProfilePage: React.FC<CandidateProfilePageProps> = ({
  user,
  allCompanies,
  allSkills
}) => {
  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <ArticleLayout title="Cá nhân">
        <Container
          sx={{
            paddingTop: '2rem ',
            paddingBottom: '5rem'
          }}
        >
          <Grid container columnSpacing={{ md: 2, xs: 0 }}>
            <Grid item xs={12}>
              <BackgroundCard src={user.background} alt={user.full_name} />
            </Grid>
            <Grid item xs={12} md={8}>
              <BasicInfoCard
                type={2}
                avatar={user.avatar}
                fullName={user.full_name}
                username={user.username}
                role={user.role}
                phone={user.phone}
                background={user.background}
                email={user.email}
              />

              <AboutMeCard
                type={2}
                style={{ marginTop: '16px' }}
                about={user.about}
              />

              <ExperienceCard
                type={2}
                style={{ marginTop: '16px' }}
                experiences={user.experiences}
                allCompanies={allCompanies}
              />

              <EducationCard
                type={2}
                style={{ marginTop: '16px' }}
                educations={user.certificates}
              />

              <SkillCard
                type={2}
                style={{ marginTop: '16px' }}
                skills={user.candidates_skills}
                allSkills={allSkills}
              />
            </Grid>
            <Grid item xs={12} md={4} marginTop={{ xs: '16px', md: '0px' }}>
              <ImagesCard />
            </Grid>
          </Grid>
        </Container>
      </ArticleLayout>
    </div>
  )
}

export async function getServerSideProps(context: {
  req: any
  res: any
  query: any
}) {
  const { candidateId } = context.query
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }

  if (session?.user?.email === 'candidate') {
    return {
      redirect: {
        destination: '/ca-nhan',
        permanent: false
      }
    }
  }
  const candidateDetail = await resumiroApi
    .getCandidateById(candidateId)
    .then(res => res.data)

  const allCompanies = await resumiroApi.getAllCompanies().then(res => res.data)
  const allSkills = await resumiroApi.getAllSkills().then(res => res.data)

  // const candidate = await resumiroApi
  //   .getCandidateById(session!.user!.name!)
  //   .then(res => res.data)
  return {
    props: {
      session: session,
      user: candidateDetail.data,
      allCompanies: allCompanies.data,
      allSkills: allSkills.data
    }
  }
}

export default CandidateProfilePage

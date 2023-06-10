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
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import resumiroApi from '@apis/resumiroApi'
import { Company, Skill } from '@shared/interfaces'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useSession } from 'next-auth/react'
import candidateProfileSlice, {
  fetchCandidateById
} from '@redux/reducers/candidateProfileSlice'
import { candidateProfileSelector } from '@redux/selectors'
import { useRouter } from 'next/router'
import MySnackBar from '@components/ui/bar/snackbar'
interface CandidateProfilePageProps {
  allCompanies: Company[]
  allSkills: Skill[]
}

const CandidateProfilePage: React.FC<CandidateProfilePageProps> = ({
  allCompanies,
  allSkills
}) => {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, message, messageType, showMessage } = useAppSelector(
    candidateProfileSelector
  )
  useEffect(() => {
    if (session) {
      const candidateId = Array.isArray(router.query!.candidateId!)
        ? router.query!.candidateId![0]
        : router.query!.candidateId!
      dispatch(fetchCandidateById(candidateId))
    }
  }, [])
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    _reason?: string
  ) => {
    dispatch(
      candidateProfileSlice.actions.toggleSnackBar({ showMessage: false })
    )
  }

  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <ArticleLayout title={`Trang cá nhân của ${user.username}`}>
        <Container
          sx={{
            paddingTop: '2rem ',
            paddingBottom: '5rem'
          }}
        >
          <MySnackBar
            handleClose={handleClose}
            message={message}
            messageType={messageType}
            showMessage={showMessage}
          />
          <Grid container columnSpacing={{ md: 2, xs: 0 }}>
            <Grid item xs={12}>
              <BackgroundCard src={user.background} alt={user.full_name} />
            </Grid>
            <Grid item xs={12} md={8}>
              <BasicInfoCard
                type={2}
                id={user.id}
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
                skills={user.users_skills}
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
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/dang-nhap',
        permanent: false
      }
    }
  }

  if (session.user!.role === 'candidate') {
    return {
      notFound: true
    }
  }

  const allCompanies = await resumiroApi.getAllCompanies().then(res => res.data)
  const allSkills = await resumiroApi.getAllSkills().then(res => res.data)

  return {
    props: {
      session: session,
      allCompanies: allCompanies.data,
      allSkills: allSkills.data
    }
  }
}

export default CandidateProfilePage

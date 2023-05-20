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
import profileSlice, {
  fetchAllCompanies,
  fetchAllFields,
  fetchAllLocations,
  fetchAllRecruiterSameCompany,
  fetchAllSkills,
  fetchCandidateById,
  fetchRecruiterById
} from '@redux/reducers/profileSlice'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'
import MySnackBar from '@components/ui/bar/snackbar'
import CompanyBasicCard from '@components/cards/profileCard/companyBasicCard'
import OwnedJobCard from '@components/cards/profileCard/ownedJobCard/ownedJobCard'
import OwnedRecruiterCard from '@components/cards/profileCard/ownedRecruiterCard/ownedRecruiterCard'

const ProfilePage = () => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const {
    showMessage,
    allFields,
    allLocations,
    message,
    messageType,
    user,
    allCompanies,
    allSkills,
    recruitersSameCompany
  } = useAppSelector(profileSelector)
  useEffect(() => {
    dispatch(fetchAllCompanies())
    dispatch(fetchAllSkills())
    dispatch(fetchAllLocations())
    dispatch(fetchAllFields())
  }, [])
  useEffect(() => {
    if (session?.user?.email === 'candidate') {
      dispatch(fetchCandidateById(session!.user!.name!))
    } else {
      dispatch(fetchRecruiterById(session!.user!.name!))
      if (user.is_admin) {
        dispatch(fetchAllRecruiterSameCompany(user.company_id))
      }
    }
  }, [showMessage])

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(profileSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <ArticleLayout title="Cá nhân">
        <MySnackBar
          handleClose={handleClose}
          message={message}
          messageType={messageType}
          showMessage={showMessage}
        />

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
                avatar={user.avatar}
                fullN ame={user.full_name}
                username={user.username}
                role={user.role}
                is_admin={user.is_admin}
                phone={user.phone}
                background={user.background}
                email={user.email}
              />

              {user.role === 'recruiter' && (
                <CompanyBasicCard
                  style={{ marginTop: '16px' }}
                  company={user.company}
                  isAdmin={user.is_admin}
                  allLocations={allLocations}
                />
              )}
              {user.role === 'recruiter' && (
                <OwnedJobCard
                  style={{ marginTop: '16px' }}
                  jobs={user.jobs}
                  allSkills={allSkills}
                  allFields={allFields}
                  allLocations={allLocations}
                />
              )}
              {user.role === 'recruiter' && user.is_admin && (
                <OwnedRecruiterCard
                  style={{ marginTop: '16px' }}
                  recruiters={recruitersSameCompany}
                  companyId={user.company_id}
                />
              )}
              {user.role === 'candidate' && (
                <AboutMeCard style={{ marginTop: '16px' }} about={user.about} />
              )}
              {user.role === 'candidate' && (
                <ExperienceCard
                  style={{ marginTop: '16px' }}
                  experiences={user.experiences}
                  allCompanies={allCompanies}
                />
              )}
              {user.role === 'candidate' && (
                <EducationCard
                  style={{ marginTop: '16px' }}
                  educations={user.certificates}
                />
              )}
              {user.role === 'candidate' && (
                <SkillCard
                  style={{ marginTop: '16px' }}
                  skills={user.users_skills}
                  allSkills={allSkills}
                />
              )}
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
  // const candidate = await resumiroApi
  //   .getCandidateById(session!.user!.name!)
  //   .then(res => res.data)
  return {
    props: {
      session: session
    }
  }
}

export default ProfilePage

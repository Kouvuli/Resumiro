import SkillCard from '@components/cards/profileCard/skillsCard/skillsCard'
import { Container, Grid } from '@mui/material'
import React from 'react'
import ExperienceCard from '@components/cards/profileCard/experienceCard/experienceCard'
import AboutMeCard from '@components/cards/profileCard/aboutMeCard'
import EducationCard from '@components/cards/profileCard/educationCard/educationCard'
import BasicInfoCard from '@components/cards/profileCard/basicInfoCard'
import BackgroundCard from '@components/cards/profileCard/backgroundCard'
import ImagesCard from '@components/cards/profileCard/imagesCard'
import ArticleLayout from '@components/layouts/article'
import resumiroApi from '@apis/resumiroApi'
import { Candidate } from '@shared/interfaces'
interface ProfilePageProps {
  data: Candidate
}

const ProfilePage: React.FC<ProfilePageProps> = ({ data }) => {
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
              <BackgroundCard src={data.background} alt={data.full_name} />
            </Grid>
            <Grid item xs={12} md={8}>
              <BasicInfoCard
                avatar={data.avatar}
                fullName={data.full_name}
                username={data.username}
                role={data.role}
              />
              {data.about && (
                <AboutMeCard style={{ marginTop: '16px' }} about={data.about} />
              )}
              {data.experiences && (
                <ExperienceCard
                  style={{ marginTop: '16px' }}
                  experiences={data.experiences}
                />
              )}
              {data.certificates && (
                <EducationCard
                  style={{ marginTop: '16px' }}
                  educations={data.certificates}
                />
              )}
              {data.candidates_skills && (
                <SkillCard
                  style={{ marginTop: '16px' }}
                  skills={data.candidates_skills}
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

export async function getServerSideProps() {
  const candidate = await resumiroApi
    .getCandidateById('1')
    .then(res => res.data)

  return {
    props: {
      data: candidate.data
    }
  }
}

export default ProfilePage

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
const ProfilePage = () => {
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
                            <BackgroundCard />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <BasicInfoCard />
                            <AboutMeCard style={{ marginTop: '16px' }} />
                            <ExperienceCard style={{ marginTop: '16px' }} />
                            <EducationCard style={{ marginTop: '16px' }} />
                            <SkillCard style={{ marginTop: '16px' }} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            marginTop={{ xs: '16px', md: '0px' }}
                        >
                            <ImagesCard />
                        </Grid>
                    </Grid>
                </Container>
            </ArticleLayout>
        </div>
    )
}

export default ProfilePage

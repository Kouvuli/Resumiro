import ArticleLayout from '@components/layouts/article'
import React from 'react'
import { Container, Grid } from '@mui/material'
import BackgroundCard from '@components/cards/profileCard/backgroundCard'
import CompanyDetailCard from '@components/cards/detailCard/companyDetail/companyDetailCard'
import CompanyDescriptionCard from '@components/cards/detailCard/companyDetail/companyDescriptionCard'
import ImagesCard from '@components/cards/profileCard/imagesCard'

const CompanyDetailPage = () => {
    return (
        <ArticleLayout title="Hồ sơ - CV">
            <Container>
                <Grid container marginTop="1rem " marginBottom="5rem">
                    <Grid item xs={12}>
                        <BackgroundCard />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <CompanyDetailCard />
                    </Grid>
                    <Grid item xs={12} md={7.5}>
                        <CompanyDescriptionCard />
                    </Grid>
                    <Grid item xs={12} md={4.5} sx={{ pl: 2 }}>
                        <ImagesCard />
                    </Grid>
                </Grid>
            </Container>
        </ArticleLayout>
    )
}

export default CompanyDetailPage

import ArticleLayout from '@components/layouts/article'
import React from 'react'
import { Container, Grid } from '@mui/material'
import BackgroundCard from '@components/cards/profileCard/backgroundCard'
import CompanyDetailCard from '@components/cards/detailCard/companyDetail/companyDetailCard'
import CompanyDescriptionCard from '@components/cards/detailCard/companyDetail/companyDescriptionCard'
import { Company } from '@shared/interfaces'
import resumiroApi from '@apis/resumiroApi'
import prisma from '@libs/prisma'

const CompanyDetailPage: React.FC<Company> = ({
  background,
  name,
  location,
  website,
  about,
  scale,
  address,
  introduction,
  logo
}) => {
  return (
    <ArticleLayout title="Hồ sơ - CV">
      <Container>
        <Grid container marginTop="1rem " marginBottom="5rem">
          <Grid item xs={12}>
            <BackgroundCard src={background} alt={name} />
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <CompanyDetailCard
              companyName={name}
              location={location}
              website={website!}
              about={about}
              scale={scale!}
              logo={logo}
            />
          </Grid>
          <Grid item xs={12} md={7.5}>
            <CompanyDescriptionCard
              introduction={introduction}
              address={address}
            />
          </Grid>
          <Grid item xs={12} md={4.5} sx={{ pl: 2 }}>
            {/* <ImagesCard /> */}
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: { query: { id: string } }) {
  const { id } = context.query

  const companyDetail = await prisma.companies.findFirst({
    where: { id: Number(id) },
    include: {
      location: true
    }
  })

  return {
    props: companyDetail
  }
}

export default CompanyDetailPage

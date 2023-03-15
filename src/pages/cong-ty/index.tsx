import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import CompanyCard from '@components/cards/companyCard'
import RoundPagination from '@components/ui/pagination/roundPagination'
import ArticleLayout from '@components/layouts/article'

const CompanyPage: React.FC = () => {
    return (
        <ArticleLayout title="Công ty">
            <Container>
                <Grid
                    container
                    marginTop="1rem "
                    marginBottom="5rem"
                    rowSpacing={2}
                    columnSpacing={3}
                >
                    <SearchBar />
                    <SearchResultBar />

                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <CompanyCard />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            mt: 4
                        }}
                    >
                        <RoundPagination />
                    </Grid>
                </Grid>
            </Container>
        </ArticleLayout>
    )
}

export default CompanyPage

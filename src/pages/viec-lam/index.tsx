import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Filter from '@components/lists/filter'
import JobGrid from '@components/grid/jobGrid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import ArticleLayout from '@components/layouts/article'
const JobPage = () => {
    return (
        <ArticleLayout title="Việc làm">
            <Container>
                <Grid
                    container
                    marginTop="1rem "
                    marginBottom="5rem"
                    rowSpacing={2}
                >
                    <SearchBar />
                    <SearchResultBar type={2} />
                    <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
                        <Filter />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <JobGrid />
                    </Grid>
                </Grid>
            </Container>
        </ArticleLayout>
    )
}

export default JobPage

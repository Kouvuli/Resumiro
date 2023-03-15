import Container from '@mui/material/Container'
import React from 'react'
import Grid from '@mui/material/Grid'
import ResumeGrid from '@components/grid/resumeGrid'
import SuitableJob from '@components/lists/suitableJob'
import ArticleLayout from '@components/layouts/article'
const ResumePage = () => {
    return (
        <ArticleLayout title="Hồ sơ -CV">
            <Container>
                <Grid container marginTop="1rem " marginBottom="5rem">
                    <Grid item xs={12} md={7.5}>
                        <ResumeGrid />
                    </Grid>
                    <Grid item xs={12} md={4.5}>
                        <SuitableJob />
                    </Grid>
                </Grid>
            </Container>
        </ArticleLayout>
    )
}

export default ResumePage

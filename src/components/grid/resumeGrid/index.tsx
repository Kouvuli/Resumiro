import React from 'react'
import Grid from '@mui/material/Grid'
import RoundPagination from '@components/ui/pagination/roundPagination'
import ResumeCard from '@components/cards/resumeCard'
import Typography from '@mui/material/Typography'
const ResumeGrid = () => {
    return (
        <Grid
            container
            columnSpacing={5}
            rowSpacing={3}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={12}>
                <Typography variant="h5">CV được tải lên</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid item xs={12} sm={6}>
                <ResumeCard />
            </Grid>

            <Grid
                item
                xs={12}
                sx={{ justifyContent: 'center', display: 'flex', mt: 4 }}
            >
                <RoundPagination />
            </Grid>
        </Grid>
    )
}

export default ResumeGrid

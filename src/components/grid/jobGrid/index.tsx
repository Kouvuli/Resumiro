import React from 'react'
import Grid from '@mui/material/Grid'
import JobCard from '@components/cards/jobCard'
import RoundPagination from '@components/ui/pagination/roundPagination'
const JobGrid = () => {
    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
            </Grid>
            <Grid item xs={12} sm={6}>
                <JobCard />
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

export default JobGrid

import React from 'react'
import Grid from '@mui/material/Grid'
import JobCard, { JobCardProps } from '@components/cards/jobCard'
import RoundPagination from '@components/ui/pagination/roundPagination'
import { Job } from '@shared/interfaces'
interface JobGridProps {
  perPage: number
  page: number
  totalPage: number
  data: JobCardProps[]
}

const JobGrid: React.FC<JobGridProps> = ({ totalPage, data, page }) => {
  return (
    <Grid container spacing={3} alignItems="center">
      {data.map((job, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <JobCard {...job} />
        </Grid>
      ))}

      <Grid
        item
        xs={12}
        sx={{ justifyContent: 'center', display: 'flex', mt: 4 }}
      >
        <RoundPagination page={page} totalPage={totalPage} />
      </Grid>
    </Grid>
  )
}

export default JobGrid

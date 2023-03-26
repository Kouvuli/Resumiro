import React from 'react'
import Grid from '@mui/material/Grid'
import RoundPagination from '@components/ui/pagination/roundPagination'
import ResumeCard, { ResumeCardProps } from '@components/cards/resumeCard'
import Typography from '@mui/material/Typography'

interface ResumeGridProps {
  perPage: number
  page: number
  totalPage: number
  data: ResumeCardProps[]
  title?: string
  type?: number
}

const ResumeGrid: React.FC<ResumeGridProps> = ({
  data,
  page,
  totalPage,
  title,
  type
}) => {
  console.log(data)
  return (
    <Grid
      container
      columnSpacing={5}
      rowSpacing={3}
      alignItems="center"
      justifyContent="center"
    >
      {title && (
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      )}
      {data.map((resume, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <ResumeCard {...resume} type={type} />
        </Grid>
      ))}

      {page && (
        <Grid
          item
          xs={12}
          sx={{ justifyContent: 'center', display: 'flex', mt: 4 }}
        >
          <RoundPagination page={page} totalPage={totalPage} />
        </Grid>
      )}
    </Grid>
  )
}

export default ResumeGrid

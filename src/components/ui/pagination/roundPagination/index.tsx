import React from 'react'
import Pagination from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'

interface RoundPaginationProps {
  page: number
  totalPage: number
}

const CustomRoundPagination = styled(Pagination)(({ theme }) => ({
  '& .Mui-selected': {
    backgroundColor: `${theme.palette.primary.main}!important`,
    color: `${theme.palette.primary.contrastText}!important`
  },
  '& 	.MuiPaginationItem-root': {
    fontWeight: 600,
    fontSize: '1rem'
  }
}))

const RoundPagination: React.FC<RoundPaginationProps> = ({
  totalPage,
  page
}) => {
  return (
    <CustomRoundPagination
      count={totalPage}
      page={page}
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  )
}

export default RoundPagination

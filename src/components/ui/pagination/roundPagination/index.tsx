import React from 'react'
import Pagination from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'
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

const RoundPagination = () => {
    return (
        <CustomRoundPagination
            count={10}
            variant="outlined"
            shape="rounded"
            color="primary"
            size="large"
        />
    )
}

export default RoundPagination

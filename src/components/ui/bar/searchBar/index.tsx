import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import SearchTextField from '@components/ui/textfield/searchTextField'
import RoundButton from '@components/ui/button/roundButton'
const SearchBar = () => {
    return (
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchTextField />
            <Box sx={{ flexGrow: 1 }} />
            <RoundButton style={{ padding: '9px 15px', fontSize: '15px' }}>
                Tìm kiếm
            </RoundButton>
        </Grid>
    )
}

export default SearchBar

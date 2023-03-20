import React from 'react'
import Grid from '@mui/material/Grid'
import SearchTextField from '@components/ui/textfield/searchTextField'
import RoundButton from '@components/ui/button/roundButton'
import RoundSelect from '@components/ui/select'
const SearchBar = () => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchTextField style={{ flexGrow: 1 }} />
      <RoundSelect outlined style={{ marginLeft: '8px' }} />
      <RoundSelect outlined style={{ marginLeft: '8px' }} />
      <RoundButton
        style={{
          padding: '7px 15px',
          fontSize: '15px',
          marginLeft: '8px'
        }}
      >
        Tìm kiếm
      </RoundButton>
    </Grid>
  )
}

export default SearchBar

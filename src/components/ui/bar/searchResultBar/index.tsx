import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import RoundSelect from '@components/ui/select'

interface SearchResultBarProps {
  numberSearch: number
  handleChange?: (_value: string) => void
  options?: { value: string; label: string }[]
}

const SearchResultBar: React.FC<SearchResultBarProps> = ({
  numberSearch,
  handleChange,
  options
}) => {
  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ flexGrow: 1 }} variant="h5">
        Đã tìm thấy{' '}
        <span>
          <Typography
            variant="h5"
            sx={{ display: 'inline-block', color: 'info.dark' }}
          >
            {numberSearch}
          </Typography>
        </span>{' '}
        kết quả
      </Typography>
      {options && <RoundSelect options={options} handleChange={handleChange} />}
    </Grid>
  )
}

export default SearchResultBar

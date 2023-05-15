import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ToggleButtonGroup } from '@mui/material'
import Toggle from '@components/ui/button/toggleButton'

import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import RoundSelect from '@components/ui/select'

interface SearchResultBarProps {
  numberSearch: number
  handleChange?: (value: string) => void
  options?: { value: string; label: string }[]
}

const SearchResultBar: React.FC<SearchResultBarProps> = ({
  numberSearch,
  handleChange,
  options
}) => {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic'])

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats)
  }

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

      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        sx={{ marginLeft: '10px' }}
      >
        <Toggle icon={<ViewHeadlineOutlinedIcon />}></Toggle>
        <Toggle icon={<GridViewOutlinedIcon />}></Toggle>
      </ToggleButtonGroup>
    </Grid>
  )
}

export default SearchResultBar

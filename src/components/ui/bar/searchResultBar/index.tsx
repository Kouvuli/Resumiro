import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ToggleButtonGroup } from '@mui/material'
import Toggle from '@components/ui/button/toggleButton'

import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import RoundSelect from '@components/ui/select'

interface SearchResultBarProps {
  type?: number
}

const SearchResultBar: React.FC<SearchResultBarProps> = ({ type }) => {
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
        Title
      </Typography>
      <RoundSelect outlined />
      {type === 2 && (
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          sx={{ marginLeft: '10px' }}
        >
          <Toggle icon={<ViewHeadlineOutlinedIcon />}></Toggle>
          <Toggle icon={<GridViewOutlinedIcon />}></Toggle>
        </ToggleButtonGroup>
      )}
    </Grid>
  )
}

export default SearchResultBar

import React from 'react'
import Grid from '@mui/material/Grid'
import SearchTextField from '@components/ui/textfield/searchTextField'
import RoundButton from '@components/ui/button/roundButton'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { jobSelector } from '@redux/selectors'
import RoundSelect from '@components/ui/select'

interface SearchBarProps {
  handleChange?: (value: string) => void
  handleSearch: () => void
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const options = [
  {
    value: 'Ho_Chi_Minh',
    label: 'TP.Hồ Chí Minh'
  },
  {
    value: 'Ha_Noi',
    label: 'Hà Nội'
  },
  {
    value: 'Da_Nang',
    label: 'Đà Nẵng'
  }
]

const SearchBar: React.FC<SearchBarProps> = ({
  handleChange,
  handleSearch,
  handleSearchTextChange
}) => {
  const router = useRouter()

  return (
    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <SearchTextField
        style={{ flexGrow: 1 }}
        handleSearchTextChange={handleSearchTextChange}
      />
      {router.pathname === '/cong-ty' && (
        <RoundSelect
          handleChange={handleChange}
          style={{ marginLeft: '8px' }}
          options={options}
        />
      )}
      <RoundButton
        style={{
          padding: '7px 15px',
          fontSize: '15px',
          marginLeft: '8px'
        }}
        onClick={handleSearch}
      >
        Tìm kiếm
      </RoundButton>
    </Grid>
  )
}

export default SearchBar

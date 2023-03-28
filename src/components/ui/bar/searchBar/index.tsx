import React from 'react'
import Grid from '@mui/material/Grid'
import SearchTextField from '@components/ui/textfield/searchTextField'
import RoundButton from '@components/ui/button/roundButton'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { jobSelector } from '@redux/selectors'
import { useSession } from 'next-auth/react'
import RoundSelect from '@components/ui/select'

interface SearchBarProps {
  handleChange?: (value: string) => void
  handleSearch: () => void
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddJob?: () => void
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
  handleSearchTextChange,
  handleAddJob
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  console.log(session)
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
      {router.pathname === '/viec-lam' &&
        session &&
        session.user?.email === 'recruiter' && (
          <RoundButton
            primary
            style={{
              padding: '7px 15px',
              fontSize: '15px',
              marginLeft: '8px',
              textTransform: 'none'
            }}
            onClick={handleAddJob}
          >
            Thêm công việc
          </RoundButton>
        )}

      <RoundButton
        style={{
          padding: '7px 15px',
          fontSize: '15px',
          marginLeft: '8px',
          textTransform: 'none'
        }}
        onClick={handleSearch}
      >
        Tìm kiếm
      </RoundButton>
    </Grid>
  )
}

export default SearchBar

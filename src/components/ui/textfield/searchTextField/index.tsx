import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import { useAppDispatch } from '@hooks/index'
import jobSlice from '@redux/reducers/jobSlice'

interface SearchTextFieldProps {
  style?: React.CSSProperties
  handleSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomOutlinedInput = styled(OutlinedInput)(({}) => ({
  // '& .MuiOutlinedInput-root': {
  //     paddingLeft: '8px!important'
  // },
  '& 	.MuiOutlinedInput-input': {
    padding: '5px 8px'
  }
}))
const SearchTextField: React.FC<SearchTextFieldProps> = ({
  style,
  handleSearchTextChange
}) => {
  return (
    <FormControl variant="standard" sx={style}>
      {/* <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
            </InputLabel> */}
      <CustomOutlinedInput
        onChange={handleSearchTextChange}
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default SearchTextField

import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'

interface FilterTextFieldProps {
  label: string
}

const CustomFilterTextField = styled(OutlinedInput)(({}) => ({
  '& .MuiFormLabel-root': {
    top: '-8px'
  },
  '& .MuiInputBase-input': {
    padding: '6px 10px'
  }
}))

const FilterTextField: React.FC<FilterTextFieldProps> = ({ label }) => {
  return (
    <FormControl variant="standard">
      <InputLabel
        htmlFor="input-with-icon-adornment"
        sx={{ top: '-12px', left: '10px' }}
      >
        {label}
      </InputLabel>
      <CustomFilterTextField />
    </FormControl>
  )
}

export default FilterTextField

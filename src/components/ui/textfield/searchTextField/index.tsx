import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
const CustomOutlinedInput = styled(OutlinedInput)(({}) => ({
    '& .MuiInputBase-root': {
        paddingLeft: '8px'
    },
    '& 	.MuiOutlinedInput-input': {
        padding: '8px 8px'
    }
}))
const SearchTextField = () => {
    return (
        <FormControl variant="standard" sx={{ width: '70%' }}>
            {/* <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
            </InputLabel> */}
            <CustomOutlinedInput
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

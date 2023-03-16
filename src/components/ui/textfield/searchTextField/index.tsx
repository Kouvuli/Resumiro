import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'

interface SearchTextFieldProps {
    style: React.CSSProperties
}

const CustomOutlinedInput = styled(OutlinedInput)(({}) => ({
    // '& .MuiOutlinedInput-root': {
    //     paddingLeft: '8px!important'
    // },
    '& 	.MuiOutlinedInput-input': {
        padding: '5px 8px'
    }
}))
const SearchTextField: React.FC<SearchTextFieldProps> = ({ style }) => {
    return (
        <FormControl variant="standard" sx={style}>
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

import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
interface OutlinedButtonProps {
    children: React.ReactNode
}

const CustomOutlinedButton = styled(Button)(({ theme }) => ({
    padding: ` ${theme.spacing(1)} ${theme.spacing(4)}`
}))

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ children }) => {
    return (
        <CustomOutlinedButton
            sx={{ textTransform: 'capitalize' }}
            variant="outlined"
            disableElevation
            disableFocusRipple
        >
            {children}
        </CustomOutlinedButton>
    )
}

export default OutlinedButton

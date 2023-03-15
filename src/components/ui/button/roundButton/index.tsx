import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

interface RoundButtonProps {
    children: React.ReactNode
    startIcon?: React.ReactNode
    style?: React.CSSProperties
    primary?: boolean
}

const CustomRoundButton = styled(Button)(({ theme }) => ({
    // background: theme.palette.secondary.main,
    padding: theme.spacing(2),
    textTransform: 'capitalize',
    fontWeight: 600,
    fontSize: 18
}))
const RoundButton: React.FC<RoundButtonProps> = ({
    style,
    primary,
    children,
    startIcon
}) => {
    return (
        <CustomRoundButton
            variant="contained"
            color={primary ? 'primary' : 'secondary'}
            disableElevation
            disableFocusRipple
            startIcon={startIcon}
            sx={style}
        >
            {children}
        </CustomRoundButton>
    )
}

export default RoundButton

import { Button } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
interface OvalButtonProps {
    primary?: boolean
    outlined?: boolean
    children: React.ReactNode
    startIcon?: React.ReactNode
    style?: React.CSSProperties
}

const CustomOvalButton = styled(Button)(({}) => ({
    // background: theme.palette.secondary.main,
    textTransform: 'capitalize',
    borderRadius: '100px'
}))

const OvalButton: React.FC<OvalButtonProps> = ({
    primary,
    outlined,
    children,
    startIcon,
    style
}) => {
    return (
        <CustomOvalButton
            variant={outlined ? 'outlined' : 'contained'}
            color={primary ? 'primary' : 'secondary'}
            disableElevation
            disableFocusRipple
            startIcon={startIcon}
            sx={style}
        >
            {children}
        </CustomOvalButton>
    )
}

export default OvalButton

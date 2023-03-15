import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

interface TagButton {
    children: React.ReactNode
    icon: React.ReactNode
    type?: number
    style?: React.CSSProperties
}

const CustomTagButtonType2 = styled(Button)(({ theme }) => ({
    // color: theme.palette.primary.main,
    textTransform: 'none',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.secondary.light
    }
    // display: 'inline-flex',
    // justifyCotent: 'center',
    // alignItems: 'center',
    // '& span': {
    //     marginRight: '5px'
    // },
}))

const CustomTagButtonType1 = styled(Button)(({ theme }) => ({
    // color: theme.palette.primary.main,
    textTransform: 'capitalize',
    marginBottom: theme.spacing(1)
    // display: 'inline-flex',
    // justifyCotent: 'center',
    // alignItems: 'center',
    // '& span': {
    //     marginRight: '5px'
    // },
}))

const TagButton: React.FC<TagButton> = ({ icon, children, type, style }) => {
    if (type === 2) {
        return (
            <CustomTagButtonType2
                disableRipple
                disableElevation
                variant="text"
                size="small"
                sx={style}
                startIcon={icon}
            >
                {children}
            </CustomTagButtonType2>
        )
    }
    return (
        <CustomTagButtonType1
            disableRipple
            disableElevation
            variant="text"
            startIcon={icon}
            sx={style}
        >
            {children}
        </CustomTagButtonType1>
        // <CustomTagButton>
        //     <span>{icon}</span> {children}
        // </CustomTagButton>
    )
}

export default TagButton

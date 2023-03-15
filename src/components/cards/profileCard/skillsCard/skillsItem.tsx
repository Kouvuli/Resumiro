import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
const CustomExperienceItem = styled(Card)(({}) => ({
    boxShadow: 'unset',
    width: '100%'
}))

const SkillItem = () => {
    return (
        <CustomExperienceItem>
            <CardHeader
                avatar={
                    <Image
                        style={{ borderRadius: '4px' }}
                        src="/images/Images_1.png"
                        width={55}
                        height={55}
                        alt="avatar"
                    />
                }
                title={
                    <Typography variant="h6" color="text.primary">
                        Spring boot
                    </Typography>
                }
                sx={{ padding: '0', alignItems: 'center' }}
            />
        </CustomExperienceItem>
    )
}

export default SkillItem

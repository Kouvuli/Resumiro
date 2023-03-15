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

const ExperienceItem = () => {
    return (
        <CustomExperienceItem>
            <CardHeader
                avatar={
                    <Image
                        style={{ borderRadius: '5px' }}
                        src="/images/Images_1.png"
                        width={80}
                        height={80}
                        alt="avatar"
                    />
                }
                title={
                    <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{ mb: 1 }}
                    >
                        QA/ QC Tester
                    </Typography>
                }
                subheader={
                    <>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            AngileOps . Full-time
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            02/2023 - Nay
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Ho Chi Minh City, Viet Nam . On-site
                        </Typography>
                    </>
                }
                sx={{ padding: '0', alignItems: 'start' }}
            />
        </CustomExperienceItem>
    )
}

export default ExperienceItem

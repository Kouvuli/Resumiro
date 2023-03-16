import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import LanguageIcon from '@mui/icons-material/Language'
import Image from 'next/image'
import IconButton from '@mui/material/IconButton'
import { motion, Variants } from 'framer-motion'
const CustomJobCard = styled(Card)(({ theme }) => ({
    borderRadius: '5px',
    width: '100%',
    boxShadow: 'unset',
    border: `1px solid ${theme.palette.text.disabled}`
}))

const variants: Variants = {
    initial: {
        opacity: 0,
        y: '20px'
    },
    visible: {
        opacity: 1,
        y: 0
    }
}
const CompanyBriefCard = () => {
    return (
        <motion.div
            style={{ width: '100%' }}
            variants={variants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <CustomJobCard>
                <CardHeader
                    sx={{
                        padding: '24px',
                        alignItems: 'start'
                    }}
                    avatar={
                        <Image
                            style={{ borderRadius: '5px' }}
                            src="/images/Images_1.png"
                            width={65}
                            height={65}
                            alt="avatar"
                        />
                    }
                    title={
                        <Typography
                            variant="h5"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            DXC Technology Vietnam
                        </Typography>
                    }
                    subheader={
                        <div>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textTransform: 'capitalize',
                                    mt: 1
                                }}
                            >
                                1001 - 5000 employees
                            </Typography>
                            <IconButton sx={{ my: 1 }}>
                                <LanguageIcon />
                            </IconButton>
                        </div>
                    }
                />
                <CardContent
                    sx={{
                        padding: '0 24px 24px 24px'
                    }}
                >
                    <Typography variant="h5">Địa chỉ công ty</Typography>
                    <Typography variant="body1" sx={{ my: 1.2 }}>
                        364 Cộng Hòa, Phường 13, Quận Tân Bình, Thành phố Hồ Chí
                        Minh
                    </Typography>
                </CardContent>
            </CustomJobCard>
        </motion.div>
    )
}

export default CompanyBriefCard

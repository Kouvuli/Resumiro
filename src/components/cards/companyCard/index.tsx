import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { CardHeader, IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'

import Image from 'next/image'
import TagButton from '@components/ui/button/tagButton'
import Box from '@mui/material/Box'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
interface CompanyCardProps {
    type?: number
}

const CustomJobCard = styled(Card)(({}) => ({
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.25)',

    borderRadius: '3%',
    '& .MuiPaper-root': {
        boxShadow: 'unset'
    }
}))

const jobCardVariants: Variants = {
    initial: {
        opacity: 0,
        y: '20px'
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const CompanyCard: React.FC<CompanyCardProps> = ({ type }) => {
    // const variants = jobCardVariants(index)
    if (type === 2) {
        return (
            <motion.div
                style={{ minWidth: 275, width: '100%' }}
                variants={jobCardVariants}
                initial="initial"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    duration: 0.5
                    // delay: index * 0.2
                }}
            >
                <CustomJobCard>
                    <CardHeader
                        sx={{
                            alignItems: 'start'
                        }}
                        avatar={
                            <Image
                                style={{ borderRadius: '5px' }}
                                src="/images/Images_1.png"
                                width={60}
                                height={60}
                                alt="avatar"
                            />
                        }
                        title={
                            <Typography
                                variant="h5"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                Rebel Corporation Vietnam
                            </Typography>
                        }
                        subheader={
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.disabled',
                                    textTransform: 'capitalize'
                                }}
                            >
                                Ho Chi Minh City, Viet Nam
                            </Typography>
                        }
                    />
                    <CardContent
                        sx={{
                            padding: '0 12px 12px 12px'
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TagButton
                                style={{ marginRight: '6px' }}
                                type={2}
                                icon={<BusinessRoundedIcon />}
                            >
                                Publishing
                            </TagButton>

                            <TagButton
                                style={{ marginRight: '6px' }}
                                type={2}
                                icon={<BusinessCenterRoundedIcon />}
                            >
                                4 vị trí đang tuyển
                            </TagButton>
                        </div>
                    </CardContent>
                    <CardActions sx={{ padding: '0 12px 12px 12px' }}>
                        <Typography variant="body2">
                            Cập nhật 6 giờ trước
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton size="small">
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                        <IconButton size="small">
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </CardActions>
                </CustomJobCard>
            </motion.div>
        )
    }
    return (
        <motion.div
            variants={jobCardVariants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
                duration: 0.5
                // delay: index * 0.2
            }}
        >
            <CustomJobCard>
                <CardHeader
                    sx={{ alignItems: 'start', padding: '24px 24px 12px 24px' }}
                    avatar={
                        <Image
                            style={{ borderRadius: '5px' }}
                            src="/images/Images_1.png"
                            width={60}
                            height={60}
                            alt="avatar"
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                    }
                    title={
                        <Typography
                            variant="h5"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            Rebel Corporation Vietnam
                        </Typography>
                    }
                    subheader={
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.disabled',
                                textTransform: 'capitalize'
                            }}
                        >
                            Ho Chi Minh City, Viet Nam
                        </Typography>
                    }
                />
                <CardContent
                    sx={{
                        padding: '0 24px 24px 24px'
                    }}
                >
                    <ul style={{ listStyleType: 'none' }}>
                        <li>
                            <TagButton
                                style={{ marginRight: '6px' }}
                                type={2}
                                icon={<BusinessRoundedIcon />}
                            >
                                Publishing
                            </TagButton>
                        </li>
                        <li>
                            <TagButton
                                style={{ marginRight: '6px' }}
                                type={2}
                                icon={<BusinessCenterRoundedIcon />}
                            >
                                4 vị trí đang tuyển
                            </TagButton>
                        </li>
                        <li style={{ paddingTop: '8px' }}>
                            <Typography variant="body2">
                                Cập nhật 6 giờ trước
                            </Typography>
                        </li>
                    </ul>
                </CardContent>
            </CustomJobCard>
        </motion.div>
    )
}

export default CompanyCard

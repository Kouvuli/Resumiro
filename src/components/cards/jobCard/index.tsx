import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import { CardHeader, IconButton } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Image from 'next/image'
import TagButton from '@components/ui/button/tagButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Link from 'next/link'
interface JobCardProps {
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

const JobCard: React.FC<JobCardProps> = ({ type }) => {
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
                <Link href="/viec-lam/1">
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
                                    sx={{ textTransform: 'none' }}
                                >
                                    Nhân viên bảo trì thiết bị
                                </Typography>
                            }
                            subheader={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.disabled',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Công ty TNHH ABC
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
                                    icon={<MonetizationOnIcon />}
                                >
                                    VND 2.5 - 3 triệu
                                </TagButton>

                                <TagButton
                                    style={{ marginRight: '6px' }}
                                    icon={<LocationOnIcon />}
                                >
                                    Hồ Chí Minh
                                </TagButton>

                                <TagButton icon={<WorkIcon />}>
                                    Từ 1-3 năm
                                </TagButton>
                            </div>
                        </CardContent>
                        <CardActions sx={{ padding: '0 12px 12px 12px' }}>
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                Cập nhật 6 giờ trước
                            </Typography>

                            <IconButton size="small">
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <IconButton size="small">
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </CardActions>
                    </CustomJobCard>
                </Link>
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
            <Link href="/viec-lam/1">
                <CustomJobCard>
                    <CardHeader
                        sx={{
                            alignItems: 'start',
                            padding: '24px 24px 12px 24px'
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
                        action={
                            <IconButton aria-label="settings">
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                        }
                        title={
                            <Typography
                                variant="h5"
                                sx={{ textTransform: 'uppercase', mb: 1 }}
                            >
                                Nhân viên bảo trì thiết bị
                            </Typography>
                        }
                        subheader={
                            <Typography variant="body1">
                                Công ty TNHH ABC
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
                                    primary
                                    icon={<MonetizationOnIcon />}
                                >
                                    VND 2.500.000 - 3.000.000
                                </TagButton>
                            </li>
                            <li>
                                <TagButton primary icon={<LocationOnIcon />}>
                                    Hồ Chí Minh
                                </TagButton>
                            </li>
                            <li>
                                <TagButton primary icon={<WorkIcon />}>
                                    Từ 1-3 năm
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
            </Link>
        </motion.div>
    )
}

export default JobCard

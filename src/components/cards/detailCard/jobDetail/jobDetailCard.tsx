import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import TagButton from '@components/ui/button/tagButton'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CardHeader from '@mui/material/CardHeader'
import RoundButton from '@components/ui/button/roundButton'
import CardActions from '@mui/material/CardActions'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ShareIcon from '@mui/icons-material/Share'
import Image from 'next/image'
const CustomJobCard = styled(Card)(({ theme }) => ({
    borderRadius: '0',
    boxShadow: 'unset',
    borderBottom: `1px solid ${theme.palette.text.disabled}`
}))

const JobDetailCard = () => {
    return (
        <CustomJobCard>
            <CardHeader
                sx={{ alignItems: 'start', padding: '24px 24px 12px 24px' }}
                avatar={
                    <Image
                        style={{ borderRadius: '5px' }}
                        src="/images/Images_1.png"
                        width={70}
                        height={70}
                        alt="avatar"
                    />
                }
                title={
                    <Typography
                        variant="h4"
                        sx={{ textTransform: 'uppercase', mb: 1 }}
                    >
                        Java Intern
                    </Typography>
                }
                subheader={
                    <Typography variant="h6" color="info.main">
                        DXC Technology Vietnam
                    </Typography>
                }
            />
            <CardContent
                sx={{
                    padding: '0 24px 0 24px'
                }}
            >
                <ul style={{ listStyleType: 'none' }}>
                    <li>
                        <TagButton
                            size="large"
                            primary
                            icon={<MonetizationOnIcon />}
                        >
                            VND 5.000.000/Tháng
                        </TagButton>
                    </li>
                    <li>
                        <TagButton
                            size="large"
                            primary
                            icon={<LocationOnIcon />}
                        >
                            Hồ Chí Minh
                        </TagButton>
                    </li>
                    <li>
                        <TagButton
                            size="large"
                            primary
                            icon={<LocationOnIcon />}
                        >
                            Thực tập
                        </TagButton>
                    </li>
                    <li>
                        <TagButton size="large" primary icon={<WorkIcon />}>
                            Từ 1-3 năm
                        </TagButton>
                    </li>
                    <li
                        style={{
                            paddingTop: '8px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Đăng trong tháng trước
                        </Typography>
                        <FiberManualRecordIcon
                            sx={{
                                fontSize: '0.6rem',
                                mx: 0.5,
                                color: 'primary.main'
                            }}
                        />
                        <Typography variant="body1" color="info.main">
                            Cập nhật hôm qua
                        </Typography>
                    </li>
                </ul>
            </CardContent>
            <CardActions sx={{ padding: '24px' }}>
                <RoundButton
                    primary
                    style={{ padding: '12px', fontSize: '1.1rem' }}
                >
                    Ứng tuyển nhanh
                </RoundButton>
                <RoundButton
                    style={{ padding: '12px', fontSize: '1.1rem' }}
                    startIcon={<FavoriteBorderOutlinedIcon />}
                >
                    Thích
                </RoundButton>
                <RoundButton
                    style={{ padding: '12px', fontSize: '1.1rem' }}
                    startIcon={<ShareIcon />}
                >
                    Chia sẻ
                </RoundButton>
            </CardActions>
        </CustomJobCard>
    )
}

export default JobDetailCard

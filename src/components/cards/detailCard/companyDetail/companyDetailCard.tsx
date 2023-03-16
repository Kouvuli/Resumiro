import React from 'react'
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Divider
} from '@mui/material'
import styles from './companyDetailCardStyle.module.css'
import Image from 'next/image'
import Link from 'next/link'
import RoundButton from '@components/ui/button/roundButton'
const CompanyDetailCard = () => {
    return (
        <Card sx={{ borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }}>
            <CardHeader
                sx={{
                    alignItems: 'start',
                    padding: '24px'
                }}
                avatar={
                    <Image
                        style={{ borderRadius: '5px' }}
                        src="/images/Images_1.png"
                        width={180}
                        height={180}
                        alt="avatar"
                    />
                }
                title={
                    <Typography
                        variant="h3"
                        sx={{
                            textTransform: 'capitalize',
                            mb: 2,
                            color: 'primary.main'
                        }}
                    >
                        DXC Technology Vietnam
                    </Typography>
                }
                subheader={
                    <>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.3rem',
                                color: 'text.primary',
                                textTransform: 'none',
                                mb: 2
                            }}
                        >
                            DXC Technology is a Fortune 500 global IT services
                            leader. Our more than 130,000 people in 70-plus
                            countries are entrusted by our customers to deliver
                            what matters most.
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <dl className={styles['description']}>
                                <dt>Địa điểm</dt>
                                <dd>Vietnam</dd>
                                <dt>Website</dt>
                                <dd>
                                    <Link
                                        rel="nofollow noopener noreferrer"
                                        href="http://dxc.com"
                                        target="_blank"
                                    >
                                        http://dxc.com
                                    </Link>
                                </dd>
                                <dt>Quy mô công ty</dt>
                                <dd>1001 - 5000 nhân viên</dd>
                            </dl>
                        </div>
                    </>
                }
            ></CardHeader>
            <CardContent sx={{ p: '0 24px 24px 24px' }}>
                <Divider sx={{ mb: 2 }} />

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <RoundButton
                        style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.25)' }}
                    >
                        Xem việc làm đang tuyển
                    </RoundButton>
                </div>
            </CardContent>
        </Card>
    )
}

export default CompanyDetailCard

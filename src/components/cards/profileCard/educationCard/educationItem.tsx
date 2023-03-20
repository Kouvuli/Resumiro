import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
const CustomEducationItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

const EducationItem = () => {
  return (
    <CustomEducationItem>
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
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            Đại học Khoa Học Tự Nhiên - DHQGHCM
          </Typography>
        }
        subheader={
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Cử nhân . Công nghệ thông tin
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              2019 - 2023
            </Typography>
          </>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
    </CustomEducationItem>
  )
}

export default EducationItem

import React from 'react'
import { Card, CardHeader, Typography } from '@mui/material'
import Image from 'next/image'
import { candidates } from '@prisma/client'
import { styled } from '@mui/material/styles'
interface JobApplicantItemProps {
  data: candidates
}
const CustomJobApplicantItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
const JobApplicantItem: React.FC<JobApplicantItemProps> = ({ data }) => {
  return (
    <CustomJobApplicantItem sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          data.avatar && (
            <Image
              style={{ borderRadius: '5px' }}
              src={data.avatar!}
              width={80}
              height={80}
              alt="avatar"
            />
          )
        }
        title={
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {data.full_name}
          </Typography>
        }
        subheader={
          <div>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {data.email} - {data.phone}
            </Typography>
          </div>
        }
      ></CardHeader>
    </CustomJobApplicantItem>
  )
}

export default JobApplicantItem

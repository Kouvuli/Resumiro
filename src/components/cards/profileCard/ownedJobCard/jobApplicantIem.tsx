import React from 'react'
import { Card, CardHeader, Typography } from '@mui/material'
import { users } from '@prisma/client'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'
interface JobApplicantItemProps {
  data: users
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
          <Image
            style={{ borderRadius: '5px' }}
            src={data.avatar ? data.avatar : '/images/default-user.jpg'}
            width={80}
            height={80}
            alt="avatar"
          />
        }
        title={
          <Link href={`/ung-vien/${data.id}`}>
            <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
              {data.full_name ? data.full_name : data.username}
            </Typography>
          </Link>
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

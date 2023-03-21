import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { certificates } from '@prisma/client'
const CustomEducationItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

interface EducationItemProps {
  data: certificates
}

const EducationItem: React.FC<EducationItemProps> = ({ data }) => {
  return (
    <CustomEducationItem>
      <CardHeader
        title={
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {data.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {new Date(data.verified_at).toLocaleDateString()}
          </Typography>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
    </CustomEducationItem>
  )
}

export default EducationItem

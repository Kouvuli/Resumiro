import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Experience } from '@shared/interfaces'
const CustomExperienceItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
interface ExperienceItemProps {
  data: Experience
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ data }) => {
  return (
    <CustomExperienceItem>
      <CardHeader
        avatar={
          <Image
            style={{ borderRadius: '5px' }}
            src={data.company.logo}
            width={80}
            height={80}
            alt="avatar"
          />
        }
        title={
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {data.position}
          </Typography>
        }
        subheader={
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {data.company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {data.start} - {data.finish}
            </Typography>
          </>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
    </CustomExperienceItem>
  )
}

export default ExperienceItem

import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
const CustomExperienceItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

interface SkillItemProps {
  image?: string
  name: string | null
}

const SkillItem: React.FC<SkillItemProps> = ({ image, name }) => {
  return (
    <CustomExperienceItem>
      <CardHeader
        title={
          <Typography variant="h6" color="text.primary">
            {name}
          </Typography>
        }
        sx={{ padding: '0', alignItems: 'center' }}
      />
    </CustomExperienceItem>
  )
}

export default SkillItem

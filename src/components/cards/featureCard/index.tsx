import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import React from 'react'
import { Typography } from '@mui/material'
import { motion, Variants } from 'framer-motion'
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const qualityVariants: Variants = {
  initial: {
    opacity: 0,
    y: '20px'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const CustomFeatureCard = styled(Box)(({}) => ({
  // width: '100%',
  // height: '20px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
}))

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <motion.div
      variants={qualityVariants}
      initial="initial"
      viewport={{ once: true }}
      whileInView="visible"
    >
      <CustomFeatureCard>
        <div style={{ marginRight: '1rem' }}>{icon}</div>
        <div>
          <Typography variant="h6" sx={{ fontWeight: 550 }}>
            {title}
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </div>
      </CustomFeatureCard>
    </motion.div>
  )
}

export default FeatureCard

import { Card, CardMedia } from '@mui/material'
import React, { useEffect } from 'react'
import { motion, Variants, useAnimationControls } from 'framer-motion'
import { useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'

interface BackgroundProps {
  src: string | null
  alt: string | null
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: '20px'
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const BackgroundCard: React.FC<BackgroundProps> = ({ src, alt }) => {
  const { loading } = useAppSelector(profileSelector)
  const controls = useAnimationControls()
  useEffect(() => {
    controls.stop()
    if (!loading) {
      controls.start('visible')
    }
  }, [loading])
  return (
    <motion.div
      animate={controls}
      variants={variants}
      initial="initial"
      // whileInView="visible"
      viewport={{ once: true }}
    >
      <Card
        sx={{
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
          boxShadow:
            ' -1px -1px 1px 0px rgba(0,0,0,0.12), 0px 0px 1px 0px rgba(0,0,0,0.12), 2px 0px 3px 0px rgba(0,0,0,0.12);'
        }}
      >
        <CardMedia
          component="img"
          src={src ? src : '/images/default-background.jpg'}
          width="100%"
          height="350px"
          alt={alt!}
        />
      </Card>
    </motion.div>
  )
}

export default BackgroundCard

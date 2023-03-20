import { Card, CardMedia } from '@mui/material'
import React from 'react'

interface BackgroundProps {
  src: string | null
  alt: string | null
}

const BackgroundCard: React.FC<BackgroundProps> = ({ src, alt }) => {
  return (
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
        src={src}
        width="100%"
        height="350px"
        alt={alt}
      />
    </Card>
  )
}

export default BackgroundCard

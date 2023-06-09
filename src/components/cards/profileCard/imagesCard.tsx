import React, { useEffect } from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Button,
  CardActions,
  ImageList,
  ImageListItem
} from '@mui/material'
import { motion, Variants, useAnimationControls } from 'framer-motion'
import { profileSelector } from '@redux/selectors'
import { useAppSelector } from '@hooks/index'

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera'
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee'
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats'
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey'
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball'
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern'
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms'
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil'
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star'
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike'
  }
]

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

const ImagesCard = () => {
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
          borderTopRightRadius: '0px',
          borderTopLeftRadius: '0px'
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h5"
              color="text.primary"
              sx={{
                fontSize: '20px',
                textTransform: 'capitalize'
              }}
            >
              Hình ảnh
            </Typography>
          }
        />
        <CardContent sx={{ py: 0 }}>
          <ImageList cols={3} rowHeight={164} sx={{ borderRadius: '5px' }}>
            {itemData.map(item => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
        <CardActions sx={{ py: 'unset' }}>
          <div style={{ flexGrow: 1 }}></div>
          <Button
            variant="text"
            color="primary"
            sx={{ textTransform: 'capitalize', my: 1.5 }}
          >
            Xem tất cả
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  )
}

export default ImagesCard

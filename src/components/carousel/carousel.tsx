import React from 'react'
import Carousel from 'nuka-carousel/lib/carousel'
// import Box from '@mui/material/Box'
// import { styled } from '@mui/material/styles'
import BlogCard from '@components/cards/blogCard'
import { motion, Variants } from 'framer-motion'
import { Blog } from '@shared/interfaces'

interface CarouselProps {
  items: Blog[]
}

const variants: Variants = {
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

const Slider: React.FC<CarouselProps> = ({ items }) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Carousel
        style={{ padding: '1.5% 0 5%' }}
        wrapAround={true}
        renderCenterLeftControls={() => null}
        renderCenterRightControls={() => null}
        renderBottomCenterControls={({
          slideCount,
          currentSlide,
          goToSlide
        }) => (
          <div style={{ margin: '0px 0' }}>
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: currentSlide === i ? '#1B3764' : '#D8D8D8',
                  margin: '0 5px',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none'
                }}
              />
            ))}
          </div>
        )}
        animation="fade"
        slidesToShow={3}
        cellSpacing={20}
      >
        {items.map(item => (
          <BlogCard
            image={item.image}
            title={item.title}
            date={item.date}
            key={item.id}
          />
        ))}
      </Carousel>
    </motion.div>
  )
}

export default Slider

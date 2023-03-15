import React from 'react'
import Carousel from 'nuka-carousel/lib/carousel'
// import Box from '@mui/material/Box'
// import { styled } from '@mui/material/styles'
import BlogCard from '@components/cards/blogCard'
import { motion, Variants } from 'framer-motion'
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

const Slider: React.FC = () => {
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
                                    backgroundColor:
                                        currentSlide === i
                                            ? '#1B3764'
                                            : '#D8D8D8',
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
                <BlogCard
                    image="/images/Blog_1.png"
                    title="The best website in 2023"
                    date="10 tháng 1, 2023"
                />
                <BlogCard
                    image="/images/Blog_2.png"
                    title="Solution for your future"
                    date="20 tháng 1, 2021"
                />
                <BlogCard
                    image="/images/Blog_3.png"
                    title="Make your resume better and find your own job"
                    date="10 tháng 1, 2023"
                />
            </Carousel>
        </motion.div>
    )
}

export default Slider

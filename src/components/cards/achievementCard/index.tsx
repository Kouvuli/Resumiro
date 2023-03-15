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
    width: '100%',
    height: '20px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}))

const AchievementCard: React.FC<FeatureCardProps> = ({
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
                <div
                // variants={qualityVariants}
                >
                    {icon}
                </div>

                <Typography
                    color="primary"
                    variant="h5"
                    sx={{ fontWeight: 550, py: '6%' }}
                >
                    {title}
                </Typography>
                <Typography sx={{ color: 'grey' }} variant="subtitle2">
                    {description}
                </Typography>
            </CustomFeatureCard>
        </motion.div>
    )
}

export default AchievementCard

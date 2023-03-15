import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
interface ResumeCardProps {
    index?: number
}

const CustomResumeCard = styled(Card)(({}) => ({
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.25)',
    minWidth: 275,
    width: '100%',
    borderRadius: '3%',
    '& .MuiPaper-root': {
        boxShadow: 'unset'
    }
}))

const resumeCardVariants: Variants = {
    initial: {
        opacity: 0,
        y: '20px'
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const ResumeCard: React.FC<ResumeCardProps> = ({}) => {
    return (
        <motion.div
            variants={resumeCardVariants}
            initial="initial"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
                duration: 0.5
            }}
        >
            <CustomResumeCard
                sx={{
                    // maxWidth: 345,
                    aspectRatio: '1/1.3',
                    position: 'relative'
                }}
            >
                <CardMedia
                    component="img"
                    src="/images/Images_1.png"
                    alt="green iguana"
                    style={{
                        height: '100%'
                    }}
                />
                <CardContent
                    sx={{
                        backgroundColor: 'background.paper',
                        position: 'absolute',
                        bottom: 0
                    }}
                >
                    <Typography gutterBottom variant="h5">
                        Title
                    </Typography>
                    <Typography variant="body2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel accusantium rerum deleniti maiores?
                        Repudiandae nisi enim quia libero. Consequuntur, illo
                        nihil ut totam laboriosam sint facere magnam recusandae
                        aliquid in?
                    </Typography>
                </CardContent>
            </CustomResumeCard>
        </motion.div>
    )
}

export default ResumeCard

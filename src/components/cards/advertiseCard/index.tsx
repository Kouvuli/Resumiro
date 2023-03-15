import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import { common } from '@mui/material/colors'
import Planet3D from '@components/3D/planet'
import Canvas3D from '@components/3D'
import RoundButton from '@components/ui/button/roundButton'
import { motion } from 'framer-motion'
interface AdvertiseCardProps {
    children?: React.ReactNode
}

// const advertiseCardVariants: Variants = {
//     initial: {
//         opacity: 0
//     },
//     visible: {
//         opacity: 1,
//         transition: {
//             duration: 2
//         }
//     }
// }

const GridItem = styled(Grid)(({ theme }) => ({
    // backgroundColor: theme.palette.primary.main,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // flexDirection: 'column',
    color: theme.palette.text.secondary
}))

const AdvertiseCard: React.FC<AdvertiseCardProps> = ({}) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={2}
        >
            <GridItem item xs={5}>
                <motion.div
                    style={{ flexDirection: 'column', alignItems: 'start' }}
                    // variants={advertiseCardVariants}
                    // initial="initial"
                    // animate="visible"
                >
                    <Typography
                        sx={{
                            fontSize: 56,
                            fontWeight: 600,
                            color: common.white,
                            mb: 1
                        }}
                        variant="h3"
                    >
                        High-Quality Jobs Just For You
                    </Typography>
                    <Typography
                        sx={{ fontSize: 20, color: common.white, mb: 10 }}
                        variant="subtitle1"
                    >
                        subtitle1. Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Quos blanditiis tenetur
                    </Typography>
                    <RoundButton>Get started</RoundButton>
                </motion.div>
            </GridItem>
            <GridItem item xs={7} sx={{ height: '500px' }}>
                <Canvas3D>
                    <Planet3D />
                </Canvas3D>
            </GridItem>
        </Grid>
    )
}

export default AdvertiseCard

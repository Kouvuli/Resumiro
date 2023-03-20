import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Canvas3D from '@components/3D'
import Box3D from '@components/3D/box'
interface AboutUsCardProps {
  children?: React.ReactNode
}

const GridItem = styled(Grid)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.main,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  // flexDirection: 'column',
  color: theme.palette.text.secondary
}))

const AboutUsCard: React.FC<AboutUsCardProps> = ({}) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      columnSpacing={2}
    >
      <GridItem item xs={12} md={7} sx={{ height: '500px' }}>
        <Canvas3D>{/* <Box3D /> */}</Canvas3D>
      </GridItem>
      <GridItem item xs={12} md={5}>
        <Card
          title="Nhóm chúng tôi"
          sx={{
            height: '100%',
            // background: 'transparent',
            backdropFilter: 'blur(15px)'
          }}
        >
          <CardContent>
            <Typography
              sx={{
                mb: 1
              }}
              variant="h5"
            >
              High-Quality Jobs Just For You
            </Typography>
            <Typography sx={{ mb: 10 }} variant="subtitle1">
              subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quos blanditiis tenetur
            </Typography>
          </CardContent>
        </Card>
      </GridItem>
    </Grid>
  )
}

export default AboutUsCard

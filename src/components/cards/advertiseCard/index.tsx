import { Grid, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import { common } from '@mui/material/colors'
import RoundButton from '@components/ui/button/roundButton'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
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
  const { data: session, status } = useSession()
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

              mb: 5
            }}
            variant="h4"
          >
            Việc làm chất 2023
          </Typography>
          <Typography
            sx={{ fontSize: 20, color: common.white, mb: 10 }}
            variant="subtitle1"
          >
            Cơ hội tham gia vào những công ty, doanh nghiệp hàng đầu Việt Nam.
          </Typography>
          <Link href={status === 'authenticated' ? '/viec-lam' : '/dang-ky'}>
            <RoundButton>Bắt đầu</RoundButton>
          </Link>
        </motion.div>
      </GridItem>
      <GridItem item xs={7} sx={{ height: '500px' }}></GridItem>
    </Grid>
  )
}

export default AdvertiseCard

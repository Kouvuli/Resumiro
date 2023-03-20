import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { motion, Variants } from 'framer-motion'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import styles from './styles.module.css'
import { Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { getCurrentTimeDiff } from '@utils/timeUtil'

export interface ResumeCardProps {
  index?: number
  id: number
  resumeTitle: string
  data: string
  createAt: Date
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

const ResumeCard: React.FC<ResumeCardProps> = ({
  resumeTitle,
  data,
  createAt
}) => {
  return (
    <motion.div
      variants={resumeCardVariants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        duration: 0.5
      }}
      className={styles['resume-card-container']}
    >
      <div className={styles['overlay']}>
        <div className={styles['overlay-content']}>
          <div className={styles['view-resume']}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{
                boxShadow: 'unset',
                textTransform: 'capitalize'
              }}
            >
              Xem CV
            </Button>
          </div>
          <div className={styles['action']}>
            <Button
              variant="text"
              size="small"
              startIcon={<ShareIcon />}
              sx={{
                textTransform: 'none',
                mr: 2,
                mb: 1
              }}
            >
              Chia sẻ
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<FavoriteBorderIcon />}
              sx={{
                textTransform: 'none',
                mb: 1
              }}
            >
              Chính
            </Button>
          </div>
          <div className={styles['action']}>
            <Button
              variant="text"
              size="small"
              startIcon={<DeleteOutlineRoundedIcon />}
              sx={{ textTransform: 'none', color: 'grey[200]' }}
            >
              Xoá
            </Button>
          </div>
        </div>
      </div>
      <CustomResumeCard
        sx={{
          // maxWidth: 345,
          aspectRatio: '1/1.3',
          position: 'relative'
        }}
        className={styles['content']}
      >
        <CardMedia
          component="img"
          src={data}
          alt="green iguana"
          style={{
            height: '100%'
          }}
        />
        <CardContent
          sx={{
            backgroundColor: 'background.paper',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            {resumeTitle}
          </Typography>
          <Typography variant="body2">
            Cập nhật {getCurrentTimeDiff(new Date(createAt))} trước
          </Typography>
        </CardContent>
      </CustomResumeCard>
    </motion.div>
  )
}

export default ResumeCard

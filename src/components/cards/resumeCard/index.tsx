import React, { useState, useRef } from 'react'
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getCurrentTimeDiff } from '@utils/timeUtil'
import { candidates } from '@prisma/client'
import { usePdf } from '@mikecousins/react-pdf'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress/'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { deleteResume } from '@redux/reducers/resumeSlice'
import { useRouter } from 'next/router'
import { web3Selector } from '@redux/selectors'
export interface ResumeCardProps {
  index?: number
  type?: number
  id: number
  resumeTitle: string
  data: string
  owner: candidates
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
  id,
  owner,
  createAt,
  type
}) => {
  const [page, setPage] = useState(1)
  const canvasRef = useRef(null)
  const dispatch = useAppDispatch()
  const { resumiro, wallet } = useAppSelector(web3Selector)
  const router = useRouter()
  const { pdfDocument, pdfPage } = usePdf({
    file: data,
    canvasRef,
    page

    // scale: 0.65
  })

  const deleteHandler = async () => {
    await resumiro.deleteResume(id)
    dispatch(deleteResume(id))
    router.push({
      pathname: router.pathname
    })
  }

  if (type === 2) {
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
                disableElevation
                disableFocusRipple
                target="_blank"
                href={data}
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
                startIcon={<AccountCircleIcon />}
                sx={{
                  textTransform: 'none',
                  mr: 2,
                  mb: 1
                }}
              >
                <Link href={`/ca-nhan/${owner.id}`}>Cá nhân</Link>
              </Button>
              <Button
                variant="text"
                startIcon={<FavoriteBorderIcon />}
                sx={{
                  textTransform: 'none',
                  mb: 1
                }}
              >
                Chính
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
            component="canvas"
            ref={canvasRef}
            sx={{
              width: '100%!important',
              height: '100%!important',
              objectFit: 'cover'
            }}
            // src={data}
            // alt="green iguana"
          />
          {!pdfDocument && (
            <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
          )}

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
              href={data}
              color="secondary"
              target="_blank"
              disableElevation
              disableFocusRipple
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
              onClick={deleteHandler}
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
          component="canvas"
          ref={canvasRef}
          sx={{
            width: '100%!important',
            height: '100%!important',
            objectFit: 'cover'
          }}
          // src={data}
          // alt="green iguana"
        />
        {!pdfDocument && (
          <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
        )}
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

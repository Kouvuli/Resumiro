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
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { getCurrentTimeDiff } from '@utils/timeUtil'
import { users } from '@prisma/client'
import { usePdf } from '@mikecousins/react-pdf'
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress/'
import { useAppDispatch } from '@hooks/index'
import {
  checkIfAllowedToView,
  deleteResume,
  updateResumePrivacy
} from '@redux/reducers/resumeSlice'
import { useRouter } from 'next/router'
import { decryptText } from '@utils/cryptoUtil'
import { useSession } from 'next-auth/react'
import candidateProfileSlice from '@redux/reducers/candidateProfileSlice'
export interface ResumeCardProps {
  index?: number
  type?: number
  id: number
  resumeTitle: string
  data: string
  owner: users
  createAt: Date
  resumeKey: string
  isPublic: boolean
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
  type,
  resumeKey,
  isPublic
}) => {
  const [page, _setPage] = useState(1)
  const canvasRef = useRef(null)
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { pdfDocument } = usePdf({
    file: decryptText(data, resumeKey),
    canvasRef,
    page
  })
  const viewResumeHandler = () => {
    dispatch(
      checkIfAllowedToView({
        resumeId: id,
        userId: Number(session!.user!.id),
        source: decryptText(data, resumeKey),
        title: 'Yêu cầu xem CV',
        recipient: owner.id,
        content: 'yêu cầu xem ' + resumeTitle + ' của bạn',
        isPublic: isPublic
      })
    )
    if (router.pathname !== 'ca-nhan' && !isPublic) {
      dispatch(
        candidateProfileSlice.actions.changeSnackBarMessage({
          message: 'Đã gửi yêu cầu thành công',
          messageType: 'success'
        })
      )
      dispatch(
        candidateProfileSlice.actions.toggleSnackBar({ showMessage: true })
      )
    }
  }

  const updateResumePrivacyHandler = () => {
    dispatch(
      updateResumePrivacy({
        resumeId: id.toString(),
        isPublic: !isPublic
      })
    )
  }
  const deleteHandler = () => {
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
                onClick={viewResumeHandler}
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
                <Link href={`/ung-vien/${owner.id}`}>Cá nhân</Link>
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
          {!isPublic ? (
            <CardMedia
              component="img"
              src="/images/encrypted-file.jpg"
              sx={{
                objectFit: 'contain'
              }}
              // src={data}
              // alt="green iguana"
            />
          ) : (
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
          )}
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
              href={decryptText(data, resumeKey)}
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
            {isPublic ? (
              <Button
                variant="contained"
                size="small"
                disableElevation
                disableFocusRipple
                startIcon={<ShareIcon />}
                onClick={updateResumePrivacyHandler}
                sx={{
                  textTransform: 'none',
                  mr: 2,
                  mb: 1
                }}
              >
                Công khai
              </Button>
            ) : (
              <Button
                variant="text"
                size="small"
                startIcon={<ShareIcon />}
                onClick={updateResumePrivacyHandler}
                sx={{
                  textTransform: 'none',
                  mr: 2,
                  mb: 1
                }}
              >
                Công khai
              </Button>
            )}
            <Button
              variant="text"
              size="small"
              onClick={deleteHandler}
              startIcon={<DeleteOutlineRoundedIcon />}
              sx={{ textTransform: 'none' }}
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

import { Card, CardMedia } from '@mui/material'
import React, { useEffect } from 'react'
import { motion, Variants, useAnimationControls } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { profileSelector } from '@redux/selectors'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { uploadUserBackground } from '@redux/reducers/profileSlice'
import { useSession } from 'next-auth/react'
interface BackgroundProps {
  src: string | null
  alt: string | null
  type?: number
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: '20px'
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const BackgroundCard: React.FC<BackgroundProps> = ({ type, src, alt }) => {
  const { loading } = useAppSelector(profileSelector)
  const controls = useAnimationControls()
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  useEffect(() => {
    controls.stop()
    if (!loading) {
      controls.start('visible')
    }
  }, [loading])

  const backgroundHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files![0]

    if (data) {
      const body = new FormData()

      body.append('file', data)
      dispatch(
        uploadUserBackground({ userId: Number(session!.user!.id), body })
      )
    }
  }
  if (type === 2) {
    return (
      <motion.div
        animate={controls}
        variants={variants}
        initial="initial"
        // whileInView="visible"
        viewport={{ once: true }}
      >
        <Card
          sx={{
            borderBottomRightRadius: '0px',
            borderBottomLeftRadius: '0px',
            boxShadow:
              ' -1px -1px 1px 0px rgba(0,0,0,0.12), 0px 0px 1px 0px rgba(0,0,0,0.12), 2px 0px 3px 0px rgba(0,0,0,0.12);'
          }}
        >
          <CardMedia
            component="img"
            src={src ? src : '/images/default-background.jpg'}
            width="100%"
            height="350px"
            alt={alt!}
          />
        </Card>
      </motion.div>
    )
  }
  return (
    <motion.div
      animate={controls}
      variants={variants}
      initial="initial"
      // whileInView="visible"
      viewport={{ once: true }}
    >
      <Card
        sx={{
          position: 'relative',
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
          boxShadow:
            ' -1px -1px 1px 0px rgba(0,0,0,0.12), 0px 0px 1px 0px rgba(0,0,0,0.12), 2px 0px 3px 0px rgba(0,0,0,0.12);'
        }}
      >
        <label
          style={{
            backgroundColor: 'white',
            display: 'inline-block',
            padding: '10px 10px 8px 10px',
            cursor: 'pointer',
            borderRadius: '20%',

            position: 'absolute',
            right: '20px',
            bottom: '20px',
            zIndex: '100'
          }}
        >
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            title=""
            onChange={backgroundHandler}
          />
          <CameraAltIcon color="primary"></CameraAltIcon>
        </label>
        <CardMedia
          component="img"
          src={src ? src : '/images/default-background.jpg'}
          width="100%"
          height="350px"
          alt={alt!}
        />
      </Card>
    </motion.div>
  )
}

export default BackgroundCard

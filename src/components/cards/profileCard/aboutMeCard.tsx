import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { profileSelector } from '@redux/selectors'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { Input } from 'antd'
import { updateCandidateAbout } from '@redux/reducers/profileSlice'

const { TextArea } = Input
interface AboutMeCardProps {
  style?: React.CSSProperties
  about: string | null
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

const AboutMeCard: React.FC<AboutMeCardProps> = ({ style, about }) => {
  const dispatch = useAppDispatch()

  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const { loading } = useAppSelector(profileSelector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const about = data.get('about')!.toString()

    dispatch(
      updateCandidateAbout({
        id: session!.user!.name!,
        data: {
          about: about
        }
      })
    )
    // console.log(about)
    setOpen(false)
  }
  return (
    <motion.div
      style={style}
      variants={variants}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card>
        <CardHeader
          title={
            <Typography
              variant="h5"
              color="text.primary"
              sx={{ fontSize: '20px' }}
            >
              Về tôi
            </Typography>
          }
          action={
            <>
              <IconButton onClick={handleOpen}>
                <CreateIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {about}
          </Typography>
          <Modal open={open} onClose={handleClose}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                borderRadius: '5px',
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextArea
                    id="about"
                    style={{ height: 120 }}
                    showCount
                    name="about"
                    rows={6}
                    placeholder="Tối đa 100 ký tự"
                    maxLength={100}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      marginTop: '1rem'
                    }}
                  >
                    <Button
                      variant="contained"
                      disableElevation
                      disableRipple
                      color="primary"
                      onClick={handleClose}
                      sx={{
                        mr: 1,
                        p: 1.5,
                        textTransform: 'capitalize',
                        fontSize: '1rem'
                      }}
                    >
                      Huỷ
                    </Button>
                    <Button
                      type="submit"
                      disableElevation
                      disableRipple
                      variant="contained"
                      color="secondary"
                      endIcon={loading && <CircularProgress size={18} />}
                      sx={{
                        p: 1.5,
                        textTransform: 'capitalize',
                        fontSize: '1rem'
                      }}
                    >
                      OK
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AboutMeCard

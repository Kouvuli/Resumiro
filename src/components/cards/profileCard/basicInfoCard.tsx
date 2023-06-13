import {
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Avatar
} from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create'
import CircleIcon from '@mui/icons-material/Circle'
import OvalButton from '@components/ui/button/ovalButton'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useSession } from 'next-auth/react'
import { profileSelector } from '@redux/selectors'
import { useState, useEffect } from 'react'
import {
  fetchAllUserResumes,
  updateCandidateBasicInfo,
  updateRecruiterBasicInfo
} from '@redux/reducers/profileSlice'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { motion, Variants, useAnimationControls } from 'framer-motion'
import ResumeCard, { ResumeCardProps } from '../resumeCard'

interface BasicInfoCardProps {
  type?: number
  id?: number
  username: string
  fullName: string | null
  avatar: string | null
  email: string | null
  phone: string | null
  background: string | null
  role: string
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

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  type,
  username,
  avatar,
  id,
  fullName,
  role,
  phone,
  background,
  email
}) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  const { loading, allUserResumes } = useAppSelector(profileSelector)
  const controls = useAnimationControls()
  useEffect(() => {
    controls.stop()
    if (!loading) {
      controls.start('visible')
    }
  }, [loading])
  const [isOpenEditInfo, setIsOpenEditInfo] = useState(false)
  const [isOpenAllResumes, setIsOpenAllResumes] = useState(false)
  const handleOpenEditInfo = () => setIsOpenEditInfo(true)
  const handleCloseEditInfo = () => setIsOpenEditInfo(false)

  const handleOpenAllResumes = () => {
    setIsOpenAllResumes(true)
    dispatch(fetchAllUserResumes(id!))
  }
  const handleCloseAllResumes = () => setIsOpenAllResumes(false)
  const handleSubmitEditInfo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (session!.user!.role === 'candidate') {
      dispatch(
        updateCandidateBasicInfo({
          id: session!.user!.id,
          data: {
            background: data.get('background')!.toString(),
            avatar: data.get('avatar')!.toString(),
            full_name: data.get('full_name')!.toString(),
            phone: data.get('phone')!.toString(),
            email: data.get('email')!.toString()
          }
        })
      )
    } else {
      dispatch(
        updateRecruiterBasicInfo({
          id: session!.user!.id,
          data: {
            background: data.get('background')!.toString(),
            avatar: data.get('avatar')!.toString(),
            full_name: data.get('full_name')!.toString(),
            phone: data.get('phone')!.toString(),
            email: data.get('email')!.toString()
          }
        })
      )
    }

    setIsOpenEditInfo(false)
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
            borderTopRightRadius: '0px',
            borderTopLeftRadius: '0px',
            overflow: 'visible'
          }}
        >
          <CardHeader
            avatar={
              <div style={{ position: 'relative', width: '170px' }}>
                <Avatar
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '170px',
                    width: '170px'
                  }}
                  alt={fullName!}
                  src={avatar || '/images/default-user.jpg'}
                />
              </div>
            }
            title={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{
                    fontSize: '20px',
                    textTransform: 'capitalize'
                  }}
                >
                  {fullName}
                </Typography>
                <CircleIcon sx={{ fontSize: '8px', mx: 1 }} />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ color: 'info.main' }}
                >
                  @{username}
                </Typography>
              </div>
            }
            subheader={
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    mt: 1.5,
                    textTransform: 'capitalize'
                  }}
                  color="text.primary"
                >
                  {role}
                </Typography>
              </>
            }
            sx={{ alignItems: 'end' }}
          />

          <CardContent sx={{ py: 'unset' }}>
            <OvalButton style={{ marginRight: '8px' }} primary>
              Theo dõi
            </OvalButton>
            {role === 'candidate' && (
              <OvalButton onClick={handleOpenAllResumes}>Toàn bộ CV</OvalButton>
            )}
          </CardContent>
          <Modal open={isOpenAllResumes} onClose={handleCloseAllResumes}>
            <Grid
              container
              sx={{
                borderRadius: '5px',
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: 800,
                overflow: 'scroll',
                height: '80vh',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
              }}
              columnSpacing={{ xs: 0, md: 3 }}
              rowSpacing={3}
              alignItems="center"
              justifyContent="center"
            >
              {allUserResumes &&
                allUserResumes.map(
                  (
                    resume: ResumeCardProps,
                    index: React.Key | null | undefined
                  ) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ResumeCard {...resume} type={type} />
                    </Grid>
                  )
                )}
            </Grid>
          </Modal>
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
          borderTopRightRadius: '0px',
          borderTopLeftRadius: '0px',
          overflow: 'visible'
        }}
      >
        <CardHeader
          avatar={
            <div style={{ position: 'relative', width: '170px' }}>
              <Avatar
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '170px',
                  width: '170px'
                }}
                alt={fullName!}
                src={avatar || '/images/default-user.jpg'}
              />
            </div>
          }
          title={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Typography
                variant="h5"
                color="text.primary"
                sx={{
                  fontSize: '20px',
                  textTransform: 'capitalize'
                }}
              >
                {fullName}
              </Typography>
              <CircleIcon sx={{ fontSize: '8px', mx: 1 }} />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ color: 'info.main' }}
              >
                @{username}
              </Typography>
            </div>
          }
          action={
            <IconButton onClick={handleOpenEditInfo}>
              <CreateIcon />
            </IconButton>
          }
          subheader={
            <>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  mt: 1.5,
                  textTransform: 'capitalize'
                }}
                color="text.primary"
              >
                {role}
              </Typography>
            </>
          }
          sx={{ alignItems: 'end' }}
        />

        <Modal open={isOpenEditInfo} onClose={handleCloseEditInfo}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmitEditInfo}
            sx={{
              borderRadius: '5px',
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="avatar"
                  required
                  fullWidth
                  id="avatar"
                  defaultValue={avatar}
                  label="Avatar"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="background"
                  required
                  fullWidth
                  id="background"
                  defaultValue={background}
                  label="Background"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="full_name"
                  required
                  fullWidth
                  id="full_name"
                  defaultValue={fullName}
                  label="Full name"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  defaultValue={phone}
                  label="Phone"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  defaultValue={email}
                  label="Email"
                  autoFocus
                  color="primary"
                  sx={{
                    borderRadius: '5px'
                  }}
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
                    onClick={handleCloseEditInfo}
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
      </Card>
    </motion.div>
  )
}

export default BasicInfoCard

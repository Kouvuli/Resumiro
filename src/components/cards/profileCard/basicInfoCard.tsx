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
import { useState } from 'react'
import { updateCandidateBasicInfo } from '@redux/reducers/profileSlice'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { CircularProgress } from '@mui/material'

interface BasicInfoCardProps {
  username: string
  fullName: string | null
  avatar: string | null
  email: string | null
  phone: string | null
  background: string | null
  role: string
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  username,
  avatar,
  fullName,
  role,
  phone,
  background,
  email
}) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const { loading } = useAppSelector(profileSelector)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    dispatch(
      updateCandidateBasicInfo({
        id: session!.user!.name!,
        data: {
          background: data.get('background')!.toString(),
          avatar: data.get('avatar')!.toString(),
          full_name: data.get('full_name')!.toString(),
          phone: data.get('phone')!.toString(),
          email: data.get('email')!.toString()
        }
      })
    )
    setOpen(false)
  }
  return (
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
              src={avatar!}
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
          <IconButton onClick={handleOpen}>
            <CreateIcon />
          </IconButton>
        }
        subheader={
          <>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold', mt: 1.5, textTransform: 'capitalize' }}
              color="text.primary"
            >
              {role}
            </Typography>
          </>
        }
        sx={{ alignItems: 'end' }}
      />
      {role === 'recruiter' && (
        <CardContent sx={{ py: 'unset' }}>
          <OvalButton style={{ marginRight: '8px' }} primary>
            Theo dõi
          </OvalButton>
          <OvalButton primary outlined>
            Việc làm đã tạo
          </OvalButton>
        </CardContent>
      )}
      {role === 'candidate' && (
        <CardContent sx={{ py: 'unset' }}>
          <OvalButton style={{ marginRight: '8px' }} primary>
            Theo dõi
          </OvalButton>
          <OvalButton>Hồ sơ chính</OvalButton>
        </CardContent>
      )}
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
                label="Avatar"
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
    </Card>
  )
}

export default BasicInfoCard

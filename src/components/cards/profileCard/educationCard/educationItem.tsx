import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { certificates } from '@prisma/client'
import { IconButton, Button } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { useState } from 'react'
import { profileSelector } from '@redux/selectors'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { CircularProgress } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HourglassFullIcon from '@mui/icons-material/HourglassFull'
import CancelIcon from '@mui/icons-material/Cancel'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import {
  deleteCertificate,
  updateCertificate
} from '@redux/reducers/profileSlice'
import { compareDates } from '@utils/timeUtil'
const CustomEducationItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))

interface EducationItemProps {
  data: certificates

  isModify: boolean
}

const EducationItem: React.FC<EducationItemProps> = ({
  data,

  isModify
}) => {
  const [open, setOpen] = useState(false)
  const { loading } = useAppSelector(profileSelector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useAppDispatch()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')!.toString()
    const verified_at = formData.get('verified_at')!.toString()

    dispatch(
      updateCertificate({
        id: data.id,
        data: {
          name: name,
          verified_at: new Date(verified_at)
        }
      })
    )

    setOpen(false)
  }
  const deleteHandler = () => {
    dispatch(deleteCertificate(data.id))
  }
  return (
    <CustomEducationItem>
      <CardHeader
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <div>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{
                  mb: 1.4,
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {data.name}

                {compareDates(data.verified_at, new Date()) > 0 && (
                  <AccessTimeFilledIcon
                    sx={{ fontSize: '1.3rem', ml: 1, color: 'rgba(0,0,0,0.5)' }}
                  />
                )}
                {data.status === 'pending' &&
                  compareDates(data.verified_at, new Date()) <= 0 && (
                    <HourglassFullIcon
                      sx={{
                        fontSize: '1.3rem',
                        ml: 1,
                        color: 'rgba(0,0,0,0.5)'
                      }}
                    />
                  )}
                {data.status === 'rejected' &&
                  compareDates(data.verified_at, new Date()) <= 0 && (
                    <CancelIcon
                      sx={{ fontSize: '1.3rem', ml: 1, color: 'warning.main' }}
                    />
                  )}
                {data.status === 'verified' &&
                  compareDates(data.verified_at, new Date()) <= 0 && (
                    <CheckCircleIcon
                      sx={{ fontSize: '1.3rem', ml: 1, color: 'info.main' }}
                    />
                  )}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            {isModify && (
              <div>
                <IconButton onClick={handleOpen} size="small">
                  <CreateIcon />
                </IconButton>
                <IconButton sx={{ ml: 1 }} onClick={deleteHandler} size="small">
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        }
        subheader={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontSize: '1.1rem' }}
          >
            {new Date(data.verified_at).toLocaleDateString()}
          </Typography>
        }
        sx={{ padding: '0', alignItems: 'start' }}
      />
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
            <Grid item xs={6}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Chứng chỉ"
                autoFocus
                defaultValue={data.name}
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="verified_at"
                required
                fullWidth
                id="verified_at"
                label="Xác thực lúc"
                autoFocus
                type="date"
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
                defaultValue={new Date(data.verified_at)
                  .toISOString()
                  .slice(0, 10)}
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
    </CustomEducationItem>
  )
}

export default EducationItem

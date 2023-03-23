import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Experience } from '@shared/interfaces'
import { IconButton, Button } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import {
  deleteExperience,
  updateExperience
} from '@redux/reducers/profileSlice'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { profileSelector } from '@redux/selectors'
import { companies } from '@prisma/client'
import { CircularProgress } from '@mui/material'
import { useSession } from 'next-auth/react'
const CustomExperienceItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
interface ExperienceItemProps {
  data: Experience
  allCompanies: companies[]
  isModify: boolean
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  data,
  allCompanies,
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
    const position = formData.get('position')!.toString()
    const company = formData.get('company')!.toString()
    const start = formData.get('start')!.toString()
    const finish = formData.get('finish')!.toString()

    dispatch(
      updateExperience({
        id: data.id,
        data: {
          position: position,
          company_id: Number(company),
          start: start,
          finish: finish
        }
      })
    )

    setOpen(false)
  }
  const deleteHandler = () => {
    dispatch(deleteExperience(data.id))
  }
  return (
    <CustomExperienceItem>
      <CardHeader
        avatar={
          <Image
            style={{ borderRadius: '5px' }}
            src={data.company.logo}
            width={80}
            height={80}
            alt="avatar"
          />
        }
        title={
          <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
            {data.position}
          </Typography>
        }
        subheader={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.start} - {data.finish}
              </Typography>
            </div>
            <div style={{ flexGrow: 1 }} />
            {isModify && (
              <div>
                <IconButton onClick={handleOpen}>
                  <CreateIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon onClick={deleteHandler} />
                </IconButton>
              </div>
            )}
          </div>
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
                name="start"
                required
                defaultValue={data.start}
                fullWidth
                id="start"
                label="Start"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="finish"
                required
                fullWidth
                id="finish"
                defaultValue={data.finish}
                label="Finish"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="position"
                required
                defaultValue={data.position}
                fullWidth
                id="position"
                label="Position"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                select
                name="company"
                id="company"
                label="Company"
                defaultValue={data.company.id}
                SelectProps={{
                  native: true
                }}
              >
                {allCompanies.map((company: companies) => (
                  <option value={company.id}>{company.name}</option>
                ))}
              </TextField>
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
    </CustomExperienceItem>
  )
}

export default ExperienceItem

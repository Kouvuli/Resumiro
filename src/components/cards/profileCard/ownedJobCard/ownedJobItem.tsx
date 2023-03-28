import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import { Job, Skill } from '@shared/interfaces'
import { IconButton, Button } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import profileSlice, {
  deleteJob,
  updateJob
} from '@redux/reducers/profileSlice'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { profileSelector } from '@redux/selectors'
import { CircularProgress } from '@mui/material'
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { convertMonthToYear } from '@utils/timeUtil'
import { fields, locations, skills } from '@prisma/client'
const CustomExperienceItem = styled(Card)(({}) => ({
  boxShadow: 'unset',
  width: '100%'
}))
interface OwnedJobItemProps {
  data: Job
  allSkills: Skill[]
  allFields: fields[]
  allLocations: locations[]
  isModify: boolean
}

const jobTypes = [
  {
    value: 'Full-time',
    label: 'Toàn thời gian'
  },
  {
    value: 'Part-time',
    label: 'Bán thời gian'
  },
  {
    value: 'Intern',
    label: 'Thực tập'
  }
]

const OwnedJobItem: React.FC<OwnedJobItemProps> = ({
  data,
  allSkills,
  allFields,
  allLocations,
  isModify
}) => {
  const [open, setOpen] = useState(false)
  const [skill, setSkill] = React.useState<string[]>(
    data.jobs_skills.map(item => item.skill_id.toString())
  )
  const { loading } = useAppSelector(profileSelector)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useAppDispatch()
  const handleChange = (event: SelectChangeEvent<typeof skill>) => {
    const {
      target: { value }
    } = event

    setSkill(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')!.toString()
    const locationId = formData.get('location')!.toString()

    const experience = formData.get('experience')!.toString()
    const jobType = formData.get('job_type')!.toString()
    const salary = formData.get('salary')!.toString()
    const field = formData.get('field')!.toString()
    if (
      title === '' ||
      salary === '' ||
      skill.length < 1 ||
      experience === ''
    ) {
      // alert('Bạn chưa có công ty')

      dispatch(
        profileSlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(profileSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    dispatch(
      updateJob({
        id: data.id,
        data: {
          title,
          location_id: Number(locationId),
          skill: skill.join(','),
          experience: Number(experience),
          job_type: jobType,
          salary: Number(salary),
          field_id: Number(field)
        }
      })
    )

    setOpen(false)
  }
  const deleteHandler = () => {
    dispatch(deleteJob(data.id))
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
            {data.title}
          </Typography>
        }
        subheader={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {data.salary} VND/ tháng
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {convertMonthToYear(data.experience)} - {data.location.name} -{' '}
                {data.job_type}
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
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                defaultValue={data.title}
                id="title"
                label="Tên công việc"
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
                defaultValue={data.location_id}
                select
                name="location"
                id="location"
                label="Vị trí"
                SelectProps={{
                  native: true
                }}
              >
                {allLocations.map((item: locations, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel required>Kỹ năng</InputLabel>
                <Select
                  labelId="skill"
                  id="skill"
                  multiple
                  value={skill}
                  onChange={handleChange}
                  input={<OutlinedInput label="Kỹ năng" />}
                  // MenuProps={MenuProps}
                >
                  {allSkills.map((skill: skills) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="experience"
                required
                fullWidth
                defaultValue={data.experience}
                id="experience"
                label="Kinh nghiệm"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Tháng</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                select
                defaultValue={data.job_type}
                name="job_type"
                id="job_type"
                label="Loại công việc"
                SelectProps={{
                  native: true
                }}
              >
                {jobTypes.map((item, i) => (
                  <option value={item.value} key={i}>
                    {item.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="salary"
                required
                defaultValue={data.salary}
                fullWidth
                id="salary"
                label="Lương"
                autoFocus
                color="primary"
                sx={{
                  borderRadius: '5px'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VND/ tháng</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                select
                name="field"
                id="field"
                defaultValue={data.field_id}
                label="Lĩnh vực"
                SelectProps={{
                  native: true
                }}
              >
                {allFields.map((item: fields, i) => (
                  <option value={item.id} key={i}>
                    {item.name}
                  </option>
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

export default OwnedJobItem

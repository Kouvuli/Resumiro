import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Filter from '@components/lists/filter'
import JobGrid from '@components/grid/jobGrid'
import SearchResultBar from '@components/ui/bar/searchResultBar'
import SearchBar from '@components/ui/bar/searchBar'
import ArticleLayout from '@components/layouts/article'
import { JobCardProps } from '@components/cards/jobCard'
import resumiroApi from '@apis/resumiroApi'
import { Job, Recruiter, Skill } from '@shared/interfaces'
import Image from 'next/image'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { jobSelector } from '@redux/selectors'
import jobSlice, { createJob } from '@redux/reducers/jobSlice'
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import { fields, locations, skills } from '@prisma/client'
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { getServerSession } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'
import MySnackBar from '@components/ui/bar/snackbar'
type JobListPerPage = {
  perPage: number
  page: number
  totalPage: number
  data: JobCardProps[]
}
interface JobPageProps {
  data: JobListPerPage
  allSkills: Skill[]
  allFields: fields[]
  allLocations: locations[]
  recruiter?: Recruiter
}

const orderOptions = [
  {
    value: 'create_at_desc',
    label: 'Mới nhất'
  },
  {
    value: 'create_at_asc',
    label: 'Cũ nhất'
  },
  {
    value: 'alphabet',
    label: 'A-Z'
  }
]

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

const JobPage: React.FC<JobPageProps> = ({
  data,
  allSkills,
  allFields,
  allLocations,
  recruiter
}) => {
  const [open, setOpen] = useState(false)
  const [skill, setSkill] = useState<string[]>([])
  const { data: session } = useSession()
  const [hasAddJob, setHasAddJob] = useState(false)
  useEffect(() => {
    if (!_.isEmpty(recruiter)) {
      setHasAddJob(true)
    }
  }, [])

  const handleOpenAddJobModal = () => setOpen(true)
  const handleCloseAddJobModal = () => setOpen(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    loading,
    page,
    limit,
    total,
    showMessage,
    message,
    messageType,
    q,
    location,
    order_by,
    job_type,
    min_salary,
    max_salary,
    experience
  } = useAppSelector(jobSelector)
  const searchHandler = () => {
    let query: any = {}
    if (page !== '') {
      query.page = 1
    }
    if (limit !== '') {
      query.limit = limit
    }
    if (q !== '') {
      query.q = q
    }
    if (location !== '') {
      query.location = location
    }
    if (order_by !== '') {
      query.order_by = order_by
    }
    if (job_type !== '') {
      query.job_type = job_type
    }
    if (experience !== '') {
      query.experience = experience
    }
    if (min_salary !== '' && max_salary !== '') {
      query.min_salary = min_salary
      query.max_salary = max_salary
    }
    router.push({
      pathname: router.pathname,
      query: query
    })
  }
  const handleChange = (event: SelectChangeEvent<typeof skill>) => {
    const {
      target: { value }
    } = event

    setSkill(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const handleJobOrderChange = (value: string) => {
    dispatch(jobSlice.actions.changeOrderBy(value))
  }

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(jobSlice.actions.changeSearchText(e.target.value))
  }

  const handleAddJobSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const title = data.get('title')!.toString()
    const locationId = data.get('location')!.toString()

    const experience = data.get('experience')!.toString()
    const jobType = data.get('job_type')!.toString()
    const salary = data.get('salary')!.toString()
    const field = data.get('field')!.toString()

    if (recruiter!.company_id === null) {
      // alert('Bạn chưa có công ty')

      dispatch(
        jobSlice.actions.changeSnackBarMessage({
          message: 'Bạn chưa có công ty',
          messageType: 'error'
        })
      )
      dispatch(jobSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }
    if (
      title === '' ||
      salary === '' ||
      skill.length < 1 ||
      experience === ''
    ) {
      // alert('Bạn chưa có công ty')

      dispatch(
        jobSlice.actions.changeSnackBarMessage({
          message: 'Dữ liệu không hợp lệ',
          messageType: 'error'
        })
      )
      dispatch(jobSlice.actions.toggleSnackBar({ showMessage: true }))
      return
    }

    dispatch(
      createJob({
        title,
        location_id: Number(locationId),
        skill: skill.join(','),
        experience: Number(experience),
        job_type: jobType,
        salary: Number(salary),
        field_id: Number(field),
        owner_id: recruiter!.id,
        company_id: recruiter!.company_id
      })
    )
    // dispatch(createJob())
    setOpen(false)
    router.push({
      pathname: router.pathname
    })
  }
  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(jobSlice.actions.toggleSnackBar({ showMessage: false }))
  }
  return (
    <ArticleLayout title="Việc làm">
      <MySnackBar
        handleClose={handleSnackBarClose}
        message={message}
        messageType={messageType}
        showMessage={showMessage}
      />
      <Container>
        <Modal open={open} onClose={handleCloseAddJobModal}>
          <Box
            component="form"
            noValidate
            onSubmit={handleAddJobSubmit}
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
                    onClick={handleCloseAddJobModal}
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
        <Grid container marginTop="1rem " marginBottom="5rem" rowSpacing={2}>
          <SearchBar
            handleSearch={searchHandler}
            handleSearchTextChange={handleSearchTextChange}
            handleAddJob={handleOpenAddJobModal}
            hasAddJob={hasAddJob}
          />

          <SearchResultBar
            options={orderOptions}
            numberSearch={data.data.length}
            handleChange={handleJobOrderChange}
          />

          <Grid item display={{ xs: 'none', md: 'unset' }} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} md={9}>
            {!_.isEmpty(data.data) ? (
              <JobGrid {...data} />
            ) : (
              <Image
                style={{ display: 'flex', margin: 'auto' }}
                src="/images/no-data-found.gif"
                height="450"
                width="450"
                alt="data-not-found"
              ></Image>
            )}
          </Grid>
        </Grid>
      </Container>
    </ArticleLayout>
  )
}

export async function getServerSideProps(context: {
  req: any
  res: any
  query: any
}) {
  // const { page = 1, limit = 7 } = context.query
  const session = await getServerSession(context.req, context.res, authOptions)

  const jobs = await resumiroApi.getJobs(context.query).then(res => res.data)

  const jobList = jobs.data.map((job: Job) => {
    return {
      id: job.id,
      logo: job.company.logo,
      jobTitle: job.title,
      companyName: job.company.name,
      location: job.location,
      salary: job.salary,
      experience: job.experience,
      createAt: job.create_at
    }
  })
  let recruiter: any = { data: {} }
  if (session && session!.user!.email === 'recruiter') {
    recruiter = await resumiroApi
      .getRecruiterById(session!.user!.name!)
      .then(res => res.data)
  }

  const allSkills = await resumiroApi.getAllSkills().then(res => res.data)

  const allFields = await resumiroApi.getFields().then(res => res.data)

  const allLocations = await resumiroApi.getLocations().then(res => res.data)
  return {
    props: {
      data: {
        perPage: jobs.pagination.limit,
        page: jobs.pagination.page,
        totalPage: jobs.pagination.total,
        data: jobList
      },
      allSkills: allSkills.data,
      allFields: allFields.data,
      allLocations: allLocations.data,
      recruiter: recruiter.data
    }
  }
}

export default JobPage

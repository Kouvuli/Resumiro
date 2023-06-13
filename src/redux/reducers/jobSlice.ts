import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { Job } from '@shared/interfaces'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  success: '',
  error: '',
  page: 1,
  limit: 8,
  total: 0,
  q: '',
  location: '',
  order_by: '',
  job_type: '',
  min_salary: '',
  max_salary: '',
  experience: '',
  recruiter: {},
  hasAddJob: false,
  data: {
    perPage: 8,
    page: 1,
    totalPage: 0,
    data: []
  }
}

export const fetchRecruiterById = createAsyncThunk(
  'get-recruiter-by-id',
  async (id: string) => {
    const { data } = await resumiroApi
      .getRecruiterById(id)
      .then(res => res.data)
    return data
  }
)

export const getJobs = createAsyncThunk('get-jobs', async (query: any) => {
  const jobs = await resumiroApi.getJobs(query).then(res => res.data)

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
  return { jobs, jobList }
})

export const createJob = createAsyncThunk('create-job', async (input: any) => {
  const data = await resumiroApi.insertJob(input).then(res => res.data)
  return data
})

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload
    },
    changeJobType: (state, action) => {
      state.job_type = action.payload
    },
    changeExperience: (state, action) => {
      state.experience = action.payload
    },
    changeMinSalary: (state, action) => {
      state.min_salary = action.payload
    },
    changeMaxSalary: (state, action) => {
      state.max_salary = action.payload
    },
    changeOrderBy: (state, action) => {
      state.order_by = action.payload
    },
    changeSearchText: (state, action) => {
      state.q = action.payload
    },
    toggleSnackBar: (state, action) => {
      state.showMessage = action.payload.showMessage
    },
    changeSnackBarMessage: (state, action) => {
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(createJob.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createJob.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(fetchRecruiterById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchRecruiterById.fulfilled, (state, action) => {
        state.recruiter = action.payload
        state.hasAddJob = true
        state.loading = false
      })
      .addCase(fetchRecruiterById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(getJobs.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.data.data = action.payload.jobList
        state.data.page = action.payload.jobs.pagination.page
        state.data.totalPage = action.payload.jobs.pagination.total
        state.data.perPage = action.payload.jobs.pagination.limit
        state.loading = false
      })
      .addCase(getJobs.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default jobSlice

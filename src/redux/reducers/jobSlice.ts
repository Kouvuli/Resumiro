import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

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
  experience: ''
}

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
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createJob.pending, (state, action) => {
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
  }
})

export default jobSlice

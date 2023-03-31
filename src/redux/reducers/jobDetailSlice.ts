import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  isApplied: false,
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  success: '',
  error: '',
  page: 1,
  limit: 8,
  total: 0
}

export const checkIsApplied = createAsyncThunk(
  'check-is-applied',
  async (input: any) => {
    const data = await resumiroApi
      .checkCandidateIsApplied(input.candidateId, input.jobId)
      .then(res => res.data)
    return data
  }
)

export const applyJob = createAsyncThunk('apply-job', async (input: any) => {
  const data = await resumiroApi
    .applyJob(input.id, input.data)
    .then(res => res.data)
  return data
})

export const cancelJob = createAsyncThunk('cancel-job', async (input: any) => {
  const data = await resumiroApi
    .cancelJob(input.candidateId, input.jobId)
    .then(res => res.data)
  return data
})

const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState,
  reducers: {
    toggleSnackBar: (state, action) => {
      state.showMessage = action.payload.showMessage
    },
    changeSnackBarMessage: (state, action) => {
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    changeApplyStatus: (state, action) => {
      state.isApplied = action.payload.isApplied
    }
  },
  extraReducers: builder => {
    builder
      .addCase(applyJob.pending, (state, action) => {
        state.loading = true
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(cancelJob.pending, (state, action) => {
        state.loading = true
      })
      .addCase(cancelJob.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(cancelJob.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(checkIsApplied.pending, (state, action) => {
        state.loading = true
      })
      .addCase(checkIsApplied.fulfilled, (state, action) => {
        if (action.payload.message === 'Candidate already apply job') {
          state.isApplied = true
        } else {
          state.isApplied = false
        }
        state.loading = false
      })
      .addCase(checkIsApplied.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default jobDetailSlice

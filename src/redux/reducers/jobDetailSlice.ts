import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import socket from '@libs/socket'

const initialState = {
  isApplied: false,
  showMessage: false,
  message: '',
  messageType: 'success',
  notification: null,
  loading: false,
  room: null
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

export const createNotification = createAsyncThunk(
  'create-notification',
  async (input: any) => {
    const data = await resumiroApi
      .insertNotification(input)
      .then(res => res.data)
    return data
  }
)

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
    },
    changeRoom: (state, action) => {
      state.room = action.payload.room
    }
  },
  extraReducers: builder => {
    builder
      .addCase(applyJob.pending, (state, _action) => {
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

      .addCase(cancelJob.pending, (state, _action) => {
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

      .addCase(checkIsApplied.pending, (state, _action) => {
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
      .addCase(checkIsApplied.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(createNotification.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false
        state.notification = action.payload.data

        socket.emit('send_message', {
          room: state.room,
          message: action.payload.data
        })
      })
      .addCase(createNotification.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default jobDetailSlice

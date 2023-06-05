import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  success: '',
  page: 1,
  limit: 9,
  q: ''
}

export const deleteRequestById = createAsyncThunk(
  'delete-request-by-id',
  async (id: number) => {
    const data = await resumiroApi.deleteRequestById(id).then(res => res.data)
    return data
  }
)

export const updateCertifcateStatus = createAsyncThunk(
  'update-certifcate-status',
  async (
    input: {
      id: number
      data: { status: string }
      requestId: number
    },
    { dispatch }
  ) => {
    const data = await resumiroApi
      .updateCertifcateStatus(input.id, input.data)
      .then(res => res.data)
    dispatch(deleteRequestById(input.requestId))

    return data
  }
)

export const updateExperienceStatus = createAsyncThunk(
  'update-experience-status',
  async (
    input: { id: number; data: { status: string }; requestId: number },
    { dispatch }
  ) => {
    const data = await resumiroApi
      .updateExperienceStatus(input.id, input.data)
      .then(res => res.data)

    dispatch(deleteRequestById(input.requestId))
    return data
  }
)

const authRequestSlice = createSlice({
  name: 'authRequest',
  initialState,
  reducers: {
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
      .addCase(updateCertifcateStatus.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateCertifcateStatus.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateCertifcateStatus.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(updateExperienceStatus.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateExperienceStatus.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(updateExperienceStatus.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteRequestById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteRequestById.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteRequestById.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })
  }
})

export default authRequestSlice

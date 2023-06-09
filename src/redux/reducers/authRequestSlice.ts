import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import { NextRouter } from 'next/router'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  success: '',
  page: 1,
  limit: 9,
  q: '',
  data: {
    perPage: 9,
    page: 1,
    totalPage: 0,
    data: []
  }
}

export const getAuthRequests = createAsyncThunk(
  'get-auth-requests',
  async (input: { userId: string; query: object }) => {
    const requests = await resumiroApi
      .getRequestsByReceiverId(Number(input.userId), input.query)
      .then(res => res.data)
    return requests
  }
)

export const deleteRequestById = createAsyncThunk(
  'delete-request-by-id',
  async (input: { id: number; router: NextRouter }) => {
    const data = await resumiroApi
      .deleteRequestById(input.id)
      .then(res => res.data)
    input.router.push({
      pathname: input.router.pathname
    })
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
      router: NextRouter
    },
    { dispatch }
  ) => {
    const data = await resumiroApi
      .updateCertifcateStatus(input.id, input.data)
      .then(res => res.data)
    dispatch(deleteRequestById({ id: input.requestId, router: input.router }))

    return data
  }
)

export const updateExperienceStatus = createAsyncThunk(
  'update-experience-status',
  async (
    input: {
      id: number
      data: { status: string }
      requestId: number
      router: NextRouter
    },
    { dispatch }
  ) => {
    const data = await resumiroApi
      .updateExperienceStatus(input.id, input.data)
      .then(res => res.data)

    dispatch(deleteRequestById({ id: input.requestId, router: input.router }))
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
      .addCase(updateCertifcateStatus.pending, (state, _action) => {
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

      .addCase(updateExperienceStatus.pending, (state, _action) => {
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

      .addCase(deleteRequestById.pending, (state, _action) => {
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

      .addCase(getAuthRequests.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(getAuthRequests.fulfilled, (state, action) => {
        state.data.data=action.payload.data
        state.data.perPage=action.payload.pagination.limit
        state.data.page=action.payload.pagination.page
        state.data.totalPage=action.payload.pagination.total

        state.loading = false
      })
      .addCase(getAuthRequests.rejected, (state, _action) => {
        
        state.loading = false
      })
  }
})

export default authRequestSlice

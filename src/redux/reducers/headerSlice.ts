import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import socket from '@libs/socket'

const initialState = {
  isApplied: false,
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  unreadNotification: 0,
  user: {},
  refreshNotification: false,
  notificationList: []
}

export const fetchUserById = createAsyncThunk(
  'get-user',
  async (id: string) => {
    const { data } = await resumiroApi.getUserById(id).then(res => res.data)
    return data
  }
)

export const fetchUserNotification = createAsyncThunk(
  'get-user-notification',
  async (id: number) => {
    const { data } = await resumiroApi
      .getUserNotification(id)
      .then(res => res.data)
    return data
  }
)

export const countUnreadNotification = createAsyncThunk(
  'count-unread-notification',
  async (id: number) => {
    const { data } = await resumiroApi
      .countUnreadNotification(id)
      .then(res => res.data)
    return data
  }
)

const headerSlice = createSlice({
  name: 'header',
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
    refreshNotification: (state, action) => {
      state.refreshNotification = action.payload
    },
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        socket.emit('join_room', action.payload.room.token)
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(fetchUserNotification.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.loading = false
        state.notificationList = action.payload
      })
      .addCase(fetchUserNotification.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(countUnreadNotification.pending, (state, action) => {
        state.loading = true
      })
      .addCase(countUnreadNotification.fulfilled, (state, action) => {
        state.loading = false
        state.unreadNotification = action.payload
      })
      .addCase(countUnreadNotification.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default headerSlice

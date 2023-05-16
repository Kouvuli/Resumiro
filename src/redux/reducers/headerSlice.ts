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

export const fetchUserNotification = createAsyncThunk(
  'get-user-notification',
  async (id: number) => {
    const { data: notifications } = await resumiroApi
      .getUserNotification(id)
      .then(res => res.data)

    const { data: counts } = await resumiroApi
      .countUnreadNotification(id)
      .then(res => res.data)
    return { notifications, counts }
  }
)

export const deleteNotificationById = createAsyncThunk(
  'delete-notification-by-id',
  async (id: number, { dispatch }) => {
    await resumiroApi.deleteNotification(id).then(res => res.data)
    dispatch(headerSlice.actions.refreshNotification(null))
    return
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
      .addCase(fetchUserNotification.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.loading = false
        state.notificationList = action.payload.notifications
        state.unreadNotification = action.payload.counts
      })
      .addCase(fetchUserNotification.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(deleteNotificationById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteNotificationById.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteNotificationById.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default headerSlice

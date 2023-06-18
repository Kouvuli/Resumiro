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
  'get-user-by-id',
  async (id: string) => {
    const { data } = await resumiroApi.getUserById(id).then(res => res.data)
    return data
  }
)

export const updateRecruiterCompany = createAsyncThunk(
  'update-recruiter-company-by-id',
  async (input: {
    data: { company_id: number }
    title: string
    userId: number
    authorId: number
    content: string
  }) => {
    const data = await resumiroApi
      .updateRecruiterCompany(input.userId, input.data)
      .then(res => res.data)
    const room = await resumiroApi
      .getRoomByUserId(input.userId)
      .then(res => res.data)

    const notification = await resumiroApi
      .insertNotification({
        author_id: input.authorId,
        title: input.title,
        content: input.content,
        recipients: input.userId.toString(),
        notification_type_id: 6,
        object_url: null
      })
      .then(res => res.data)
    return { data, notification, room }
  }
)

export const allowRecruiterToView = createAsyncThunk(
  'check-is-able-to-view-resume',
  async (input: {
    resumeId: number
    userId: number
    title: string
    content: string
    authorId: number
  }) => {
    const data = await resumiroApi
      .allowRecruiterToView(input.resumeId, {
        recruiter_id: input.userId
      })
      .then(res => res.data)

    const room = await resumiroApi
      .getRoomByUserId(input.userId)
      .then(res => res.data)

    const notification = await resumiroApi
      .insertNotification({
        author_id: input.authorId,
        title: input.title,
        content: input.content,
        recipients: input.userId.toString(),
        notification_type_id: 6,
        object_url: null
      })
      .then(res => res.data)
    return { data, room, notification }
  }
)

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

export const readAllNotifications = createAsyncThunk(
  'read-all-notifications',
  async (id: number, { dispatch }) => {
    const data = await resumiroApi
      .readAllNotifications(id)
      .then(res => res.data)
    dispatch(headerSlice.actions.refreshNotification(null))
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
      .addCase(fetchUserById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        socket.emit('join_room', action.payload.room.token)
      })
      .addCase(fetchUserById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(fetchUserNotification.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.loading = false
        state.notificationList = action.payload.notifications
        state.unreadNotification = action.payload.counts
      })
      .addCase(fetchUserNotification.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(deleteNotificationById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(deleteNotificationById.fulfilled, (state, _action) => {
        state.loading = false
      })
      .addCase(deleteNotificationById.rejected, (state, _action) => {
        state.loading = false
      })

      .addCase(allowRecruiterToView.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(allowRecruiterToView.fulfilled, (state, action) => {
        state.showMessage = true
        state.loading = false
        state.message = action.payload.data.message

        socket.emit('send_message', {
          room: action.payload.room.data,
          message: action.payload.notification
        })
        state.messageType = 'success'
      })
      .addCase(allowRecruiterToView.rejected, (state, action) => {
        state.showMessage = true
        state.loading = false
        state.message = action.error.message!
        state.messageType = 'error'
      })

      .addCase(updateRecruiterCompany.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(updateRecruiterCompany.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.data.message
        state.messageType = 'success'

        socket.emit('send_message', {
          room: action.payload.room.data,
          message: action.payload.notification
        })
        state.loading = false
      })
      .addCase(updateRecruiterCompany.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(readAllNotifications.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(readAllNotifications.fulfilled, (state, _action) => {
        state.loading = false
      })
      .addCase(readAllNotifications.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default headerSlice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'
import socket from '@libs/socket'

const initialState = {
  uploadLoading: false,
  loading: false,
  showMessage: false,
  message: '',
  messageType: 'success',
  success: '',
  error: '',
  page: 1,
  limit: 8,
  total: 0,
  q: '',
  order_by: '',
  skill: '',
  uploadedResume: '',
  allSkills: []
}

export const checkIfAllowedToView = createAsyncThunk(
  'check-if-allowed-to-view',
  async (input: {
    resumeId: number
    userId: number
    source: string
    title: string
    recipient: number
    content: string
  }) => {
    const data = await resumiroApi
      .checkResumeIsAbleToView(input.userId, input.resumeId)
      .then(res => res.data)
    if (data.status === 'ok') {
      window.open(input.source, '_blank')
      return
    } else {
      const room = await resumiroApi
        .getRoomByUserId(input.recipient)
        .then(res => res.data)

      const notification = await resumiroApi
        .insertNotification({
          author_id: input.userId,
          title: input.title,
          content: input.content,
          recipients: input.recipient.toString(),
          notification_type_id: 5,
          object_url: input.resumeId.toString()
        })
        .then(res => res.data)
      return { room, notification }
    }
  }
)

export const fetchAllSkills = createAsyncThunk('get-all-skills', async () => {
  const { data } = await resumiroApi.getAllSkills().then(res => res.data)
  return data
})

export const uploadResume = createAsyncThunk(
  'upload-resume',
  async (body: any) => {
    const data = await resumiroApi.uploadFile(body).then(res => res.data)
    return data
  }
)

export const createResume = createAsyncThunk(
  'create-resume',
  async (input: any) => {
    const data = await resumiroApi.insertResume(input).then(res => res.data)
    return data
  }
)

export const deleteResume = createAsyncThunk(
  'delete-resume',
  async (id: any) => {
    const data = await resumiroApi.deleteResume(id).then(res => res.data)
    return data
  }
)

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    changeOrderBy: (state, action) => {
      state.order_by = action.payload
    },
    changeSkill: (state, action) => {
      state.skill = action.payload
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
      .addCase(fetchAllSkills.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.loading = false
        state.allSkills = action.payload
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.loading = false
      })

      .addCase(uploadResume.pending, (state, action) => {
        state.uploadLoading = true
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.showMessage = true
        state.uploadedResume = action.payload.data
        state.message = action.payload.message
        state.messageType = 'success'
        state.uploadLoading = false
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.uploadLoading = false
      })

      .addCase(createResume.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(createResume.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(deleteResume.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = action.payload.message
        state.messageType = 'success'
        state.loading = false
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(checkIfAllowedToView.pending, (state, action) => {
        state.loading = true
      })
      .addCase(checkIfAllowedToView.fulfilled, (state, action) => {
        if (action.payload != undefined) {
          state.showMessage = true
          state.message = 'Đã gửi yêu cầu xem CV thành công'
          state.messageType = 'success'
          socket.emit('send_message', {
            room: action.payload.room.data,
            message: action.payload.notification
          })
        }
        state.loading = false
      })
      .addCase(checkIfAllowedToView.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })
  }
})

export default resumeSlice

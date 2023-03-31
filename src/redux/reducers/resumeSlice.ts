import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

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

export const fetchAllSkills = createAsyncThunk('get-all-skills', async () => {
  const { data } = await resumiroApi.getAllSkills().then(res => res.data)
  return data
})

export const uploadResume = createAsyncThunk(
  'upload-resume',
  async (body: any) => {
    const data = await resumiroApi.uploadImage(body).then(res => res.data)
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
    }
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
  }
})

export default resumeSlice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  user: {}
}

export const fetchRecruiterById = createAsyncThunk(
  'get-candidate-by-id',
  async (id: string) => {
    const { data } = await resumiroApi
      .getRecruiterById(id)
      .then(res => res.data)
    return data
  }
)

const recruiterProfileSlice = createSlice({
  name: 'recruiterProfile',
  initialState,
  reducers: {
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
      .addCase(fetchRecruiterById.pending, (state, _action) => {
        state.loading = true
      })
      .addCase(fetchRecruiterById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchRecruiterById.rejected, (state, _action) => {
        state.loading = false
      })
  }
})

export default recruiterProfileSlice

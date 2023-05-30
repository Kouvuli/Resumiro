import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  user: {}
}

export const fetchCandidateById = createAsyncThunk(
  'get-candidate-by-id',
  async (id: string) => {
    const { data } = await resumiroApi
      .getCandidateById(id)
      .then(res => res.data)
    return data
  }
)

const candidateProfileSlice = createSlice({
  name: 'candidateProfile',
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
      .addCase(fetchCandidateById.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default candidateProfileSlice

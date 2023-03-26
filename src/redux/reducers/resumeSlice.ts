import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  loading: false,
  success: '',
  error: '',
  page: 1,
  limit: 8,
  total: 0,
  q: '',
  order_by: '',
  skill: '',
  allSkills: []
}

export const fetchAllSkills = createAsyncThunk('get-all-skills', async () => {
  const { data } = await resumiroApi.getAllSkills().then(res => res.data)
  return data
})

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
  }
})

export default resumeSlice

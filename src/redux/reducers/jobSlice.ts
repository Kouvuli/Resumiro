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
  location: '',
  order_by: '',
  job_type: '',
  min_salary: '',
  max_salary: '',
  experience: ''
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      state.location = action.payload
    },
    changeJobType: (state, action) => {
      state.job_type = action.payload
    },
    changeExperience: (state, action) => {
      state.experience = action.payload
    },
    changeMinSalary: (state, action) => {
      state.min_salary = action.payload
    },
    changeMaxSalary: (state, action) => {
      state.max_salary = action.payload
    },
    changeOrderBy: (state, action) => {
      state.order_by = action.payload
    },
    changeSearchText: (state, action) => {
      state.q = action.payload
    }
  }
})

export default jobSlice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumiroApi from '@apis/resumiroApi'

const initialState = {
  loading: false,
  success: '',
  error: '',
  page: 1,
  limit: 9,
  total: 0,
  q: '',
  order_by: '',
  location: ''
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    changeOrderBy: (state, action) => {
      state.order_by = action.payload
    },
    changeLocation: (state, action) => {
      state.location = action.payload
    },
    changeSearchText: (state, action) => {
      state.q = action.payload
    }
  }
})

export default companySlice

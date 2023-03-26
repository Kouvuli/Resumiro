import { configureStore } from '@reduxjs/toolkit'
import companySlice from './reducers/companySlice'
import jobSlice from './reducers/jobSlice'
import profileSlice from './reducers/profileSlice'
import resumeSlice from './reducers/resumeSlice'

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    job: jobSlice.reducer,
    company: companySlice.reducer,
    resume: resumeSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

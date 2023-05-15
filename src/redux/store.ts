import { configureStore } from '@reduxjs/toolkit'
import authRequestSlice from './reducers/authRequestSlice'
import companySlice from './reducers/companySlice'
import headerSlice from './reducers/headerSlice'
import jobDetailSlice from './reducers/jobDetailSlice'
import jobSlice from './reducers/jobSlice'
import profileSlice from './reducers/profileSlice'
import resumeSlice from './reducers/resumeSlice'
import signInSlice from './reducers/signInSlice'
import signUpSlice from './reducers/signUpSlice'

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    job: jobSlice.reducer,
    company: companySlice.reducer,
    resume: resumeSlice.reducer,
    jobDetail: jobDetailSlice.reducer,
    signIn: signInSlice.reducer,
    signUp: signUpSlice.reducer,
    header: headerSlice.reducer,
    authRequest: authRequestSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

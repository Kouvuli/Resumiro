import { configureStore } from '@reduxjs/toolkit'
import authRequestSlice from './reducers/authRequestSlice'
import candidateProfileSlice from './reducers/candidateProfileSlice'
import companySlice from './reducers/companySlice'
import headerSlice from './reducers/headerSlice'
import jobDetailSlice from './reducers/jobDetailSlice'
import jobSlice from './reducers/jobSlice'
import profileSlice from './reducers/profileSlice'
import recruiterProfileSlice from './reducers/recruiterProfileSlice'
import resumeSlice from './reducers/resumeSlice'
import signInSlice from './reducers/signInSlice'
import signUpSlice from './reducers/signUpSlice'
import web3Slice from './reducers/web3Slice'

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
    authRequest: authRequestSlice.reducer,
    candidateProfile: candidateProfileSlice.reducer,
    recruiterProfile: recruiterProfileSlice.reducer,
    web3: web3Slice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

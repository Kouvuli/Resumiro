import { configureStore } from '@reduxjs/toolkit'
import companySlice from './reducers/companySlice'
import headerSlice from './reducers/headerSlice'
import jobDetailSlice from './reducers/jobDetailSlice'
import jobSlice from './reducers/jobSlice'
import profileSlice from './reducers/profileSlice'
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
    web3: web3Slice.reducer,
  },
  // web3Slice is current using non-serializable values (provider, Resumiro class). This setting is for ignoring the warnings. 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

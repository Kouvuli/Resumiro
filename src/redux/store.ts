import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './reducers/profileSlice'

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

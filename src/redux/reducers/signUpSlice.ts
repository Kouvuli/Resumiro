import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import resumiroApi from '@apis/resumiroApi'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  user: {}
}

export const signUp = createAsyncThunk('sign-up', async (input: any) => {
  const { username, password, role, walletAddress } = input

  const result = await resumiroApi
    .registerUser({
      username,
      password,
      address_wallet: walletAddress,
      role: role.toString()
    })
    .then(res => res.data)

  return result
})

const signUpSlice = createSlice({
  name: 'signUp',
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
      .addCase(signUp.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = 'Đăng ký thành công'
        state.messageType = 'success'
        state.user = action.payload
        state.loading = false
        setTimeout(() => {
          state = initialState
        }, 2000)
      })
      .addCase(signUp.rejected, (state, action) => {
        state.showMessage = true
        state.message = action.error.message!
        state.messageType = 'error'
        state.loading = false
      })
  }
})

export default signUpSlice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import resumiroApi from '@apis/resumiroApi'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { networks } from '@shared/networks'
import { floatButtonPrefixCls } from 'antd/es/float-button/FloatButton'

const initialState = {
  showMessage: false,
  message: '',
  messageType: 'success',
  loading: false,
  success: false
}

export const signInNormal = createAsyncThunk(
  'sign-in-normal',
  async (input: any) => {
    const { username, password } = input

    await signIn('credentials', {
      redirect: false,
      username: username,
      password: password
    })
  }
)

export const signInWallet = createAsyncThunk(
  'sign-in-wallet',
  async (input: any) => {
    const { provider } = input

    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }

    // await window.ethereum.request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       ...networks['mumbai']
    //     }
    //   ]
    // })
    // Get the wallet provider, the signer and address
    //  see: https://docs.ethers.org/v6/getting-started/#starting-signing
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    const walletAddress = await signer.getAddress()

    const response = await resumiroApi
      .generateNonce({
        address_wallet: walletAddress
      })
      .then(res => res.data)

    const signedNonce = await signer.signMessage(response.nonce)
    await signIn('credentials', {
      redirect: false,
      address_wallet: walletAddress,
      signedNonce
    })
    // return result;
  }
)

const signInSlice = createSlice({
  name: 'signIn',
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
      .addCase(signInWallet.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signInWallet.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = 'Đăng nhập ví thành công'
        state.messageType = 'success'
        state.success = true
        state.loading = false

        // state.provider = provider
      })
      .addCase(signInWallet.rejected, (state, action) => {
        state.showMessage = true
        state.message = 'Đăng nhập ví thất bại'
        state.messageType = 'error'
        state.loading = false
      })

      .addCase(signInNormal.pending, (state, action) => {
        state.loading = true
      })
      .addCase(signInNormal.fulfilled, (state, action) => {
        state.showMessage = true
        state.message = 'Đăng nhập thành công'
        state.messageType = 'success'
        state.success = true
        state.loading = false
      })
      .addCase(signInNormal.rejected, (state, action) => {
        state.showMessage = true
        state.message = 'Đăng nhập thất bại'
        state.messageType = 'error'
        state.loading = false
      })
  }
})

export default signInSlice

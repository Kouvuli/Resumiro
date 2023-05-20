import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import Resumiro from '../../interfaces/Resumiro'

type Wallet = {
  address: string
  amount: number
}

type InitialState = {
  provider: ethers.providers.Web3Provider | null
  wallet: Wallet | null
  resumiro: any
}

const initialState: InitialState = {
  provider: null,
  wallet: null,
  resumiro: null
}

export const reconnectWeb3 = createAsyncThunk('reconnect-web3', async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, undefined)
  await provider.send('eth_requestAccounts', [])
  const signer = provider.getSigner()
  const address = await signer.getAddress()
  const amount = Number(
    ethers.utils.formatEther(
      await provider.getBalance(await signer.getAddress())
    )
  )
  const wallet: { address: any; amount: any } = { address, amount }

  const resumiro = new Resumiro(provider)

  return { provider, wallet, resumiro }
})

const web3Slice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setWeb3: (state, action) => {
      state.provider = action.payload.provider
      state.wallet = action.payload.wallet
      state.resumiro = action.payload.resumiro
    },
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(reconnectWeb3.pending, (state, action) => {
        console.log('Connecting wallet...')
      })
      .addCase(reconnectWeb3.fulfilled, (state, action) => {
        state.provider = action.payload.provider
        state.wallet = action.payload.wallet
        state.resumiro = action.payload.resumiro
        console.log("Web3 connected!")
      })
      .addCase(reconnectWeb3.rejected, (state, action) => {
        console.log('Connection crashed!')
      })
  }
})

export default web3Slice

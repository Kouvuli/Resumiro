import { ethers } from 'ethers'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type Wallet = {
  address: string
  amount: number
}

type contextProps = {
  provider?: ethers.providers.Web3Provider
  signer?: ethers.providers.JsonRpcSigner
  wallet?: Wallet
  handleConnect?: any
  handleDisconnect?: any
  handleAddUser?: any
}

export const Web3Context = React.createContext<contextProps>({})

declare var window: any

export const Web3Provider = ({ children }: Props) => {
  const [wallet, setWallet] = React.useState<Wallet>()
  const [provider, setProvider] =
    React.useState<ethers.providers.Web3Provider>()
  // const [isEnabled, setIsEnabled] = React.useState<Boolean>(false)

  const handleConnect = async () => {
    try {
      //   if (!window.ethereum) alert('Please install metamask!')

      console.log('...connecting wallet')
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      )
      const signer = provider.getSigner()
      // const accounts = window.ethereum.request({ method: "eth_requestAccounts" });

      const address = await signer.getAddress()
      const amount = Number(
        ethers.utils.formatEther(
          await provider.getBalance(await signer.getAddress())
        )
      )
      // const balance = (await signer.getBalance()).toNumber;
      setProvider(provider)
      setWallet({ address, amount })
      // window.localStorage.setItem("connected", "true")
      // setIsEnabled(true)
      console.log('connect wallet done')
    } catch (error) {
      console.log(error)
      console.log('connect wallet done')

      throw new Error('No ethereum Object')
    }
  }

  const handleDisconnect = async () => {
    console.log('...disconnecting wallet')
    setProvider(undefined)
    setWallet(undefined)
    console.log('wallet disconnected')
  }

  //======================USER=========================

  return (
    <Web3Context.Provider
      value={{ provider, wallet, handleConnect, handleDisconnect }}
    >
      {children}
    </Web3Context.Provider>
  )
}

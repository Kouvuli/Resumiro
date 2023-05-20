import { ethers } from 'ethers'
import { userAbi, contractAddress } from '@constants/index'
import BaseInterface from './BaseInterface'

export type UserProps = {
  userAddress: string
  type: number
}

export type ContractAddress = {
  [chainId: string]: {
    [contractName: string]: string[]
  }
}

const addresses: ContractAddress = contractAddress

export default class User extends BaseInterface {
  constructor(provider: ethers.providers.Web3Provider) {
    let chainId: string = provider._network.chainId.toString()
    let chosen: number = addresses[chainId]['User'].length - 1
    super(
      provider,
      addresses[chainId]['User'][chosen],
      userAbi as ethers.ContractInterface
    )
  }

  async addUser({ userAddress, type }: UserProps) {
    const addTx = await this._contract.addUser(userAddress, type, this._option)
    const result = await this._handleTransactionRespone(addTx)
    // const log = this.listenEvent(0);

    return result
  }
}

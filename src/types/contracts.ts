export type ContractAbiEntry = Record<string, unknown>

export type ContractCallRequest = {
  address: string
  method: string
  parameters: unknown[]
  abi: ContractAbiEntry[]
}

export type ContractNetworkFee = {
  balance: string
  fee: string
}
export type SwapOrder = 'FASTEST' | 'CHEAPEST' | 'RECOMMENDED' | 'NO_SLIPPAGE' | string

export type SwapQuoteRequest = {
  fromAssetId: string
  toAssetId: string
  amount: string
  recipientAddress?: string
  order?: SwapOrder
}

export type SwapQuote = {
  amount: string
  estimatedArrivalTime: number
  impact: string
  impactInUSD: string
  minAmount: string
  nativeBalance: string
  nativeBalanceInUSD: string
  networkFee: string
  networkFeeInUSD: string
  rate: string
  slippage: string
  transactionFee: number
}

export type SwapExecuteRequest = SwapQuoteRequest & {
  reference?: string
  metadata?: Record<string, unknown>
}

export type SwapTransaction = {
  addressId: string | null
  amlScreening: unknown | null
  amount: string
  amountPaid: string | null
  asset: {
    address: string
    blockchain: {
      createdAt: string
      derivationPath: string
      id: string
      isActive: boolean
      isEvmCompatible: boolean
      isL2?: boolean
      logoUrl?: string
      name: string
      slug: string
      symbol: string
      tokenStandard: string | null
      updatedAt: string
    }
    createdAt: string
    decimals: number
    id: string
    isActive: boolean
    logoUrl?: string
    name: string
    network: string
    standard: string | null
    symbol: string
    updatedAt: string
  }
  assetSwept: boolean | null
  assetSweptAmount: string | null
  assetSweptAt: string | null
  assetSweptGasFee: string | null
  assetSweptHash: string | null
  assetSweptRecipientAddress: string | null
  assetSweptResponse?: unknown | null
  assetSweptSenderAddress: string | null
  blockHash: string | null
  blockNumber: number | null
  blockchain: {
    createdAt: string
    derivationPath: string
    id: string
    isActive: boolean
    isEvmCompatible: boolean
    isL2?: boolean
    logoUrl?: string
    name: string
    slug: string
    symbol: string
    tokenStandard: string | null
    updatedAt: string
  }
  chainId: number | null
  confirmations: number | null
  confirmed: boolean
  createdAt: string
  currency: string | null
  fee: string | null
  feeMetadata: unknown | null
  gasFee: string | null
  gasPrice: string | null
  gasUsed: string | null
  hash: string | null
  id: string
  metadata: Record<string, unknown> | null
  network: string
  note: string | null
  rate: string | null
  reason: string | null
  recipientAddress: string
  senderAddress: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | string
  toAmount: string | null
  toAsset?: {
    address: string
    blockchain: {
      createdAt: string
      derivationPath: string
      id: string
      isActive: boolean
      isEvmCompatible: boolean
      isL2?: boolean
      logoUrl?: string
      name: string
      slug: string
      symbol: string
      tokenStandard: string | null
      updatedAt: string
    }
    createdAt: string
    decimals: number
    id: string
    isActive: boolean
    logoUrl?: string
    name: string
    network: string
    standard: string | null
    symbol: string
    updatedAt: string
  }
  toBlockchain?: {
    createdAt: string
    derivationPath: string
    id: string
    isActive: boolean
    isEvmCompatible: boolean
    isL2?: boolean
    logoUrl?: string
    name: string
    slug: string
    symbol: string
    tokenStandard: string | null
    updatedAt: string
  }
  toWallet?: {
    address: string
    configurations?: unknown | null
    createdAt: string
    derivationPath: string
    description?: string
    id: string
    isActive: boolean
    name: string
    network: string
    status: string
    updatedAt: string
  }
  tokenAddress: string | null
  type: 'SWAP' | string
  updatedAt: string
  wallet?: {
    address: string
    apiCredential?: unknown
    blockchain?: unknown
    business?: unknown
    configurations?: unknown | null
    createdAt?: string
    derivationPath?: string
    description?: string
    id?: string
    isActive?: boolean
    name?: string
    network?: string
    status?: string
    updatedAt?: string
  }
}
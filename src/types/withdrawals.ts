import type { Asset, Blockchain } from './wallets'

export type AMLScreening = {
  message: string
  provider: string
  status: string
}

export type WithdrawNetworkFee = {
  nativeBalance: string
  networkFee: string
}

export type WithdrawAssetInput = {
  id: string
  amount: string
  address: string
  reference?: string
  note?: string
  metadata?: Record<string, unknown>
}

export type WithdrawSingleInput = {
  assetId: string
  amount: string
  address: string
  reference?: string
  note?: string
  metadata?: Record<string, unknown>
}

export type WithdrawRequest = WithdrawSingleInput | { assets: WithdrawAssetInput[] }

export type WithdrawTransaction = {
  amlScreening?: AMLScreening | null
  amount: string
  amountPaid: string
  amountUSD?: string | null
  asset: Asset
  assetSwept?: boolean | null
  assetSweptAmount?: string | null
  assetSweptAt?: string | null
  assetSweptGasFee?: string | null
  assetSweptHash?: string | null
  assetSweptRecipientAddress?: string | null
  assetSweptSenderAddress?: string | null
  blockHash: string | null
  blockNumber: number | null
  blockchain: Blockchain
  chainId: number | null
  confirmations: number | null
  confirmed: boolean
  createdAt: string
  currency: string
  fee?: string | null
  feeHash?: string | null
  gasFee?: string | null
  gasPrice?: string | null
  gasUsed?: string | null
  hash: string
  id: string
  metadata: Record<string, unknown> | null
  network: string
  note: string | null
  rate?: string | null
  rateUSD?: string | null
  reason: string | null
  recipientAddress: string
  reference?: string | null
  senderAddress: string
  signedTransaction?: string | null
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | string
  toAmount?: string | null
  toCurrency?: string | null
  tokenAddress?: string | null
  type: 'WITHDRAW' | 'SIGNED' | string
  updatedAt: string
  wallet?: { id?: string; address?: string; configurations?: unknown }
}

export type WithdrawSignResult = { errors: unknown[]; success: WithdrawTransaction[] } | WithdrawTransaction | WithdrawTransaction[]
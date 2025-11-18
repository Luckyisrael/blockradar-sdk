import { HttpClient } from '../../client/HttpClient'
import { ApiResponse } from '../../types/api'
import { toQueryString } from '../../utils/serialization'
import { Wallet, WalletBalance, WalletBalancesItem, WebhookLog } from '../../types/wallets'
import { WithdrawNetworkFee, WithdrawRequest, WithdrawTransaction } from '../../types/withdrawals'
import { SwapQuoteRequest, SwapQuote, SwapExecuteRequest, SwapTransaction } from '../../types/swaps'


/** Wallet-related operations for the master wallet. */
export class Wallets {
  private http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
  }
  /** Retrieves a wallet by ID. */
  getWallet(id: string, opts?: { showPrivateKey?: boolean }): Promise<ApiResponse<Wallet>> {
    const qs = toQueryString(opts)
    return this.http.get<ApiResponse<Wallet>>(`/wallets/${id}${qs}`)
  }
  /** Retrieves balance for a given wallet, optionally scoped by `assetId`. */
  getBalance(id: string, opts?: { assetId?: string }): Promise<ApiResponse<WalletBalance>> {
    const qs = toQueryString(opts)
    return this.http.get<ApiResponse<WalletBalance>>(`/wallets/${id}/balance${qs}`)
  }
  /** Retrieves balances for a wallet (list). */
  getBalances(id: string, opts?: { address?: string; asset_id?: string }): Promise<ApiResponse<WalletBalancesItem[]>> {
    const qs = toQueryString(opts)
    return this.http.get<ApiResponse<WalletBalancesItem[]>>(`/wallets/${id}/balances${qs}`)
  }
  /** Updates wallet metadata or settings. */
  updateWallet(id: string, body: { description?: string; name?: string }): Promise<ApiResponse<Wallet>> {
    return this.http.patch<ApiResponse<Wallet>>(`/wallets/${id}`, body)
  }
  /** Initiates a block rescan for a wallet. */
  rescanBlocks(id: string, body?: { transactionHash?: string }): Promise<ApiResponse<{ message: string }>> {
    return this.http.post<ApiResponse<{ message: string }>>(`/wallets/${id}/rescan/blocks`, body)
  }
  /** Triggers sweeping of unswept assets. */
  triggerSweepAssets(id: string, body?: { transactionId?: string }): Promise<ApiResponse<{ message: string }>> {
    return this.http.post<ApiResponse<{ message: string }>>(`/wallets/${id}/sweep/assets`, body)
  }
  /** Retrieves webhook logs for a wallet. */
  getWebhookLogs(id: string, opts?: { page?: number | string; limit?: number | string }): Promise<ApiResponse<WebhookLog[]>> {
    const qs = toQueryString(opts)
    return this.http.get<ApiResponse<WebhookLog[]>>(`/wallets/${id}/webhooks${qs}`)
  }
  /** Retrieves a swap quote for the master wallet. */
  getSwapQuote(id: string, body: SwapQuoteRequest): Promise<ApiResponse<SwapQuote>> {
    return this.http.post<ApiResponse<SwapQuote>>(`/wallets/${id}/swaps/quote`, body)
  }
  /** Executes a swap from the master wallet. */
  executeSwap(id: string, body: SwapExecuteRequest): Promise<ApiResponse<SwapTransaction>> {
    return this.http.post<ApiResponse<SwapTransaction>>(`/wallets/${id}/swaps/execute`, body)
  }
  /**
   * Calculates network fee for a prospective withdrawal.
   * Use POST; GET would return 404 for this route.
   */
  getWithdrawNetworkFee(id: string, body: { assetId: string; address: string; amount: string; reference?: string; note?: string; metadata?: Record<string, unknown> }): Promise<ApiResponse<WithdrawNetworkFee>> {
    return this.http.post<ApiResponse<WithdrawNetworkFee>>(`/wallets/${id}/withdraw/network-fee`, body)
  }
  /**
   * Initiates a withdrawal from the master wallet. Supports single or batch format.
   */
  withdraw(id: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>> {
    return this.http.post<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>>(`/wallets/${id}/withdraw`, body)
  }
  /**
   * Signs a withdrawal without broadcasting, returning signed transactions per asset.
   */
  withdrawSignOnly(id: string, body: WithdrawRequest): Promise<ApiResponse<{ errors: unknown[]; success: WithdrawTransaction[] }>> {
    return this.http.post<ApiResponse<{ errors: unknown[]; success: WithdrawTransaction[] }>>(`/wallets/${id}/withdraw/sign`, body)
  }
}
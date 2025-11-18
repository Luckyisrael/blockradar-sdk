import { HttpClient } from '../../client/HttpClient'
import { ApiResponse } from '../../types/api'
import { toQueryString } from '../../utils/serialization'
import { Address, AddressBalance, AddressBalancesItem } from '../../types/addresses'
import { WithdrawRequest, WithdrawTransaction, WithdrawNetworkFee, WithdrawSignResult } from '../../types/withdrawals'

/** Address-related operations under a wallet. */
export class Addresses {
  private http: HttpClient
  constructor(http: HttpClient) {
    this.http = http
  }
  /**
   * Lists addresses for a wallet.
   * Optional pagination parameters can be supplied depending on server support.
   */
  getAddresses(walletId: string, opts?: { page?: number | string; limit?: number | string }): Promise<ApiResponse<Address[]>> {
    return this.http.get<ApiResponse<Address[]>>(`/wallets/${walletId}/addresses${toQueryString(opts)}`)
  }
  /**
   * Generates a new internal address under a wallet.
   * Accepts optional configuration flags and metadata.
   */
  generateAddress(
    walletId: string,
    body?: { disableAutoSweep?: boolean; enableGaslessWithdraw?: boolean; metadata?: Record<string, unknown>; name?: string }
  ): Promise<ApiResponse<Address>> {
    return this.http.post<ApiResponse<Address>>(`/wallets/${walletId}/addresses`, body)
  }
  /**
   * Retrieves a specific address by ID, with optional `showPrivateKey` reveal.
   */
  getAddress(walletId: string, addressId: string, opts?: { showPrivateKey?: boolean }): Promise<ApiResponse<Address>> {
    return this.http.get<ApiResponse<Address>>(`/wallets/${walletId}/addresses/${addressId}${toQueryString(opts)}`)
  }
  /**
   * Updates address metadata or settings. Supports enabling/disabling features and naming.
   */
  updateAddress(
    walletId: string,
    addressId: string,
    body: {
      disableAutoSweep?: boolean
      enableGaslessWithdraw?: boolean
      isActive?: boolean
      metadata?: Record<string, unknown> | null
      name?: string | null
      showPrivateKey?: boolean
      privateKey?: string
    }
  ): Promise<ApiResponse<Address>> {
    return this.http.patch<ApiResponse<Address>>(`/wallets/${walletId}/addresses/${addressId}`, body)
  }
  /** Retrieves aggregate balance for an address (optionally filter by `assetId`). */
  getBalance(walletId: string, addressId: string, opts?: { assetId?: string }): Promise<ApiResponse<AddressBalance>> {
    return this.http.get<ApiResponse<AddressBalance>>(`/wallets/${walletId}/addresses/${addressId}/balance${toQueryString(opts)}`)
  }
  /** Retrieves detailed balances for an address (list). */
  getBalances(walletId: string, addressId: string): Promise<ApiResponse<AddressBalancesItem[]>> {
    return this.http.get<ApiResponse<AddressBalancesItem[]>>(`/wallets/${walletId}/addresses/${addressId}/balances`)
  }
  /**
   * Whitelists an external address under a wallet using policy configurations.
   */
  whitelistAddress(
    walletId: string,
    body: {
      address: string
      disableAutoSweep?: boolean
      enableGaslessWithdraw?: boolean
      metadata?: Record<string, unknown>
      name?: string
      privateKey?: string
      showPrivateKey?: boolean
    }
  ): Promise<ApiResponse<Address>> {
    return this.http.post<ApiResponse<Address>>(`/wallets/${walletId}/addresses/whitelist`, body)
  }
  /**
   * Removes an external address from whitelist.
   */
  unwhitelistAddress(walletId: string, addressId: string): Promise<ApiResponse<Address>> {
    return this.http.del<ApiResponse<Address>>(`/wallets/${walletId}/addresses/whitelist/${addressId}`)
  }
  /**
   * Initiates a withdrawal from a child address under the wallet.
   * Supports single or batch format using the same body shape as master wallet.
   */
  withdraw(walletId: string, addressId: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>> {
    return this.http.post<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>>(`/wallets/${walletId}/addresses/${addressId}/withdraw`, body)
  }
  /**
   * Signs a withdrawal from a child address without broadcasting.
   */
  withdrawSignOnly(walletId: string, addressId: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawSignResult>> {
    return this.http.post<ApiResponse<WithdrawSignResult>>(`/wallets/${walletId}/addresses/${addressId}/withdraw/sign`, body)
  }
  /**
   * Calculates network fee for withdrawal from a child address.
   */
  getWithdrawNetworkFee(walletId: string, addressId: string, body: { assetId: string; address: string; amount: string; reference?: string; note?: string; metadata?: Record<string, unknown> }): Promise<ApiResponse<WithdrawNetworkFee>> {
    return this.http.post<ApiResponse<WithdrawNetworkFee>>(`/wallets/${walletId}/addresses/${addressId}/withdraw/network-fee`, body)
  }
}
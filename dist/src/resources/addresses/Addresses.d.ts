import { HttpClient } from '../../client/HttpClient';
import { ApiResponse } from '../../types/api';
import { Address, AddressBalance, AddressBalancesItem } from '../../types/addresses';
import { WithdrawRequest, WithdrawTransaction, WithdrawNetworkFee, WithdrawSignResult } from '../../types/withdrawals';
/** Address-related operations under a wallet. */
export declare class Addresses {
    private http;
    constructor(http: HttpClient);
    /**
     * Lists addresses for a wallet.
     * Optional pagination parameters can be supplied depending on server support.
     */
    getAddresses(walletId: string, opts?: {
        page?: number | string;
        limit?: number | string;
    }): Promise<ApiResponse<Address[]>>;
    /**
     * Generates a new internal address under a wallet.
     * Accepts optional configuration flags and metadata.
     */
    generateAddress(walletId: string, body?: {
        disableAutoSweep?: boolean;
        enableGaslessWithdraw?: boolean;
        metadata?: Record<string, unknown>;
        name?: string;
    }): Promise<ApiResponse<Address>>;
    /**
     * Retrieves a specific address by ID, with optional `showPrivateKey` reveal.
     */
    getAddress(walletId: string, addressId: string, opts?: {
        showPrivateKey?: boolean;
    }): Promise<ApiResponse<Address>>;
    /**
     * Updates address metadata or settings. Supports enabling/disabling features and naming.
     */
    updateAddress(walletId: string, addressId: string, body: {
        disableAutoSweep?: boolean;
        enableGaslessWithdraw?: boolean;
        isActive?: boolean;
        metadata?: Record<string, unknown> | null;
        name?: string | null;
        showPrivateKey?: boolean;
        privateKey?: string;
    }): Promise<ApiResponse<Address>>;
    /** Retrieves aggregate balance for an address (optionally filter by `assetId`). */
    getBalance(walletId: string, addressId: string, opts?: {
        assetId?: string;
    }): Promise<ApiResponse<AddressBalance>>;
    /** Retrieves detailed balances for an address (list). */
    getBalances(walletId: string, addressId: string): Promise<ApiResponse<AddressBalancesItem[]>>;
    /**
     * Whitelists an external address under a wallet using policy configurations.
     */
    whitelistAddress(walletId: string, body: {
        address: string;
        disableAutoSweep?: boolean;
        enableGaslessWithdraw?: boolean;
        metadata?: Record<string, unknown>;
        name?: string;
        privateKey?: string;
        showPrivateKey?: boolean;
    }): Promise<ApiResponse<Address>>;
    /**
     * Removes an external address from whitelist.
     */
    unwhitelistAddress(walletId: string, addressId: string): Promise<ApiResponse<Address>>;
    /**
     * Initiates a withdrawal from a child address under the wallet.
     * Supports single or batch format using the same body shape as master wallet.
     */
    withdraw(walletId: string, addressId: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>>;
    /**
     * Signs a withdrawal from a child address without broadcasting.
     */
    withdrawSignOnly(walletId: string, addressId: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawSignResult>>;
    /**
     * Calculates network fee for withdrawal from a child address.
     */
    getWithdrawNetworkFee(walletId: string, addressId: string, body: {
        assetId: string;
        address: string;
        amount: string;
        reference?: string;
        note?: string;
        metadata?: Record<string, unknown>;
    }): Promise<ApiResponse<WithdrawNetworkFee>>;
}

import { HttpClient } from '../../client/HttpClient';
import { ApiResponse } from '../../types/api';
import { Wallet, WalletBalance, WalletBalancesItem, WebhookLog } from '../../types/wallets';
import { WithdrawNetworkFee, WithdrawRequest, WithdrawTransaction } from '../../types/withdrawals';
import { SwapQuoteRequest, SwapQuote, SwapExecuteRequest, SwapTransaction } from '../../types/swaps';
import { VirtualAccount, VirtualAccountCreateMasterRequest, VirtualAccountUpdateRequest } from '../../types/virtualAccounts';
import { ContractCallRequest, ContractNetworkFee } from '../../types/contracts';
/** Wallet-related operations for the master wallet. */
export declare class Wallets {
    private http;
    constructor(http: HttpClient);
    /** Retrieves a wallet by ID. */
    getWallet(id: string, opts?: {
        showPrivateKey?: boolean;
    }): Promise<ApiResponse<Wallet>>;
    /** Retrieves balance for a given wallet, optionally scoped by `assetId`. */
    getBalance(id: string, opts?: {
        assetId?: string;
    }): Promise<ApiResponse<WalletBalance>>;
    /** Retrieves balances for a wallet (list). */
    getBalances(id: string, opts?: {
        address?: string;
        asset_id?: string;
    }): Promise<ApiResponse<WalletBalancesItem[]>>;
    /** Updates wallet metadata or settings. */
    updateWallet(id: string, body: {
        description?: string;
        name?: string;
    }): Promise<ApiResponse<Wallet>>;
    /** Initiates a block rescan for a wallet. */
    rescanBlocks(id: string, body?: {
        transactionHash?: string;
    }): Promise<ApiResponse<{
        message: string;
    }>>;
    /** Triggers sweeping of unswept assets. */
    triggerSweepAssets(id: string, body?: {
        transactionId?: string;
    }): Promise<ApiResponse<{
        message: string;
    }>>;
    /** Retrieves webhook logs for a wallet. */
    getWebhookLogs(id: string, opts?: {
        page?: number | string;
        limit?: number | string;
    }): Promise<ApiResponse<WebhookLog[]>>;
    /** Retrieves a swap quote for the master wallet. */
    getSwapQuote(id: string, body: SwapQuoteRequest): Promise<ApiResponse<SwapQuote>>;
    /** Executes a swap from the master wallet. */
    executeSwap(id: string, body: SwapExecuteRequest): Promise<ApiResponse<SwapTransaction>>;
    /** Retrieves the virtual account associated with a master wallet. */
    getVirtualAccount(id: string): Promise<ApiResponse<VirtualAccount>>;
    /** Creates a virtual account within a master wallet. */
    createVirtualAccount(id: string, body: VirtualAccountCreateMasterRequest): Promise<ApiResponse<VirtualAccount>>;
    /** Updates a virtual account under a master wallet. */
    updateVirtualAccount(walletId: string, virtualAccountId: string, body: VirtualAccountUpdateRequest): Promise<ApiResponse<VirtualAccount>>;
    /**
     * Calculates network fee for a prospective withdrawal.
     * Use POST; GET would return 404 for this route.
     */
    getWithdrawNetworkFee(id: string, body: {
        assetId: string;
        address: string;
        amount: string;
        reference?: string;
        note?: string;
        metadata?: Record<string, unknown>;
    }): Promise<ApiResponse<WithdrawNetworkFee>>;
    /**
     * Initiates a withdrawal from the master wallet. Supports single or batch format.
     */
    withdraw(id: string, body: WithdrawRequest): Promise<ApiResponse<WithdrawTransaction | WithdrawTransaction[]>>;
    /**
     * Signs a withdrawal without broadcasting, returning signed transactions per asset.
     */
    withdrawSignOnly(id: string, body: WithdrawRequest): Promise<ApiResponse<{
        errors: unknown[];
        success: WithdrawTransaction[];
    }>>;
    /** Estimates network fee for a custom smart contract call. */
    getContractNetworkFee(id: string, body: ContractCallRequest): Promise<ApiResponse<ContractNetworkFee>>;
    /** Reads data from a custom smart contract. */
    readContract(id: string, body: ContractCallRequest): Promise<ApiResponse<string>>;
}

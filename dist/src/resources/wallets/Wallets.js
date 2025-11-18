import { toQueryString } from '../../utils/serialization';
/** Wallet-related operations for the master wallet. */
export class Wallets {
    constructor(http) {
        this.http = http;
    }
    /** Retrieves a wallet by ID. */
    getWallet(id, opts) {
        const qs = toQueryString(opts);
        return this.http.get(`/wallets/${id}${qs}`);
    }
    /** Retrieves balance for a given wallet, optionally scoped by `assetId`. */
    getBalance(id, opts) {
        const qs = toQueryString(opts);
        return this.http.get(`/wallets/${id}/balance${qs}`);
    }
    /** Retrieves balances for a wallet (list). */
    getBalances(id, opts) {
        const qs = toQueryString(opts);
        return this.http.get(`/wallets/${id}/balances${qs}`);
    }
    /** Updates wallet metadata or settings. */
    updateWallet(id, body) {
        return this.http.patch(`/wallets/${id}`, body);
    }
    /** Initiates a block rescan for a wallet. */
    rescanBlocks(id, body) {
        return this.http.post(`/wallets/${id}/rescan/blocks`, body);
    }
    /** Triggers sweeping of unswept assets. */
    triggerSweepAssets(id, body) {
        return this.http.post(`/wallets/${id}/sweep/assets`, body);
    }
    /** Retrieves webhook logs for a wallet. */
    getWebhookLogs(id, opts) {
        const qs = toQueryString(opts);
        return this.http.get(`/wallets/${id}/webhooks${qs}`);
    }
    /** Retrieves a swap quote for the master wallet. */
    getSwapQuote(id, body) {
        return this.http.post(`/wallets/${id}/swaps/quote`, body);
    }
    /** Executes a swap from the master wallet. */
    executeSwap(id, body) {
        return this.http.post(`/wallets/${id}/swaps/execute`, body);
    }
    /** Retrieves the virtual account associated with a master wallet. */
    getVirtualAccount(id) {
        return this.http.get(`/wallets/${id}/virtual-accounts`);
    }
    /** Creates a virtual account within a master wallet. */
    createVirtualAccount(id, body) {
        return this.http.post(`/wallets/${id}/virtual-accounts`, body);
    }
    /** Updates a virtual account under a master wallet. */
    updateVirtualAccount(walletId, virtualAccountId, body) {
        return this.http.patch(`/wallets/${walletId}/virtual-accounts/${virtualAccountId}`, body);
    }
    /**
     * Calculates network fee for a prospective withdrawal.
     * Use POST; GET would return 404 for this route.
     */
    getWithdrawNetworkFee(id, body) {
        return this.http.post(`/wallets/${id}/withdraw/network-fee`, body);
    }
    /**
     * Initiates a withdrawal from the master wallet. Supports single or batch format.
     */
    withdraw(id, body) {
        return this.http.post(`/wallets/${id}/withdraw`, body);
    }
    /**
     * Signs a withdrawal without broadcasting, returning signed transactions per asset.
     */
    withdrawSignOnly(id, body) {
        return this.http.post(`/wallets/${id}/withdraw/sign`, body);
    }
    /** Estimates network fee for a custom smart contract call. */
    getContractNetworkFee(id, body) {
        return this.http.post(`/wallets/${id}/contracts/network-fee`, body);
    }
    /** Reads data from a custom smart contract. */
    readContract(id, body) {
        return this.http.post(`/wallets/${id}/contracts/read`, body);
    }
}
//# sourceMappingURL=Wallets.js.map
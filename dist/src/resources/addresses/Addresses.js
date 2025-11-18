import { toQueryString } from '../../utils/serialization';
/** Address-related operations under a wallet. */
export class Addresses {
    constructor(http) {
        this.http = http;
    }
    /**
     * Lists addresses for a wallet.
     * Optional pagination parameters can be supplied depending on server support.
     */
    getAddresses(walletId, opts) {
        return this.http.get(`/wallets/${walletId}/addresses${toQueryString(opts)}`);
    }
    /**
     * Generates a new internal address under a wallet.
     * Accepts optional configuration flags and metadata.
     */
    generateAddress(walletId, body) {
        return this.http.post(`/wallets/${walletId}/addresses`, body);
    }
    /**
     * Retrieves a specific address by ID, with optional `showPrivateKey` reveal.
     */
    getAddress(walletId, addressId, opts) {
        return this.http.get(`/wallets/${walletId}/addresses/${addressId}${toQueryString(opts)}`);
    }
    /**
     * Updates address metadata or settings. Supports enabling/disabling features and naming.
     */
    updateAddress(walletId, addressId, body) {
        return this.http.patch(`/wallets/${walletId}/addresses/${addressId}`, body);
    }
    /** Retrieves aggregate balance for an address (optionally filter by `assetId`). */
    getBalance(walletId, addressId, opts) {
        return this.http.get(`/wallets/${walletId}/addresses/${addressId}/balance${toQueryString(opts)}`);
    }
    /** Retrieves detailed balances for an address (list). */
    getBalances(walletId, addressId) {
        return this.http.get(`/wallets/${walletId}/addresses/${addressId}/balances`);
    }
    /**
     * Whitelists an external address under a wallet using policy configurations.
     */
    whitelistAddress(walletId, body) {
        return this.http.post(`/wallets/${walletId}/addresses/whitelist`, body);
    }
    /**
     * Removes an external address from whitelist.
     */
    unwhitelistAddress(walletId, addressId) {
        return this.http.del(`/wallets/${walletId}/addresses/whitelist/${addressId}`);
    }
    /**
     * Initiates a withdrawal from a child address under the wallet.
     * Supports single or batch format using the same body shape as master wallet.
     */
    withdraw(walletId, addressId, body) {
        return this.http.post(`/wallets/${walletId}/addresses/${addressId}/withdraw`, body);
    }
    /**
     * Signs a withdrawal from a child address without broadcasting.
     */
    withdrawSignOnly(walletId, addressId, body) {
        return this.http.post(`/wallets/${walletId}/addresses/${addressId}/withdraw/sign`, body);
    }
    /**
     * Calculates network fee for withdrawal from a child address.
     */
    getWithdrawNetworkFee(walletId, addressId, body) {
        return this.http.post(`/wallets/${walletId}/addresses/${addressId}/withdraw/network-fee`, body);
    }
}
//# sourceMappingURL=Addresses.js.map
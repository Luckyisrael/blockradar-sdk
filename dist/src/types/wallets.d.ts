export type Blockchain = {
    createdAt: string;
    derivationPath: string;
    id: string;
    isActive: boolean;
    isEvmCompatible: boolean;
    logoUrl: string;
    name: string;
    slug: string;
    symbol: string;
    tokenStandard: string | null;
    updatedAt: string;
};
export type Asset = {
    address: string;
    blockchain: Blockchain;
    createdAt: string;
    decimals: number;
    id: string;
    isActive: boolean;
    logoUrl: string;
    name: string;
    network: string;
    standard: string | null;
    symbol: string;
    updatedAt: string;
};
export type WalletAsset = {
    asset: Asset;
    createdAt: string;
    id: string;
    isActive: boolean;
    updatedAt: string;
};
export type WalletAnalytics = {
    currentBalance: number;
    numberOfAssets: number;
    unsweptBalance: number;
};
export type Wallet = {
    address: string;
    analytics: WalletAnalytics;
    assets: WalletAsset[];
    blockchain: Blockchain;
    createdAt: string;
    derivationPath: string;
    description: string;
    id: string;
    isActive: boolean;
    name: string;
    network: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
    updatedAt: string;
};
export type WalletBalance = {
    asset: WalletAsset;
    balance: string;
    convertedBalance: string;
};
export type WalletBalancesItem = WalletBalance;
export interface WebhookLog {
    id: string;
    event: string;
    status: "success" | "failed";
    attempts: number;
    reference: string;
    url: string;
    response: string | {
        status: number;
        text: string;
    };
    createdAt: string;
    updatedAt: string;
    payload: WebhookPayload;
}
/** Core Webhook Payload */
export interface WebhookPayload {
    address?: Record<string, unknown>;
    amlScreening?: AmlScreening | Record<string, unknown>;
    amount: string;
    amountPaid?: string;
    asset: WebhookAsset;
    blockchain: WebhookBlockchain;
    hash: string;
    status: string;
    type: "WITHDRAW" | "DEPOSIT" | string;
    wallet: WebhookWalletInfo;
}
/** Asset Info (SPL, ERC20, etc.) */
export interface WebhookAsset {
    name: string;
    symbol: string;
    address: string;
    decimals: number;
}
/** Blockchain info */
export interface WebhookBlockchain {
    name: string;
    slug: string;
    symbol: string;
}
/** AML Screening object (flexible based on provider) */
export interface AmlScreening {
    status?: string;
    riskScore?: number;
    provider?: string;
    details?: Record<string, unknown>;
}
/** Wallet Info contained inside webhook payload */
export interface WebhookWalletInfo {
    address: string;
    name?: string;
    network?: string;
}

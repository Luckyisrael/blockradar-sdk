import type { Blockchain, WalletBalance, WalletBalancesItem } from './wallets';
export type AddressConfigurations = {
    aml?: {
        message: string;
        provider: string;
        status: string;
    };
    disableAutoSweep?: boolean;
    enableGaslessWithdraw?: boolean;
    showPrivateKey?: boolean;
};
export type Address = {
    address: string;
    blockchain: Blockchain;
    configurations: AddressConfigurations;
    createdAt: string;
    derivationPath: string | null;
    id: string;
    isActive: boolean;
    metadata: Record<string, unknown> | null;
    name: string | null;
    network: string;
    type: 'INTERNAL' | 'EXTERNAL' | string;
    updatedAt: string;
};
export type AddressBalance = WalletBalance;
export type AddressBalancesItem = WalletBalancesItem;

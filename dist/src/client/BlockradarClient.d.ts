import { ClientConfig, Environment } from './config';
import { HttpClient } from './HttpClient';
import { Wallets } from '../resources/wallets/Wallets';
import { Addresses } from '../resources/addresses/Addresses';
/**
 * High-level SDK entrypoint. Manages environment/base URL and exposes resource modules.
 */
export declare class BlockradarClient {
    readonly config: Required<Pick<ClientConfig, 'apiKey'>> & {
        environment: Environment;
        baseUrl: string;
        timeoutMs: number;
    };
    readonly http: HttpClient;
    readonly wallets: Wallets;
    readonly addresses: Addresses;
    constructor(config: ClientConfig);
}

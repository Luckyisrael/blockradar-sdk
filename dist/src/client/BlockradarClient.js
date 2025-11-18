import { DEFAULT_BASE_URLS } from './config';
import { HttpClient } from './HttpClient';
import { Wallets } from '../resources/wallets/Wallets';
import { Addresses } from '../resources/addresses/Addresses';
/**
 * High-level SDK entrypoint. Manages environment/base URL and exposes resource modules.
 */
export class BlockradarClient {
    constructor(config) {
        const env = config.environment ?? 'test';
        const baseUrl = (config.baseUrl ?? DEFAULT_BASE_URLS[env]).replace(/\/+$/, '');
        const timeoutMs = config.timeoutMs ?? 30000;
        this.config = { apiKey: config.apiKey, environment: env, baseUrl, timeoutMs };
        this.http = new HttpClient(baseUrl, config.apiKey, timeoutMs, config.fetch);
        this.wallets = new Wallets(this.http);
        this.addresses = new Addresses(this.http);
    }
}
//# sourceMappingURL=BlockradarClient.js.map
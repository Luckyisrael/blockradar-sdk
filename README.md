# An Unofficial Blockradar TypeScript SDK

An un-official Type-safe SDK for the Blockradar REST API.

## Features
- Environment-aware client: `environment: 'live' | 'test'` and `baseUrl` override
- Auth via `x-api-key`
- Consistent JSON handling, timeouts, and error mapping
- Strongly typed responses and inputs for implemented endpoints
- Unit tests (Vitest) and integration test skeleton

## Implemented Endpoints
- Wallets
  - `GET /wallets/{walletId}` → `client.wallets.getWallet(id, { showPrivateKey? })`
  - `GET /wallets/{walletId}/balance` → `client.wallets.getBalance(id, { assetId? })`
  - `GET /wallets/{walletId}/balances` → `client.wallets.getBalances(id, { address?, asset_id? })`
  - `PATCH /wallets/{walletId}` → `client.wallets.updateWallet(id, { description?, name? })`
  - `POST /wallets/{walletId}/rescan/blocks` → `client.wallets.rescanBlocks(id, { transactionHash? })`
  - `POST /wallets/{walletId}/sweep/assets` → `client.wallets.triggerSweepAssets(id, { transactionId? })`
  - `GET /wallets/{walletId}/webhooks` → `client.wallets.getWebhookLogs(id, { page?, limit? })`
  - `POST /wallets/{walletId}/withdraw/network-fee` → `client.wallets.getWithdrawNetworkFee(id, body)`
  - `POST /wallets/{walletId}/withdraw` → `client.wallets.withdraw(id, body)` (single or batch)
  - `POST /wallets/{walletId}/withdraw/sign` → `client.wallets.withdrawSignOnly(id, body)`
- Addresses
  - `GET /wallets/{walletId}/addresses` → `client.addresses.getAddresses(walletId, { page?, limit? })`
  - `POST /wallets/{walletId}/addresses` → `client.addresses.generateAddress(walletId, body)`
  - `GET /wallets/{walletId}/addresses/{addressId}` → `client.addresses.getAddress(walletId, addressId, { showPrivateKey? })`
  - `PATCH /wallets/{walletId}/addresses/{addressId}` → `client.addresses.updateAddress(walletId, addressId, body)`
  - `GET /wallets/{walletId}/addresses/{addressId}/balance` → `client.addresses.getBalance(walletId, addressId, { assetId? })`
  - `GET /wallets/{walletId}/addresses/{addressId}/balances` → `client.addresses.getBalances(walletId, addressId)`
  - `POST /wallets/{walletId}/addresses/whitelist` → `client.addresses.whitelistAddress(walletId, body)`
  - `DELETE /wallets/{walletId}/addresses/whitelist/{addressId}` → `client.addresses.unwhitelistAddress(walletId, addressId)`
  - `POST /wallets/{walletId}/addresses/{addressId}/withdraw` → `client.addresses.withdraw(walletId, addressId, body)`
  - `POST /wallets/{walletId}/addresses/{addressId}/withdraw/sign` → `client.addresses.withdrawSignOnly(walletId, addressId, body)`
  - `POST /wallets/{walletId}/addresses/{addressId}/withdraw/network-fee` → `client.addresses.getWithdrawNetworkFee(walletId, addressId, body)`

## Installation
```
npm install blockradar-sdk
```

## Quickstart
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const wallet = await client.wallets.getWallet(process.env.BLOCKRADAR_WALLET_ID!)
console.log(wallet.message)
```

## Examples
- `examples/quickstart.ts` basic setup and get wallet
- `examples/wallets.ts` wallet operations, webhooks, withdraws
- `examples/addresses.ts` address CRUD, whitelist
- `examples/withdrawals.ts` withdraw network fee, single/batch, sign-only

## Testing
- Unit tests: `npm test`
- Integration: set `BLOCKRADAR_API_KEY_TEST` and `BLOCKRADAR_WALLET_ID`, optional `BLOCKRADAR_BASE_URL_TEST`

## Notes
- Use POST for network fee and sign-only routes; GET returns 404.
- Unauthorized returns `{"statusCode":401,"message":"Unauthorized"}`.

## Contributing
- Open PRs with tests and documentation.
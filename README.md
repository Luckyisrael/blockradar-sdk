# Blockradar TypeScript SDK

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
  - `POST /wallets/{walletId}/swaps/quote` → `client.wallets.getSwapQuote(id, body)`
  - `POST /wallets/{walletId}/swaps/execute` → `client.wallets.executeSwap(id, body)`
  - `GET /wallets/{walletId}/virtual-accounts` → `client.wallets.getVirtualAccount(id)`
  - `POST /wallets/{walletId}/virtual-accounts` → `client.wallets.createVirtualAccount(id, body)`
  - `PATCH /wallets/{walletId}/virtual-accounts/{id}` → `client.wallets.updateVirtualAccount(walletId, id, body)`
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
  - `POST /wallets/{walletId}/addresses/{addressId}/swaps/quote` → `client.addresses.getSwapQuote(walletId, addressId, body)`
  - `POST /wallets/{walletId}/addresses/{addressId}/swaps/execute` → `client.addresses.executeSwap(walletId, addressId, body)`
  - `GET /wallets/{walletId}/addresses/{addressId}/virtual-accounts` → `client.addresses.getVirtualAccount(walletId, addressId)`
  - `POST /wallets/{walletId}/addresses/{addressId}/virtual-accounts` → `client.addresses.createVirtualAccount(walletId, addressId, body)`
  - `PATCH /wallets/{walletId}/addresses/{addressId}/virtual-accounts/{virtualAccountId}` → `client.addresses.updateVirtualAccount(walletId, addressId, virtualAccountId, body)`

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
- `examples/swaps.ts` swap quote and execute

## Usage Examples

### Wallets
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const walletId = process.env.BLOCKRADAR_WALLET_ID!

const wallet = await client.wallets.getWallet(walletId)
console.log(wallet.data.name)

const fee = await client.wallets.getWithdrawNetworkFee(walletId, { assetId: 'ASSET_ID', address: 'RECIPIENT', amount: '1' })
console.log(fee.data.networkFee)

const va = await client.wallets.getVirtualAccount(walletId)
console.log(va.data.accountNumber)

const vaCreate = await client.wallets.createVirtualAccount(walletId, { email: 'user@example.com', firstname: 'First', lastname: 'Last', phone: '+2347000000000' })
console.log(vaCreate.statusCode)
```

### Addresses
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const walletId = process.env.BLOCKRADAR_WALLET_ID!

const created = await client.addresses.generateAddress(walletId, { name: 'Customer 1' })
const addressId = String(created.data.id)

const balance = await client.addresses.getBalance(walletId, addressId, { assetId: 'ASSET_ID' })
console.log(balance.data.balance)

const va2 = await client.addresses.getVirtualAccount(walletId, addressId)
console.log(va2.data.accountNumber)

const va2Create = await client.addresses.createVirtualAccount(walletId, addressId, { accountName: 'Customer', accountNumber: 'O157014963' })
console.log(va2Create.statusCode)
```

### Withdrawals
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const walletId = process.env.BLOCKRADAR_WALLET_ID!

const single = await client.wallets.withdraw(walletId, { assetId: 'ASSET_ID', address: 'RECIPIENT', amount: '1' })
console.log(single.statusCode)

const signed = await client.wallets.withdrawSignOnly(walletId, { assets: [{ id: 'ASSET_ID', address: 'RECIPIENT', amount: '0.5' }] })
console.log(signed.message)
```

### Swaps
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const walletId = process.env.BLOCKRADAR_WALLET_ID!

const quote = await client.wallets.getSwapQuote(walletId, { fromAssetId: 'FROM_ASSET_ID', toAssetId: 'TO_ASSET_ID', amount: '1000', order: 'RECOMMENDED' })
console.log(quote.data.rate)

const tx = await client.wallets.executeSwap(walletId, { fromAssetId: 'FROM_ASSET_ID', toAssetId: 'TO_ASSET_ID', amount: '1000', order: 'RECOMMENDED', reference: 'swap-01' })
console.log(tx.statusCode)
```

### Webhook Logs
```ts
import { BlockradarClient } from 'blockradar-sdk'

const client = new BlockradarClient({ apiKey: process.env.BLOCKRADAR_API_KEY!, environment: 'test' })
const walletId = process.env.BLOCKRADAR_WALLET_ID!

const logs = await client.wallets.getWebhookLogs(walletId, { page: 1, limit: 10 })
console.log(Array.isArray(logs.data) ? logs.data.length : 0)
```

## Testing
- Unit tests: `npm test`
- Integration: set `BLOCKRADAR_API_KEY_TEST` and `BLOCKRADAR_WALLET_ID`, optional `BLOCKRADAR_BASE_URL_TEST`

## Notes
- Use POST for network fee and sign-only routes; GET returns 404.
- Unauthorized returns `{"statusCode":401,"message":"Unauthorized"}`.

## Contributing
- Open PRs with tests and documentation.
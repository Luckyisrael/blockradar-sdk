import { BlockradarClient } from '../src'

async function main() {
  const apiKey = process.env.BLOCKRADAR_API_KEY_TEST || ''
  const walletId = process.env.BLOCKRADAR_WALLET_ID || ''
  const client = new BlockradarClient({ apiKey, environment: 'test' })

  const w = await client.wallets.getWallet(walletId)
  console.log('getWallet:', w.statusCode, w.message)

  const b = await client.wallets.getBalance(walletId)
  console.log('getBalance:', b.statusCode, b.message)

  const bs = await client.wallets.getBalances(walletId)
  console.log('getBalances:', bs.statusCode, bs.message)

  const fee = await client.wallets.getWithdrawNetworkFee(walletId, { assetId: 'ASSET_ID', address: 'RECIPIENT', amount: '1' })
  console.log('networkFee:', fee.data)

  const signed = await client.wallets.withdrawSignOnly(walletId, { assets: [{ id: 'ASSET_ID', address: 'RECIPIENT', amount: '0.5' }] })
  console.log('withdrawSignOnly:', signed.message)

  const logs = await client.wallets.getWebhookLogs(walletId, { page: 1, limit: 10 })
  console.log('webhooks:', Array.isArray(logs.data) ? logs.data.length : 0)
}

main()
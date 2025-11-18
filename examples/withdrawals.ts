import { BlockradarClient } from '../src'

async function main() {
  const apiKey = process.env.BLOCKRADAR_API_KEY_TEST || ''
  const walletId = process.env.BLOCKRADAR_WALLET_ID || ''
  const client = new BlockradarClient({ apiKey, environment: 'test' })

  const fee = await client.wallets.getWithdrawNetworkFee(walletId, { assetId: 'ASSET_ID', address: 'RECIPIENT', amount: '1' })
  console.log('network fee:', fee.data)

  const single = await client.wallets.withdraw(walletId, { assetId: 'ASSET_ID', address: 'RECIPIENT', amount: '1' })
  console.log('withdraw single:', single.message)

  const batch = await client.wallets.withdraw(walletId, { assets: [{ id: 'ASSET_ID', address: 'RECIPIENT', amount: '0.5' }] })
  console.log('withdraw batch:', batch.message)

  const sign = await client.wallets.withdrawSignOnly(walletId, { assets: [{ id: 'ASSET_ID', address: 'RECIPIENT', amount: '0.5' }] })
  console.log('sign only:', sign.message)
}

main()
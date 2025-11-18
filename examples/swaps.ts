import { BlockradarClient } from '../src'

async function main() {
  const apiKey = process.env.BLOCKRADAR_API_KEY_TEST || ''
  const walletId = process.env.BLOCKRADAR_WALLET_ID || ''
  const client = new BlockradarClient({ apiKey, environment: 'test' })

  const quote = await client.wallets.getSwapQuote(walletId, {
    fromAssetId: 'FROM_ASSET_ID',
    toAssetId: 'TO_ASSET_ID',
    amount: '1000',
    order: 'RECOMMENDED'
  })
  console.log('swap quote:', quote.data)

  const tx = await client.wallets.executeSwap(walletId, {
    fromAssetId: 'FROM_ASSET_ID',
    toAssetId: 'TO_ASSET_ID',
    amount: '1000',
    order: 'RECOMMENDED',
    reference: 'swap-01',
    metadata: { id: 1 }
  })
  console.log('swap execute:', tx.message)
}

main()
import { BlockradarClient } from '../src'

async function run() {
  const apiKey = process.env.BLOCKRADAR_API_KEY_TEST || 'YOUR_TEST_KEY'
  const walletId = process.env.BLOCKRADAR_WALLET_ID || 'YOUR_WALLET_ID'
  const client = new BlockradarClient({ apiKey, environment: 'test' })
  const wallet = await client.wallets.getWallet(walletId)
  console.log(wallet.message)
}

run()
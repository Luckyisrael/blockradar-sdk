import { BlockradarClient } from '../src'

async function main() {
  const apiKey = process.env.BLOCKRADAR_API_KEY_TEST || ''
  const walletId = process.env.BLOCKRADAR_WALLET_ID || ''
  const client = new BlockradarClient({ apiKey, environment: 'test' })

  const list = await client.addresses.getAddresses(walletId, { limit: 10 })
  console.log('addresses:', Array.isArray(list.data) ? list.data.length : 0)

  const created = await client.addresses.generateAddress(walletId, { name: 'Customer 1' })
  console.log('generate:', created.message)

  const addressId = created.data.id as string
  const one = await client.addresses.getAddress(walletId, addressId)
  console.log('getAddress:', one.message)

  const upd = await client.addresses.updateAddress(walletId, addressId, { enableGaslessWithdraw: true, name: 'Customer 2' })
  console.log('updateAddress:', upd.message)

  const wl = await client.addresses.whitelistAddress(walletId, { address: '0xabc', name: 'External address' })
  console.log('whitelist:', wl.message)

  const uwl = await client.addresses.unwhitelistAddress(walletId, wl.data.id as string)
  console.log('unwhitelist:', uwl.message)
}

main()
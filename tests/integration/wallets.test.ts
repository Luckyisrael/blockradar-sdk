import { describe, it, expect } from 'vitest'
import { BlockradarClient } from '../../src/client/BlockradarClient'

const apiKey = process.env.BLOCKRADAR_API_KEY_TEST
const baseUrl = process.env.BLOCKRADAR_BASE_URL_TEST

describe.skipIf(!apiKey)('Integration: Wallets', () => {
  it('fetches a wallet by id (requires env)', async () => {
    const client = new BlockradarClient({ apiKey: apiKey!, environment: 'test', baseUrl: baseUrl })
    await expect(client.wallets.getWallet('example-id')).resolves.toBeDefined()
  })
})
import { describe, it, expect } from 'vitest'
import { HttpClient } from '../src/client/HttpClient'
import { Wallets } from '../src/resources/wallets/Wallets'
import { Addresses } from '../src/resources/addresses/Addresses'

function makeFetch(body: unknown, status = 200, headers: Record<string, string> = { 'content-type': 'application/json' }) {
  return async () => ({
    status,
    ok: status >= 200 && status < 300,
    headers: new Headers(headers),
    json: async () => body,
    statusText: String(status)
  } as Response)
}

const okEnvelope = (data: unknown) => ({ statusCode: 200, message: 'ok', data })

describe('Swaps', () => {
  it('master wallet swap quote via POST', async () => {
    const fetch = makeFetch(okEnvelope({ amount: '999.2', rate: '0.99', transactionFee: 0 }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.getSwapQuote('wid', { fromAssetId: 'from', toAssetId: 'to', amount: '1000', order: 'RECOMMENDED' })
    expect(res.statusCode).toBe(200)
  })

  it('master wallet swap execute via POST', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'swapid', status: 'PENDING', type: 'SWAP' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.executeSwap('wid', { fromAssetId: 'from', toAssetId: 'to', amount: '1000', order: 'RECOMMENDED' })
    expect(res.statusCode).toBe(200)
  })

  it('child address swap quote via POST', async () => {
    const fetch = makeFetch(okEnvelope({ amount: '999.2', rate: '0.99', transactionFee: 0 }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.getSwapQuote('wid', 'aid', { fromAssetId: 'from', toAssetId: 'to', amount: '1000' })
    expect(res.statusCode).toBe(200)
  })

  it('child address swap execute via POST', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'swapid', status: 'PENDING', type: 'SWAP' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.executeSwap('wid', 'aid', { fromAssetId: 'from', toAssetId: 'to', amount: '1000' })
    expect(res.statusCode).toBe(200)
  })
})
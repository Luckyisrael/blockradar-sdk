import { describe, it, expect } from 'vitest'
import { HttpClient } from '../src/client/HttpClient'
import { Wallets } from '../src/resources/wallets/Wallets'

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

describe('Contracts', () => {
  it('network fee via POST', async () => {
    const fetch = makeFetch(okEnvelope({ balance: '1', fee: '0.001' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.getContractNetworkFee('wid', { address: '0x', method: 'transfer', parameters: ['0x', '1000'], abi: [] })
    expect(res.statusCode).toBe(200)
  })

  it('read via POST', async () => {
    const fetch = makeFetch(okEnvelope('59758238871801095'))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.readContract('wid', { address: '0x', method: 'totalSupply()', parameters: [], abi: [] })
    expect(res.statusCode).toBe(200)
  })
})
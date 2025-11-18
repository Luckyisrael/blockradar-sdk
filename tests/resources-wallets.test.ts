import { describe, it, expect } from 'vitest'
import { HttpClient } from '../src/client/HttpClient'
import { Wallets } from '../src/resources/wallets/Wallets'

function captureFetch() {
  const calls: string[] = []
  const f = async (url: string) => ({
    status: 200,
    ok: true,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: async () => ({ statusCode: 200, message: 'ok', data: {} }),
    statusText: '200'
  } as Response)
  return { fetch: f as unknown as typeof fetch, calls }
}

describe('Wallets', () => {
  it('calls getWallet path', async () => {
    const { fetch } = captureFetch()
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch)
    const wallets = new Wallets(http)
    const res = await wallets.getWallet('wid')
    expect(res.statusCode).toBe(200)
  })

  it('calls getWebhookLogs path', async () => {
    const { fetch } = captureFetch()
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch)
    const wallets = new Wallets(http)
    const res = await wallets.getWebhookLogs('wid', { page: 2, limit: 10 })
    expect(res.statusCode).toBe(200)
  })
})
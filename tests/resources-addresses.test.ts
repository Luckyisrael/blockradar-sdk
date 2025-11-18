import { describe, it, expect } from 'vitest'
import { HttpClient } from '../src/client/HttpClient'
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

describe('Addresses', () => {
  it('lists addresses', async () => {
    const fetch = makeFetch(okEnvelope([]))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.getAddresses('wid')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.data)).toBe(true)
  })

  it('generates an address', async () => {
    const fetch = makeFetch(okEnvelope({}))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.generateAddress('wid', { name: 'Customer 1' })
    expect(res.statusCode).toBe(200)
  })

  it('gets an address with showPrivateKey', async () => {
    const fetch = makeFetch(okEnvelope({}))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.getAddress('wid', 'aid', { showPrivateKey: false })
    expect(res.statusCode).toBe(200)
  })

  it('updates an address', async () => {
    const fetch = makeFetch(okEnvelope({}))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.updateAddress('wid', 'aid', { name: 'Customer 2', enableGaslessWithdraw: true })
    expect(res.statusCode).toBe(200)
  })

  it('whitelists and unwhitelists external address', async () => {
    const fetch = makeFetch(okEnvelope({}))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const wl = await addresses.whitelistAddress('wid', { address: '0xabc', name: 'External address' })
    expect(wl.statusCode).toBe(200)
    const uwl = await addresses.unwhitelistAddress('wid', 'external-id')
    expect(uwl.statusCode).toBe(200)
  })

  it('gets address balance and balances', async () => {
    const fetch = makeFetch(okEnvelope({}))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const b = await addresses.getBalance('wid', 'aid', { assetId: 'asset-id' })
    expect(b.statusCode).toBe(200)
    const bs = await addresses.getBalances('wid', 'aid')
    expect(bs.statusCode).toBe(200)
  })
})
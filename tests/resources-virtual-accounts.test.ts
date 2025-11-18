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
const createdEnvelope = (data: unknown) => ({ statusCode: 201, message: 'created', data })

describe('Virtual Accounts', () => {
  it('master wallet: get and create', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'va' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const getRes = await wallets.getVirtualAccount('wid')
    expect(getRes.statusCode).toBe(200)

    const fetchCreate = makeFetch(createdEnvelope({ id: 'va' }))
    const httpCreate = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetchCreate as unknown as typeof fetch)
    const walletsCreate = new Wallets(httpCreate)
    const createRes = await walletsCreate.createVirtualAccount('wid', { email: 'a@b.com', firstname: 'A', lastname: 'B', phone: '+2347000000000' })
    expect(createRes.statusCode).toBe(201)
  })

  it('master wallet: update', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'va', isActive: false }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.updateVirtualAccount('wid', 'va', { isActive: false, accountName: 'X', accountNumber: 'Y' })
    expect(res.statusCode).toBe(200)
  })

  it('child address: get and create', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'va' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const getRes = await addresses.getVirtualAccount('wid', 'aid')
    expect(getRes.statusCode).toBe(200)

    const fetchCreate = makeFetch(createdEnvelope({ id: 'va' }))
    const httpCreate = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetchCreate as unknown as typeof fetch)
    const addressesCreate = new Addresses(httpCreate)
    const createRes = await addressesCreate.createVirtualAccount('wid', 'aid', { accountName: 'N', accountNumber: '123' })
    expect(createRes.statusCode).toBe(201)
  })

  it('child address: update', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'va', isActive: true }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.updateVirtualAccount('wid', 'aid', 'va', { isActive: true, accountName: 'X', accountNumber: 'Y' })
    expect(res.statusCode).toBe(200)
  })
})
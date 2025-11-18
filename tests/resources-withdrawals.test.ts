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

describe('Withdrawals', () => {
  it('calculates master wallet network fee via POST', async () => {
    const fetch = makeFetch(okEnvelope({ nativeBalance: '0.1', networkFee: '0.00001' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.getWithdrawNetworkFee('wid', { assetId: 'aid', address: '0xabc', amount: '1' })
    expect(res.statusCode).toBe(200)
  })

  it('initiates master wallet withdraw (single)', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'txid', status: 'PENDING', amount: '1', amountPaid: '1', asset: {}, blockchain: {}, confirmed: false, createdAt: '', currency: 'USD', hash: '0x', metadata: null, network: 'testnet', note: null, reason: null, recipientAddress: '0x', senderAddress: '0x', type: 'WITHDRAW', updatedAt: '' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.withdraw('wid', { assetId: 'aid', address: '0xabc', amount: '1' })
    expect(res.statusCode).toBe(200)
  })

  it('sign-only withdraw returns success array', async () => {
    const fetch = makeFetch(okEnvelope({ errors: [], success: [] }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const wallets = new Wallets(http)
    const res = await wallets.withdrawSignOnly('wid', { assets: [{ id: 'aid', address: '0xabc', amount: '1' }] })
    expect(res.statusCode).toBe(200)
  })

  it('initiates child address withdraw', async () => {
    const fetch = makeFetch(okEnvelope({ id: 'txid' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.withdraw('wid', 'aid', { assets: [{ id: 'asset', address: '0xabc', amount: '0.5' }] })
    expect(res.statusCode).toBe(200)
  })

  it('sign-only child address withdraw', async () => {
    const fetch = makeFetch(okEnvelope({ errors: [], success: [] }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.withdrawSignOnly('wid', 'aid', { assets: [{ id: 'asset', address: '0xabc', amount: '0.5' }] })
    expect(res.statusCode).toBe(200)
  })

  it('child address network fee via POST', async () => {
    const fetch = makeFetch(okEnvelope({ nativeBalance: '0.1', networkFee: '0.00001' }))
    const http = new HttpClient('https://api.blockradar.co/v1', 'k', 1000, fetch as unknown as typeof fetch)
    const addresses = new Addresses(http)
    const res = await addresses.getWithdrawNetworkFee('wid', 'aid', { assetId: 'aid', address: '0xabc', amount: '1' })
    expect(res.statusCode).toBe(200)
  })
})
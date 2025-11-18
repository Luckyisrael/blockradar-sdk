import { describe, it, expect } from 'vitest'
import { HttpClient } from '../src/client/HttpClient'
import { SdkError } from '../src/types/errors'

function makeFetch(response: { status: number; headers?: Record<string, string>; body: unknown }) {
  return async () => ({
    status: response.status,
    ok: response.status >= 200 && response.status < 300,
    headers: new Headers(response.headers ?? { 'content-type': 'application/json' }),
    json: async () => response.body,
    statusText: String(response.status)
  } as Response)
}

describe('HttpClient', () => {
  it('parses JSON and returns data', async () => {
    const fetch = makeFetch({ status: 200, body: { statusCode: 200, message: 'ok', data: { x: 1 } } })
    const http = new HttpClient('https://example.com', 'key', 1000, fetch as unknown as typeof fetch)
    const res = await http.get('/test')
    expect((res as any).data.x).toBe(1)
  })

  it('throws on non-json content-type', async () => {
    const fetch = makeFetch({ status: 200, headers: { 'content-type': 'text/plain' }, body: 'hi' })
    const http = new HttpClient('https://example.com', 'key', 1000, fetch as unknown as typeof fetch)
    await expect(http.get('/test')).rejects.toBeInstanceOf(SdkError)
  })

  it('throws on API error statusCode', async () => {
    const fetch = makeFetch({ status: 200, body: { statusCode: 400, message: 'bad', data: {} } })
    const http = new HttpClient('https://example.com', 'key', 1000, fetch as unknown as typeof fetch)
    await expect(http.get('/test')).rejects.toBeInstanceOf(SdkError)
  })
})
import { SdkError } from '../types/errors'
import { defaultHeaders } from '../utils/headers'
import { authHeader } from './auth'

type RequestInitExtra = RequestInit & { timeoutMs?: number }

/** Minimal HTTP client wrapping `fetch` with JSON parsing and error mapping. */
export class HttpClient {
  private baseUrl: string
  private apiKey: string
  private timeoutMs: number
  private fetchImpl: typeof fetch
  constructor(baseUrl: string, apiKey: string, timeoutMs = 30000, fetchImpl?: typeof fetch) {
    this.baseUrl = baseUrl.replace(/\/+$/, '')
    this.apiKey = apiKey
    this.timeoutMs = timeoutMs
    this.fetchImpl = fetchImpl ?? fetch
  }
  /** Performs a request and returns the parsed JSON payload. */
  async request<T>(method: string, path: string, body?: unknown, init?: RequestInitExtra): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const headers = { ...defaultHeaders(), ...authHeader(this.apiKey) }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), init?.timeoutMs ?? this.timeoutMs)
    const res = await this.fetchImpl(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : null,
      signal: controller.signal
    })
    clearTimeout(timeout)
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      throw new SdkError('Unexpected content type', res.status, undefined, undefined, res)
    }
    const json = await res.json()
    const statusCode = json?.statusCode ?? res.status
    const message = json?.message ?? res.statusText
    if (!res.ok || (typeof statusCode === 'number' && statusCode >= 400)) {
      throw new SdkError(message, statusCode, undefined, json, res)
    }
    return json
  }
  /** Issues a GET request. */
  get<T>(path: string): Promise<T> { return this.request<T>('GET', path) }
  /** Issues a POST request. */
  post<T>(path: string, body?: unknown): Promise<T> { return this.request<T>('POST', path, body) }
  /** Issues a PATCH request. */
  patch<T>(path: string, body?: unknown): Promise<T> { return this.request<T>('PATCH', path, body) }
  /** Issues a DELETE request. */
  del<T>(path: string, body?: unknown): Promise<T> { return this.request<T>('DELETE', path, body) }
}
/** Defines the target API environment. */
export type Environment = 'live' | 'test'

/** Configuration used to instantiate the SDK client. */
export type ClientConfig = {
  /** API key for authenticating requests. */
  apiKey: string
  /** Target environment; defaults to `'test'`. */
  environment?: Environment
  /** Override the computed baseUrl; takes precedence over `environment`. */
  baseUrl?: string
  /** Request timeout in milliseconds; defaults to 30000. */
  timeoutMs?: number
  /** Optional custom `fetch` implementation. */
  fetch?: typeof globalThis.fetch
}

/** Default base URLs per environment. */
export const DEFAULT_BASE_URLS: Record<Environment, string> = {
  live: 'https://api.blockradar.co/v1',
  test: 'https://api.blockradar.co/v1'
}
import { describe, it, expect } from 'vitest'
import { BlockradarClient } from '../src/client/BlockradarClient'

describe('BlockradarClient environment', () => {
  it('defaults to test env', () => {
    const client = new BlockradarClient({ apiKey: 'k' })
    expect(client.config.environment).toBe('test')
  })
  it('honors baseUrl override', () => {
    const client = new BlockradarClient({ apiKey: 'k', baseUrl: 'https://custom' })
    expect(client.config.baseUrl).toBe('https://custom')
  })
})
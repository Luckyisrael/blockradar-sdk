/** Serializes a params object into a URL query string. */
export function toQueryString(params?: Record<string, unknown>): string {
  if (!params) return ''
  const usp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    usp.append(k, typeof v === 'string' ? v : String(v))
  })
  const s = usp.toString()
  return s ? `?${s}` : ''
}
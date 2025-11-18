/** Default JSON headers for all requests. */
export function defaultHeaders(): Record<string, string> {
  return { Accept: 'application/json', 'Content-Type': 'application/json' }
}
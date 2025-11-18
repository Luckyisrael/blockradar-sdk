/** Returns the API key header for Blockradar. */
export function authHeader(apiKey: string): Record<string, string> {
  return { 'x-api-key': apiKey }
}
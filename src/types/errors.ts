/** Error type thrown for HTTP or API-level failures. */
export class SdkError extends Error {
  statusCode: number
  code: string | undefined
  details: unknown | undefined
  response: Response | undefined
  constructor(message: string, statusCode: number, code?: string, details?: unknown, response?: Response | undefined) {
    super(message)
    this.name = 'SdkError'
    this.statusCode = statusCode
    if (code !== undefined) this.code = code
    if (details !== undefined) this.details = details
    this.response = response
  }
}
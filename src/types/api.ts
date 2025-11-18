/** Standard API envelope returned by Blockradar endpoints. */
export type ApiResponse<T> = {
  statusCode: number
  message: string
  data: T
  meta?: Record<string, unknown>
}

/** Common pagination shape supported by list endpoints. */
export type Pagination = {
  page?: number
  limit?: number
  cursor?: string
  nextCursor?: string | null
}
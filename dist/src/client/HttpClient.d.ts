type RequestInitExtra = RequestInit & {
    timeoutMs?: number;
};
/** Minimal HTTP client wrapping `fetch` with JSON parsing and error mapping. */
export declare class HttpClient {
    private baseUrl;
    private apiKey;
    private timeoutMs;
    private fetchImpl;
    constructor(baseUrl: string, apiKey: string, timeoutMs?: number, fetchImpl?: typeof fetch);
    /** Performs a request and returns the parsed JSON payload. */
    request<T>(method: string, path: string, body?: unknown, init?: RequestInitExtra): Promise<T>;
    /** Issues a GET request. */
    get<T>(path: string): Promise<T>;
    /** Issues a POST request. */
    post<T>(path: string, body?: unknown): Promise<T>;
    /** Issues a PATCH request. */
    patch<T>(path: string, body?: unknown): Promise<T>;
    /** Issues a DELETE request. */
    del<T>(path: string, body?: unknown): Promise<T>;
}
export {};

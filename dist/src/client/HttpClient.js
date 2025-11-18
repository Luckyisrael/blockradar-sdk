import { SdkError } from '../types/errors';
import { defaultHeaders } from '../utils/headers';
import { authHeader } from './auth';
/** Minimal HTTP client wrapping `fetch` with JSON parsing and error mapping. */
export class HttpClient {
    constructor(baseUrl, apiKey, timeoutMs = 30000, fetchImpl) {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
        this.apiKey = apiKey;
        this.timeoutMs = timeoutMs;
        this.fetchImpl = fetchImpl ?? fetch;
    }
    /** Performs a request and returns the parsed JSON payload. */
    async request(method, path, body, init) {
        const url = `${this.baseUrl}${path}`;
        const headers = { ...defaultHeaders(), ...authHeader(this.apiKey) };
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), init?.timeoutMs ?? this.timeoutMs);
        const res = await this.fetchImpl(url, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : null,
            signal: controller.signal
        });
        clearTimeout(timeout);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            throw new SdkError('Unexpected content type', res.status, undefined, undefined, res);
        }
        const json = await res.json();
        const statusCode = json?.statusCode ?? res.status;
        const message = json?.message ?? res.statusText;
        if (!res.ok || (typeof statusCode === 'number' && statusCode >= 400)) {
            throw new SdkError(message, statusCode, undefined, json, res);
        }
        return json;
    }
    /** Issues a GET request. */
    get(path) { return this.request('GET', path); }
    /** Issues a POST request. */
    post(path, body) { return this.request('POST', path, body); }
    /** Issues a PATCH request. */
    patch(path, body) { return this.request('PATCH', path, body); }
    /** Issues a DELETE request. */
    del(path, body) { return this.request('DELETE', path, body); }
}
//# sourceMappingURL=HttpClient.js.map
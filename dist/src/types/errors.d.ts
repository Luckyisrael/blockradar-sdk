/** Error type thrown for HTTP or API-level failures. */
export declare class SdkError extends Error {
    statusCode: number;
    code: string | undefined;
    details: unknown | undefined;
    response: Response | undefined;
    constructor(message: string, statusCode: number, code?: string, details?: unknown, response?: Response | undefined);
}

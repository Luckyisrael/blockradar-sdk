/** Error type thrown for HTTP or API-level failures. */
export class SdkError extends Error {
    constructor(message, statusCode, code, details, response) {
        super(message);
        this.name = 'SdkError';
        this.statusCode = statusCode;
        if (code !== undefined)
            this.code = code;
        if (details !== undefined)
            this.details = details;
        this.response = response;
    }
}
//# sourceMappingURL=errors.js.map
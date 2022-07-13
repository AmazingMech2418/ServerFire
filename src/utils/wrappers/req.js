class Request {
    constructor(req) {
        this.raw = req;
    }

    getHeader(header) {
        return this.raw.headers[header];
    }

    getHeaders() {
      return this.raw.headers;
    }

    get method() {
        return this.raw.method;
    }

    get url() {
        return new URL(this.raw.url,  `http://${this.raw.headers.host}`);
    }

    get status() {
        return {
            code: this.raw.statusCode,
            message: this.raw.statusMessage
        };
    }

    // Backwards Compatibility
    get headers() {
      return this.raw.headers;
    }
}

module.exports = Request;

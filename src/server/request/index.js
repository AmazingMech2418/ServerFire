class Request {
  constructor(req) {
    this.req = req;
  }
  get body() {
    return this.req.body;
  }
  getHeader(header) {
    return this.req.headers[header];
  }
  get method() {
    return this.req.method;
  }
  get url() {
    return new URL(this.req.url, `http://${this.req.headers.host}`);
  }
  get status() {
    return {
      code: this.req.statusCode,
      message: this.req.statusMessage
    };
  }
  get headers() {
    return this.req.headers;
  }
}
module.exports = Request;
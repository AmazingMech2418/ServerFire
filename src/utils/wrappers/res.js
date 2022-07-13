const fs = require("fs");

class Response {
    constructor(res) {
        this.raw = res;
        this.content = "";
    }

    send(data) {
        this.content += data;
    }

    sendFile(path) {
        this.content = fs.readFileSync(path);
    }

    sendJSON(data) {
        this.content = JSON.stringify(data);
        this.raw.setHeader("Content-Type", "application/json");
    }

    setHeader(header, value) {
        this.raw.setHeader(header, value);
    }

    setMime(type) {
        this.raw.setHeader("Content-Type", type);
    }

    getHeaders() {
        return this.raw.getHeaders();
    }

    setStatusCode(code) {
        this.raw.writeHead(code);
    }

    finish() {
        this.raw.write(this.content);
        this.raw.end();
    }
}

module.exports = Response;

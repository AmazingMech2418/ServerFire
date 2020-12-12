const http = require('http');
const Response = require('./response/index.js');

class Server {
  constructor() {
    this.utils = [];
    this.server;
    this.code = (req, res) => {
      let body = '';
      req.on('data', chunk => {
        //console.log('chunk');
        body += chunk;
      });
      req.on('end', () => {
        const _req = Object.assign({}, req);
        let data = {
          req: Object.assign(_req, {body: body}),
          res: res,
          head: {}
        };
        this.utils.forEach(util => {
          data = util(data);
        });
      });
    };
  }
  use(fn) {
    this.utils.push(fn);
  }
  create() {
    this.server = http.createServer(this.code);
  }
  listen(port = 3000) {
    this.server.listen(port);
  }
}

module.exports = Server;
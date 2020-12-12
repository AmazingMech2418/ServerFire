const {generate} = require('../src/server/middleware-tools/gen.js');

module.exports = generate((req, _res, head) => {
  _res.setHeader("Access-Control-Allow-Origin", "*");
  _res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return {
    req: req,
    res: _res,
    head: head
  }
});
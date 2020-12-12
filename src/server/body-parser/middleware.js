const {generate, package} = require('../middleware-tools/gen.js');
const parse = require('./parser.js');

module.exports = generate((req, res, head) => {
  const _req = req;
  _req.body = parse(_req.body);
  return {
    req: _req,
    res: res,
    head: head
  }
});
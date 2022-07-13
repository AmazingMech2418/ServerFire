const {generate, package} = require('./middleware.js');
const parse = require('../body-parser.js');

module.exports = generate((req, res) => {
  const _req = req;
  _req.body = parse(_req.body);
  return {
    req: _req,
    res: res
  }
});

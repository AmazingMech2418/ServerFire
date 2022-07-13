const {generate} = require("../src/utils/middleware/middleware.js");

module.exports = generate((req, _res) => {
  _res.setHeader("Access-Control-Allow-Origin", "*");
  _res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  return {
    req: req,
    res: _res
  };
});

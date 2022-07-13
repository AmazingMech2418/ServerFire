const Server = require("./src/server.js");
const bp = require("./src/utils/middleware/body-parser.js");
const Router = require("./src/utils/router/router.js");
const route = require("./src/utils/router/route.js");
const {generate, genAsync} = require("./src/utils/middleware/middleware.js");
const cors = require("./tools/cors.js");

module.exports = {
  Server: Server,
  bodyparser: bp,
  Router: Router,
  route: route,
  generateMiddleware: generate,
  genMiddlewareAsync: genAsync,
  tools: {
    cors: cors
  }
};

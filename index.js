const Server = require('./src/server/index.js');
const bodyparser = require('./src/server/body-parser/middleware.js');
const Router = require('./src/server/router/router.js');
const route = require('./src/server/router/route.js');
const {generate} = require('./src/server/middleware-tools/gen.js');

module.exports = {
  Server: Server,
  bodyparser: bodyparser,
  Router: Router,
  route: route,
  generateMiddleware: generate,
  tools: {
    cors: require('./tools/cors.js')
  }
};
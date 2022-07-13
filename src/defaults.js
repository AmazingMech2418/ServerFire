const wrap = require("./utils/wrapper.js");
const bp = require("./utils/middleware/body-parser.js");

function addDefaults(server) {
    server.use(wrap);
    server.use(bp);
}

module.exports = addDefaults;

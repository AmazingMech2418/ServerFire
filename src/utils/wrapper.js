const Request = require("./wrappers/req.js");
const Response = require("./wrappers/res.js");

function wrap(data) {
    return {res: new Response(data.res), req: new Request(data.req)};
}

module.exports = wrap;

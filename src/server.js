const http = require("http");
const addDefaults = require("./defaults.js");

class Server {
    constructor() {
        this.utils = [];
        this.server;
        this.code = (req, res) => {
            (async() => {
                let data = {req: req, res: res};
                for(let util of this.utils) {
                    let utilRes;
                    if(util.constructor.name == "AsyncFunction") {
                        utilRes = await util(data);
                    } else {
                        utilRes = util(data);
                    }
                    data = Object.assign(Object.assign({}, data), utilRes);
                }
            })();
        }

        addDefaults(this);
    }

    use(util) {
        this.utils.push(util);
    }

    create() {
        this.server = http.createServer(this.code);
    }

    getCode() {
        return this.code;
    }

    listen(port) {
        this.server.listen(port);
    }
}

module.exports = Server;

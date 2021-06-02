const Response = require('../response/index.js');
const Request = require('../request/index.js');
const {generate, package} = require('../middleware-tools/gen.js');
const {compare, compareWithParams, compareBases} = require('./url-tools/compare.js');

function generateRoute(router) {
  const route = generate((req, res, head) => {
    const response = new Response(res)
    const request = new Request(req)
    const paths = router.paths;
    const statics = router.statics;
    let asynchronous = false;
    let found = false;
    paths.forEach(path => {
      if(request.method == path.method) {
        if(compare(request.req.url, path.path)) {
          found = true;
          if(path.asynchronous) {
            asynchronous = true;
          }
          if(path.fn(request, response) == "ERR")
            found = false;
        } else if(compareWithParams(path.path, request.req.url, request)) {
          found = true;
          if(path.asynchronous) {
            asynchronous = true;
          }
          if(path.fn(request, response) == "ERR")
            found = false;
        };
      }
    });
    if(!found) {
      statics.forEach(path => {
        //path.path
        if(compareBases(path.path, request.req.url)) {
          let part = decodeURIComponent(require('path').normalize(request.req.url).replace(path.path, ''));
          if(path.file[path.file.length - 1] != '/' && part[0] != '/')
            part = '/' + part;
          try {
            if(require('fs').lstatSync(path.file + part).isFile()) {
              response.sendFile(path.file + part);
              found = true;
            } else if(require('fs').existsSync(path.file + part + 'index.html') && require('fs').lstatSync(path.file + part + 'index.html').isFile()) {
              response.sendFile(path.file + part + 'index.html');
              found = true;
            } else if(require('fs').existsSync(path.file + part + '/index.html') && require('fs').lstatSync(path.file + part + '/index.html').isFile()) {
              response.send(`<script>location.assign("${part + '/'}")</script>`);
              found = true;
            } else {
              response.send("Cannot find file " + path.file + part);
              found = true;
            }
          } catch(e) {
            // Nothing...
          }
        }
      });
    }
    if(!found) {
      response.send(`Cannot ${request.method} ${request.req.url}`);
    }
    if(!asynchronous) {
      response.finish();
    }
    return {
      req: req,
      res: res,
      head: head
    };
  });
  return route;
}

module.exports = generateRoute;

const fs = require("fs");

const Response = require('../wrappers/res.js');
const Request = require('../wrappers/req.js');
const {genAsync, package} = require('../middleware/middleware.js');
const {compare, compareWithParams, compareBases} = require('./url-tools/compare.js');

function generateRoute(router) {
  const route = genAsync(async (req, res) => {
    const paths = router.paths;
    const statics = router.statics;

    let found = false;
    for(const path of paths) {
      if(req.method == path.method) {
        if(compare(req.raw.url, path.path)) {
          found = true;

          try {
            if(path.fn.constructor.name == "AsyncFunction") {
                await path.fn(req, res);
            } else {
                path.fn(req, res);
            }
          } catch(e) {
            found = false;
          }
        } else if(compareWithParams(path.path, req.raw.url, req)) {
          found = true;

          try {
            if(path.fn.constructor.name == "AsyncFunction") {
                await path.fn(req, res);
            } else {
                path.fn(req, res);
            }
          } catch(e) {
            found = false;
          }
        }
      }
    }
    if(!found) {
      statics.forEach(path => {
        //path.path
        if(compareBases(path.path, req.raw.url)) {
          let part = decodeURIComponent(require('path').normalize(req.raw.url).replace(path.path, ''));
          if(path.file[path.file.length - 1] != '/' && part[0] != '/')
            part = '/' + part;
          try {
            if(fs.lstatSync(path.file + part).isFile()) {
              res.sendFile(path.file + part);
              found = true;
            } else if(fs.existsSync(path.file + part + 'index.html') && fs.lstatSync(path.file + part + 'index.html').isFile()) {
              res.sendFile(path.file + part + 'index.html');
              found = true;
            } else if(fs.existsSync(path.file + part + '/index.html') && fs.lstatSync(path.file + part + '/index.html').isFile()) {
              res.send(`<script>location.assign("${part + '/'}")</script>`);
              found = true;
            } else {
              res.send("Cannot find file " + path.file + part);
              found = true;
            }
          } catch(e) {
            // Nothing...
          }
        }
      });
    }
    if(!found) {
      res.send(`Cannot ${req.method} ${req.raw.url}`);
    }


    res.finish();
    return {
      req: req,
      res: res
    };
  });
  return route;
}

module.exports = generateRoute;

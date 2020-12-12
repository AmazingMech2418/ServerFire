const {normalize} = require('path');

class Router {
  constructor() {
    this.paths = [];
    this.statics = [];
  }
  _addPath(method, path, fn, asynchronous) {
    this.paths.push({
      method: method,
      path: path,
      fn: fn,
      asynchronous: asynchronous
    });
  }
  get(path, fn, asynchronous=false) {
    this._addPath('GET', path, fn, asynchronous);
  }
  post(path, fn, asynchronous=false) {
    this._addPath('POST', path, fn, asynchronous);
  }
  all(path, fn, asynchronous=false) {
    this.get(path, fn, asynchronous);
    this.post(path, fn, asynchronous);
  }
  static(path, file) {
    if(normalize(path)[0] != '/' || normalize(file)[0] != '/') {
      console.error(new Error("Static path must be absolute"));
      return false;
    }
    this.statics.push({
      path: normalize(path),
      file: normalize(file)
    });
    return true;
  }
}

module.exports = Router;
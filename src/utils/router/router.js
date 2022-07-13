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
      fn: fn
    });
  }
  get(path, fn) {
    this._addPath('GET', path, fn);
  }
  post(path, fn) {
    this._addPath('POST', path, fn);
  }
  all(path, fn) {
    this.get(path, fn);
    this.post(path, fn);
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

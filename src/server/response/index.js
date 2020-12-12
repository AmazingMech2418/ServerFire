const fs = require('fs');

const mime = require('./mime/index.js');


class Response {
  constructor(res) {
    this.res = res;
    this.content = '';
    this.mime = 'text/plain';
    this.fileTemp = '';
    this.check = true;
  }
  send(data) {
    this.content += String(data);
    this.mime = {lookup: 'content'};
  }
  sendFile(path) {
    this.content = fs.readFileSync(path);
    this.mime = {lookup: 'file'};
    this.fileTemp = path;
  }
  sendJSON(data) {
    this.content = JSON.stringify(data);
    this.mime = 'application/json';
  }
  setHeader(header, value) {
    this.res.setHeader(header, value);
    if(header == 'Content-Type') {
      this.check = false;
    }
  }
  finish() {
    if(this.check){
      if(typeof(this.mime) == 'object' && "lookup" in this.mime) {
        if(this.mime.lookup == 'content') {
          mime.string(this.content, (data) => {
            this.res.setHeader('Content-Type', data);
            this.res.write(this.content);
            this.res.end();
          })
        } else {
          mime.file(this.fileTemp, (data) => {
            this.res.setHeader('Content-Type',  data);
            this.res.write(this.content);
            this.res.end();
          })
        }
      } else {
        this.res.setHeader('Content-Type', this.mime);
        this.res.write(this.content);
        this.res.end();
      }
    } else {
      this.res.write(this.content);
      this.res.end();
    }
  }
}

module.exports = Response;
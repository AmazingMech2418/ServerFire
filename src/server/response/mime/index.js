const FileType = require('../../../../lib/file-type.js');
const fs = require('fs');
const isHTML = require('../../../../lib/is-html.js');


const extensions = {
  js: 'application/javascript',
  css: 'text/css',
  html: 'text/html',
  xml: 'text/xml'
};

function mimeTypeFromFile(filePath, callback){
  (async () => {
    //let data = await FileType.fromFile(filePath);
    let data = FileType.fromFile(filePath);
    if(data == undefined) {
      const ext = filePath.split('.')[filePath.split('.').length - 1];
      if(ext in extensions) {
        callback(extensions[ext]);
      } else {
        callback(isHTML(fs.readFileSync(filePath))?'text/html':'text/plain');
      }
    } else {
      callback(data.mime);
    }
  })();
}

function mimeTypeFromString(str, callback){
  const buffer = Buffer.from(str);
  (async () => {
    //let data = await FileType.fromBuffer(buffer);
    let data = FileType.fromBuffer(buffer);
    if(data == undefined) {
      callback(isHTML(str)?'text/html':'text/plain');
    } else {
      callback(data.mime);
    }
  })();
}

module.exports = {
  file: mimeTypeFromFile,
  string: mimeTypeFromString
};
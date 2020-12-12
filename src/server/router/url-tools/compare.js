const {normalize} = require('path');


const getPathArray = path => path.split('/').filter(n=>n.length>0);

const compare = (path1, path2) => getPathArray(path1).join('/') == getPathArray(path2).join('/');

function compareWithParams(path1, path2, req) {
  let path = getPathArray(path1);
  let params = [];
  for(let i in path) {
    if(path[i].includes('$')) {
      params.push(path[i].slice(path[i].indexOf('$')+1));
      path[i] = path[i].slice(0, path[i].indexOf('$'))+'$';
    }
  }
  let cmpPath = getPathArray(path2);
  if(cmpPath.length != path.length)
    return false;
  let paramID = 0;
  let results = {};
  for(let i in cmpPath) {
    if(path[i].includes('$')) {
      let before = cmpPath[i].slice(0, path[i].indexOf('$'))+'$';
      if(before != path[i])
        return false
      let after = cmpPath[i].slice(path[i].indexOf('$'));
      results[params[paramID]] = after;
      paramID++;
    } else {
      if(path[i] != cmpPath[i])
        return false;
    }
  }
  if(!req.urlParams) {
    req.urlParams = {};
  }
  for(let i in results) {
    req.urlParams[i] = results[i];
  }
  return true;
}

function compareBases(baseDir, fullDir) {
  let base = getPathArray(normalize(baseDir));
  let full = getPathArray(normalize(fullDir));
  if(full.length < base.length)
    return false;
  for(let i in base) {
    if(full[i] != base[i])
      return false;
  }
  return true;
}


/*
let testReq = {};
console.log(compareWithParams("/users/$username/projects/$projectID/", "/users/Test/projects/2123", testReq), testReq);*/


module.exports = {compare: compare, compareWithParams: compareWithParams, compareBases: compareBases};
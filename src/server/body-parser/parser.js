let qs = {};//require('qs');
//let qs = require('qs');
qs.parse = require('../../../lib/qs.js');//require('qs');

function parse(data,log=false) {
  try {
    return JSON.parse(data);
  } catch (err) {
    if(log) {
      console.log('Not JSON');
    }
  }
  try {
    return qs.parse(data);
  } catch (err) {
    if(log) {
      console.log('Not urlencoded');
    }
  }
  try {
    return qs.parse(data.toString());
  } catch (err) {
    if(log) {
      console.log('Not buffer urlencoded');
    }
  }
  try {
    return data.toString();
  } catch (err) {
    if(log) {
      console.log('Not buffer');
    }
  }
  try {
    return data;
  } catch (err) {
    if(log) {
      console.log('Not txt');
    }
  }
  return {};
}

module.exports = parse;
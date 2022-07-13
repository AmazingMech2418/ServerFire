const objkeys = Object.getOwnPropertyNames(Object.prototype);
const arrkeys = Object.getOwnPropertyNames(Array.prototype);
function processData(__data){
  if (!__data || __data.length < 1) return {};
  let d = {}, keys = __data.map(n=>n[0]), data = __data.map(n=>n[1]);
  for (let i = 0; i < keys.length; i++) {
    let current = d;
    let keyParts = keys[i].split('[').join('.').split(']').join('').split('.');

    for (let j = 0; j < keyParts.length; j++){
      let k = keyParts[j];

      if (objkeys.includes(k) || (arrkeys.includes(k) && Array.isArray(current)))
        continue;

      if (j >= keyParts.length - 1)
        if(Array.isArray(current))
          current.push(data[i]);
        else
          current[k] = data[i];
      else {
        if (!current[k]) current[k] = !isNaN(keyParts[j + 1])?[]:{};
        current = current[k];
      }
    }
  }
  return d;
};
function parse(data) {
  let d = decodeURIComponent(data).split('&').map(n=>n.split('='));

  return processData(d);
}

module.exports = parse;

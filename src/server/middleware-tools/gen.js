function genMiddleware(fn) {
  return data => fn(data.req, data.res, data.head);
}

const package = (req, res, head) => {return {
  req: req,
  res: res,
  head: head
}};

module.exports = {
  generate: genMiddleware,
  package: package
};
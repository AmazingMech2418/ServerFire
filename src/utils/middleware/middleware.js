function genMiddleware(fn) {
    return data => fn(data.req, data.res);
}

function genMiddlewareAsync(fn) {
    return async data => await fn(data.req, data.res);
}

const package = (req, res, head) => {return {
    req: req,
    res: res
}};

module.exports = {
  generate: genMiddleware,
  genAsync: genMiddlewareAsync,
  package: package
};

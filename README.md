# AdminServer

Welcome to AdminServer, a powerful and lightweight server library!

## The Current Stage

AdminServer is not yet entirely complete. There are still many things that need to be done, including adding middleware for things such as database management and admin controls to help you better keep track of your websites and servers. However, AdminServer is still currently a fully-functioning server library with zero dependencies!

## Basic Setup


The following code enables you to create a very basic setup for a server and the server in fact does nothing, but this is the shell of your server code.
```js
// Import required components from AdminServer
const {Server, bodyparser, Router, route, generateMiddleware, tools} = require('adminserver');

// Create router middleware
const router = new Router();
const r = route(router);

// Create server
const server = new Server();
server.create();

// Add CORS; ideal for API development
server.use(tools.cors);
// Add bodyparser for parsing POST requests
server.use(bodyparser);
// Include router in server
server.use(r);

// Start server
server.listen(3000);
```


If you would like to use Socket.io or any other similar packages, you can also read the server object directly from `server.server` in this setup!


## Direct Requests

Using the same setup, you can also use direct request handlers as is seen with these examples:
```js
// GET request
router.get('/test', (req, res) => {
  // Sends text
  res.send('Testing, testing, 1, 2, 3');
});

// POST request
router.post('/postTest', (req, res) => {
  // Sends JSON
  res.sendJSON(req.body);
  console.log(req.body);
});
```

### URL Parameters

You can also add in URL parameters as is seen in this example:
```js
// GET request for file path format /<username>/profile/
// The "$" denotes a URL parameter
router.get('/$username/profile', (req, res) => {
  res.send('Profile reached for '+req.urlParams.username);
});
```

## Static Paths
In addition to direct paths, you can also add static paths where every file in a given directory will be sent to the server. For example:
```js
router.static('/', __dirname + '/public');
```
This will push everything in the public directory to the root directory.


More information will be provided in the official documentation, including how to create middleware and more!






Thank you for choosing AdminServer to start up your website!
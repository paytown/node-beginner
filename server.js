const http = require('http');

// SERVER WITH CALLBACKS
function onRequest(req, res) {
  console.log('Request received');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello again');
  res.end();
}

http.createServer(onRequest).listen(8888);

console.log('Server has started');


// SIMPLE SERVER CODE
// http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Hello');
//   res.end();
// }).listen(8888);

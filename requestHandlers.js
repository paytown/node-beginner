const querystring = require('querystring');
const fs = require('fs');

function start(res, postData) {
  console.log('Request handler \'start\' was called.');

  const body = `
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html"
      <title>File Upload</title>
    </head>
    <body>
      <form action="/upload" method="post">
        <textarea name="text" rows="20" cols="60"></textarea>
        <input type="submit" value="submit text" />
      </form>
    </body>
  </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function upload(res, postData) {
  console.log('Request handler \'upload\' was called.');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Submitted: ' + querystring.parse(postData).text);
  res.end();
}

function show(res) {
  console.log('Request handler \'show\' was called');
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  fs.createReadStream('./tmp/test.jpg').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;

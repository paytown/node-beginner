const fs = require('fs');
const formidable = require('formidable');

function start(res) {
  console.log('Request handler \'start\' was called.');

  const body = `
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html"
      <title>File Upload</title>
    </head>
    <body>
      <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="upload" multiple="multiple">
        <input type="submit" value="Upload a file" />
      </form>
    </body>
  </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('Request handler \'upload\' was called.');

  const form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, (error, fields, files) => {
    console.log('parsed');

    fs.rename(files.upload.path, 'tmp/test.jpg', (error) => {
      if(error) {
        fs.unlink('/tmp/test.jpg');
        fs.rename(files.upload.path, '/tmp/test.jpg');
      }
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('received image: <br> <img src="/show">');
    res.end();
  });
}

function show(res) {
  console.log('Request handler \'show\' was called');
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  fs.createReadStream('./tmp/test.jpg').pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;

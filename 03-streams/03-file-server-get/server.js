const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if (pathname.split('/').length > 1) {
        res.statusCode = 400;
        res.end();
      }

      if (!fs.existsSync(filepath)) {
        res.statusCode = 404;
        res.end();
      }

      const fileStream = fs.createReadStream(filepath);

      fileStream.pipe(res);

      fileStream.on('error', () => {
        res.statusCode = 500;
        res.end();
      });

      req.on('close', () => {
        fileStream.destroy();
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;

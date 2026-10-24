import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Security check: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let fullPath = path.join(__dirname, safePath);

  // Helper to serve a file
  function serveFile(filePath) {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested page was not found. <a href="/">Return Home</a></p></body></html>`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
      });

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  }

  // Check if target is a file or directory
  fs.stat(fullPath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      const indexFile = path.join(fullPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        serveFile(indexFile);
        return;
      }
    }

    if (!err && stats.isFile()) {
      serveFile(fullPath);
      return;
    }

    // Try appending .html (clean URLs like /about -> about.html)
    if (fs.existsSync(fullPath + '.html')) {
      serveFile(fullPath + '.html');
      return;
    }

    // Try /index.html if path ends with / or directory exists
    const tryIndex = path.join(fullPath, 'index.html');
    if (fs.existsSync(tryIndex)) {
      serveFile(tryIndex);
      return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested page was not found. <a href="/">Return Home</a></p></body></html>`);
  });
});

let currentPort = parseInt(PORT, 10);

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n🚀 VillagKart Web Server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop.\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${currentPort} is currently in use. Trying port ${currentPort + 1}...`);
    currentPort += 1;
    setTimeout(() => {
      startServer(currentPort);
    }, 500);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);

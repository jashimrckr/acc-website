const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jfif': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(__dirname, reqPath);

    fs.stat(filePath, (err, stats) => {
        // If file doesn't exist, check if appending .html works (e.g. /about -> /about.html)
        if (err || !stats.isFile()) {
            if (!path.extname(filePath)) {
                const htmlPath = filePath + '.html';
                if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
                    return serveFile(htmlPath, 200, res);
                }
            }

            // For missing static media/asset requests, return a plain 404 response
            const ext = path.extname(reqPath).toLowerCase();
            const staticAssetExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.jfif', '.svg', '.ico', '.woff2', '.xml', '.json'];
            if (staticAssetExtensions.includes(ext)) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('404 Not Found');
                return;
            }

            // For missing pages or invalid URLs, serve 404.html with HTTP status 404
            const notFoundPath = path.join(__dirname, '404.html');
            if (fs.existsSync(notFoundPath)) {
                return serveFile(notFoundPath, 404, res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end('404 Not Found');
                return;
            }
        }

        serveFile(filePath, 200, res);
    });
});

function serveFile(filePath, statusCode, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
            res.end('Internal Server Error');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(statusCode, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
}

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

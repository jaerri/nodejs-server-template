const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const port = 8080;
const mimeTypes = require("./mimeTypes.json");

http.createServer((req, res) => {
    let baseURL = 'http://' + req.headers.host + '/';
    let parsedURL = new url.URL(req.url, baseURL);

    let filePath = "." + "/dev" + parsedURL.pathname;
    if (filePath == './dev/') filePath = './dev/index.html';
    let ext = path.extname(filePath).toLowerCase();
    let contentType = mimeTypes[ext];

    if (!req.method == "GET") return res.end();
    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.log(error);
            if (error.code == 'ENOENT') res.writeHead(404);
            else res.writeHead(500);  
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(process.env.PORT || port, null, null, () => console.log("ae"));
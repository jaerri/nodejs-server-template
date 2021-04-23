const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const mimeTypes = require("./dev/mimeTypes.json");
const port = 8080;
const clientFilesPath = "./data";
const htmlFileName = "/index.html";

http.createServer((req, res) => {;
    switch (req.method) {
        case "GET":
            let baseURL = 'http://' + req.headers.host + '/';
            let parsedURL = new url.URL(req.url, baseURL);

            let filePath = clientFilesPath + parsedURL.pathname;
            if (parsedURL.pathname == "/") filePath = clientFilesPath + htmlFileName;
            let ext = path.extname(filePath).toLowerCase();
            let contentType = mimeTypes[ext];

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
            break;
    }
}).listen(process.env.PORT || port, null, null, () => console.log("ae"));
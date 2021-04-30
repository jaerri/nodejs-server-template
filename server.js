//importing built in modules, unnecessary but why not
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const mimeTypes = require("./mimeTypes.json"); //taken from internet
const port = 8080; //port
const clientFilesPath = "./data"; //the directory that server will get data from
const resDirFiles = ["api.js", "index.html"]; //execute js file, send html file back to browser

http.createServer((req, res) => {;
    if (req.method == "GET") {
        let baseURL = 'http://' + req.headers.host + '/';
        let parsedURL = new url.URL(req.url, baseURL); //url.parse deprecated so have to do this
        let filePath = clientFilesPath + parsedURL.pathname;

        fs.lstat(filePath, (err, stats) => {
            if (err) {
                console.log(err);
                if (err.code == 'ENOENT') res.writeHead(404);
                else res.writeHead(500);  
                return res.end();
            } else

            if (stats.isDirectory()) {
                resDirFiles.forEach(element => {       
                    if (element.endsWith(".js")) {
                        let jsPath = filePath + element;
                        let content = require(jsPath)(req, parsedURL);
                        if (content) {
                            res.writeHead(200, { 'Content-Type': "text/javascript" });
                            return res.end(content, "utf-8");
                        }
                    } else filePath += element;
                });
            }
             
            let fileExt = path.extname(filePath).toLowerCase();
            let contentType = mimeTypes[fileExt];
            
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    console.log(err);
                    if (err.code == 'ENOENT') res.writeHead(404);
                    else res.writeHead(500);  
                    return res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    return res.end(content, 'utf-8');
                }
            });    
        });
    }
}).listen(process.env.PORT || port, null, null, () => console.log("ae"));
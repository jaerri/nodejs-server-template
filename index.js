const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
    let pathname = url.parse(req.url);
}).listen(process.env.PORT || 8080, null, null, () => console.log("ae"));
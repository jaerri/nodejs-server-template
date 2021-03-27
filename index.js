const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;

}).listen(process.env.PORT || 8080, null, null, () => console.log("ae"));
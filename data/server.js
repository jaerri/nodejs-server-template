const http = require("http");
const url = require("url");

/**
 * this file will return data that will be sent to browser
 * @param {http.IncomingMessage} res
 * @param {url.URL} url
 */
module.exports = (res, url) => {
    let query = url.searchParams;
    if (query.has("data")) {
        let data = "LMAO"; //placeholder
        return data;
    }
}
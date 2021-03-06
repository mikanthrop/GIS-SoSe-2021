"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    //horcht
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let url = Url.parse(_request.url, true);
        //console.log(url);
        //console.log("pathname: " + url.pathname);
        // check if pathname ist /html, if so, please format
        if (url.pathname == "/html") {
            _response.setHeader("content-type", "text/html; charset=utf-8");
            for (let key in url.query) {
                _response.write("<p><i>" + key + ": " + url.query[key] + "</i></p>");
            }
        }
        // check if pathname ist /json, if so, gimme a jsonstring
        if (url.pathname == "/json") {
            _response.setHeader("content-type", "application/json");
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
        }
        _response.end();
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=server.js.map
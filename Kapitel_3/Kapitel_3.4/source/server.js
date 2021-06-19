"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kapiteldreivier = void 0;
const Http = require("http");
const Url = require("url");
const mongoClient_1 = require("./mongoClient");
var Kapiteldreivier;
(function (Kapiteldreivier) {
    let result;
    let databaseURL = "mongodb://localhost:27017";
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    mongoClient_1.connectToMongo(databaseURL);
    function startServer(_port) {
        console.log("Starting server");
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    // gibt aus dass er horcht
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/saveRant") {
                console.log(url);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                Kapiteldreivier.rantData.insertOne(url.query);
                _response.write("Ihre Daten wurden gespeichert.");
                await mongoClient_1.connectToMongo(databaseURL);
            }
            // check if pathname ist /json, if so, gimme a jsonstring
            if (url.pathname == "/show") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("welcome to the show");
                let cursor = Kapiteldreivier.rantData.find();
                result = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }
            if (url.pathname == "/delete") {
                console.log(url.query);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                Kapiteldreivier.rantData.deleteOne({ "user": url.query["user"], "category": url.query["category"], "title": url.query["title"], "rant": url.query["rant"] });
                _response.write("Löschanfrage angekommen.");
            }
        }
        _response.end();
        console.log(_response + " wurde abgeschickt");
    }
})(Kapiteldreivier = exports.Kapiteldreivier || (exports.Kapiteldreivier = {}));
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let formdata;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let databaseURL = "mongodb://localhost:27017";
    startServer(port);
    connectToMongo(databaseURL);
    function startServer(_port) {
        console.log("Starting server");
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToMongo(_databaseUrl) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_databaseUrl, options);
        await mongoClient.connect();
        formdata = mongoClient.db("Kapitel_3_4").collection("FormDataSets");
        console.log("database connection ", formdata != undefined);
    }
    // gibt aus dass er horcht
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
        if (_request.url) {
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
            storeData(url.query);
        }
        _response.end();
    }
    function storeData(_data) {
        formdata.insert(_data);
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=server.js.map
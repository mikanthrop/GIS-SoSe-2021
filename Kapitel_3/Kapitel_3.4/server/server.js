"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    let rantData;
    let result;
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
        rantData = mongoClient.db("Kapitel_3_4").collection("Rants");
        console.log("database connection ", rantData != undefined);
        let cursor = rantData.find();
        console.log("cursor wurde erzeugt. Result wird jetzt befüllt.");
        result = await cursor.toArray();
        console.log("this is the result: " + result);
    }
    // gibt aus dass er horcht
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/saveRant") {
                console.log(url);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                //not sure how to solve this
                // let parsedQuery: ParsedUrlQuery = url.query;
                // storeData(newDataSet);
                _response.write("Ihre Daten wurden gespeichert.");
            }
            // check if pathname ist /json, if so, gimme a jsonstring
            if (url.pathname == "/show") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("welcome to the show");
                _response.write(JSON.stringify(result));
            }
        }
        _response.end();
        console.log(_response + " wurde abgeschickt");
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=server.js.map
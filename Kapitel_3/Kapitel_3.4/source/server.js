"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kapiteldreivier = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Kapiteldreivier;
(function (Kapiteldreivier) {
    let rantData;
    let result;
    //let databaseURL: string = "mongodb://localhost:27017";
    let databaseURL = "mongodb+srv://TestUser:3m3vaco2Wrn2Swh4@gis-sose-2021.5ejyi.mongodb.net";
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
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
                rantData.insertOne(url.query);
                _response.write("Ihre Daten wurden gespeichert.");
                await connectToMongo(databaseURL);
            }
            // check if pathname ist /json, if so, gimme a jsonstring
            if (url.pathname == "/show") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("welcome to the show");
                let cursor = rantData.find();
                result = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }
            if (url.pathname == "/delete") {
                console.log(url.query);
                _response.setHeader("content-type", "text/html; charset=utf-8");
                rantData.deleteOne({ "_id": new Mongo.ObjectId(url.query._id.toString()) });
                console.log("_id: " + new Mongo.ObjectId(url.query._id.toString()));
                _response.write("Der Beitrag wurde gelöscht.");
                await connectToMongo(databaseURL);
            }
        }
        _response.end();
        console.log(_response + " wurde abgeschickt");
    }
})(Kapiteldreivier = exports.Kapiteldreivier || (exports.Kapiteldreivier = {}));
//# sourceMappingURL=server.js.map
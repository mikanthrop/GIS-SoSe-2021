import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { Rant } from "../source/interface";

export namespace Kapiteldreivier {
    let rantData: Mongo.Collection;
    let result: Rant[];
    //let databaseURL: string = "mongodb://localhost:27017";
    let databaseURL: string = "mongodb+srv://TestUser:3m3vaco2Wrn2Swh4@gis-sose-2021.5ejyi.mongodb.net";

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    startServer(port);
    connectToMongo(databaseURL);

    function startServer(_port: number | string): void {
        console.log("Starting server");
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToMongo(_databaseUrl: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_databaseUrl, options);
        await mongoClient.connect();
        rantData = mongoClient.db("Kapitel_3_4").collection("Rants");
        console.log("database connection ", rantData != undefined);
    }
    
    // gibt aus dass er horcht
    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
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
                let cursor: Mongo.Cursor = rantData.find();
                result = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }

            if (url.pathname == "/delete") {
                console.log(url.query);
                
                _response.setHeader("content-type", "text/html; charset=utf-8");
                rantData.deleteOne( {"_id": new Mongo.ObjectId(url.query._id.toString())} );
                console.log("_id: " + new Mongo.ObjectId(url.query._id.toString()));
                
                _response.write("Der Beitrag wurde gelöscht.");
                await connectToMongo(databaseURL);
            }
        }
        _response.end();
        console.log(_response + " wurde abgeschickt");
    }
}
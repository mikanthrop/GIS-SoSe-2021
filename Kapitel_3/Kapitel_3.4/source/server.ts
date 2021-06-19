import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { Rant } from "../source/interface";
import { connectToMongo } from "./mongoClient";
import { rantData } from "./mongoClient";

export namespace Kapiteldreivier {

    let result: Rant[];
    let databaseURL: string = "mongodb://localhost:27017";

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
                rantData.deleteOne({"user": url.query["user"], "category": url.query ["category"], "title": url.query["title"], "rant": url.query["rant"]});
                _response.write("Löschanfrage angekommen.");
            }
        }
        _response.end();
        console.log(_response + " wurde abgeschickt");
    }
}
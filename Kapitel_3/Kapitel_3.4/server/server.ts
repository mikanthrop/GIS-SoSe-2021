import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_4Server {
    interface Rant {
        user: string;
        category: string;
        title: string;
        rant: string;
    }

    let rantData: Mongo.Collection;
    let result: Rant[];

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let databaseURL: string = "mongodb://localhost:27017";
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

        let cursor: Mongo.Cursor = rantData.find();
        console.log("cursor wurde erzeugt. Result wird jetzt befüllt.");
        result = await cursor.toArray();
        console.log("this is the result: " + result);

    }

    // gibt aus dass er horcht
    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
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
}
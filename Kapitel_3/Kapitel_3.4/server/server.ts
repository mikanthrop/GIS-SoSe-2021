import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";
export namespace P_3_4Server {
    interface Dataset {
        name: string;
        email: string;
        password: string;
    }

    let rantData: Mongo.Collection;

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
        let result: Dataset[] = await cursor.toArray();
        console.log(result);

    }

    // gibt aus dass er horcht
    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        console.log(url);
        //console.log("pathname: " + url.pathname);
        
        // check if pathname ist /saveRant, if so, please format
        if (_request.url) {
            if (url.pathname == "/saveRant") {
               /* _response.setHeader("content-type", "text/html; charset=utf-8");
                for (let key in url.query) {
                    _response.write("<p><i>" + key + ": " + url.query[key] + "</i></p>");
                }*/
                storeData(url.query);
            }
            
            // check if pathname ist /json, if so, gimme a jsonstring
            if (url.pathname == "/show") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            
        }
        _response.end();
    }

    function storeData(_url: ParsedUrlQuery): void {
        rantData.insertOne(_url);
    }

    function showData(_dbName: Mongo.Db, _colName: Mongo.Collection): void {
        let colObjects: any = _dbName._colName.find();
    }
}
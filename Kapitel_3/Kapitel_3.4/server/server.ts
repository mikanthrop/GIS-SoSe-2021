import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
export namespace P_3_4Server {
    interface Dataset {
        [type: string]: string | string[];
    }

    let formdata: Mongo.Collection;

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
        formdata = mongoClient.db("Kapitel_3_4").collection("FormDataSets");
        console.log("database connection ", formdata != undefined);
    }

    // gibt aus dass er horcht
    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");


        _response.setHeader("Access-Control-Allow-Origin", "*");

        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
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
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            storeData(url.query);
        }
        _response.end();
    }

    function storeData(_data: Dataset): void {
        formdata.insert(_data);
    }
}
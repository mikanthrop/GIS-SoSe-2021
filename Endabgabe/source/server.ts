import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

namespace Endabgabe {
    let users: Mongo.Collection;
    let recipes: Mongo.Collection;
    let databaseURL: string = "mongodb://localhost:27017";
    //let databaseURL: string = "mongodb+srv://TestUser:3m3vaco2Wrn2Swh4@gis-sose-2021.5ejyi.mongodb.net";

    let port: number = Number(process.env.PORT);
    if (!port) port = 8100;

    startServer(port);
    connectToMongo(databaseURL);


    function startServer(_port: number | string): void {
        console.log("Starting server.");

        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToMongo(_databaseUrl: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_databaseUrl, options);
        await mongoClient.connect();
        users = mongoClient.db("recipeCollection").collection("users");
        recipes = mongoClient.db("recipeCollection").collection("recipes");

        console.log("Database connection to users ", users != undefined);
        console.log("Database connection to recipes ", recipes != undefined);
    }

    function handleListen(): void {
        console.log("Server's listening.");
    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("Server heard request. Now responding.");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url != undefined) {

            let cursor: Mongo.Cursor;
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // request comes from loginForm
            if (url.pathname == "/login") {
                console.log("Request to login received.");
                _response.setHeader("content-type", "text/html; charset=utf-8");

                // check if login data is saved in coll. users
                cursor = users.find(url.query);
                let result: User[] = await cursor.toArray();
                console.log("this is the result: " + result);


                // if cursor did find something, say so
                let loginResponse: LoginMessage;

                if (result != undefined) {
                    loginResponse.message = "Found user";
                } else {
                    loginResponse.error = "Couldn't find user";
                }
                // if not, say so
                _response.write(loginResponse);

                //_response.write(url);
            }
            // request comes from signupForm
            if (url.pathname == "/signup") {
                console.log("Request to signup received.");

                //einbauen, dass überprüft wird, ob der Benutzername schon benutzt wird

                _response.setHeader("content-type", "text/html; charset=utf-8");
                users.insertOne(url.query);
                _response.write("Ihr Account wurde erstellt.");
                await connectToMongo(databaseURL);
            }
        }
        _response.end();
        console.log("Server sent response.");
    }

}
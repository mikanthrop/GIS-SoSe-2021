"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let users;
    let recipes;
    let databaseURL = "mongodb://localhost:27017";
    //let databaseURL: string = "mongodb+srv://TestUser:3m3vaco2Wrn2Swh4@gis-sose-2021.5ejyi.mongodb.net";
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    startServer(port);
    connectToMongo(databaseURL);
    function startServer(_port) {
        console.log("Starting server.");
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToMongo(_databaseUrl) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_databaseUrl, options);
        await mongoClient.connect();
        users = mongoClient.db("recipeCollection").collection("users");
        recipes = mongoClient.db("recipeCollection").collection("recipes");
        console.log("Database connection to users ", users != undefined);
        console.log("Database connection to recipes ", recipes != undefined);
    }
    function handleListen() {
        console.log("Server's listening.");
    }
    async function handleRequest(_request, _response) {
        console.log("Server heard request. Now responding.");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url != undefined) {
            //let cursor: Mongo.Cursor;
            let url = Url.parse(_request.url, true);
            // request comes from loginForm
            if (url.pathname == "/login") {
                console.log("Request to login received.");
                _response.setHeader("content-type", "text/html; charset=utf-8");
                // check if login data is saved in coll. users
                let searchedUser = await users.findOne({ "user": url.query.user, "password": url.query.password });
                // if cursor did find something, say so
                let loginResponse = { message: undefined, error: undefined };
                if (searchedUser != undefined)
                    loginResponse.message = "Found user";
                else
                    loginResponse.error = "Couldn't find user";
                console.log(loginResponse);
                _response.write(JSON.stringify(loginResponse));
            }
            // request comes from signupForm
            if (url.pathname == "/signup") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("Request to signup received.");
                //überprüft, ob der Benutzername schon benutzt wird
                let user = await users.findOne({ "user": url.query.user });
                if (user != undefined)
                    _response.write("Benutzername ist bereits vergeben.");
                else {
                    users.insertOne(url.query);
                    _response.write("Ihr Account wurde erstellt.");
                    await connectToMongo(databaseURL);
                }
            }
            // request to save a recipe
            if (url.pathname == "/submit") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("Request to save recipe received.");
                console.log(url.query);
                if (url.query.title == "" && url.query.ingredients == "")
                    recipes.insertOne(url.query);
            }
            if (url.pathname == "/delete") {
                recipes.deleteOne({ "title: ": url.query.title, "ingredients: ": url.query.ingredients });
            }
        }
        _response.end();
        console.log("--------Server sent response--------");
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=server.js.map
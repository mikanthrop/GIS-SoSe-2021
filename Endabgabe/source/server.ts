import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import * as Interface from "./interface";

export namespace Endabgabe {
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

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            //login.html
            // request comes from loginForm
            if (url.pathname == "/login") {
                console.log("Request to login received.");
                _response.setHeader("content-type", "text/html; charset=utf-8");

                // check if login data is saved in coll. users
                let searchedUser: Interface.User = await users.findOne({ "user": url.query.user.toString(), "password": url.query.password.toString() });

                // if cursor did find something, say so
                let loginResponse: Interface.LoginMessage = { message: undefined, error: undefined };
                if (searchedUser != undefined) loginResponse.message = "Found user";
                else loginResponse.error = "Couldn't find user";
                console.log(loginResponse);

                _response.write(JSON.stringify(loginResponse));
            }

            // request comes from signupForm
            if (url.pathname == "/signup") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("Request to signup received.");

                //checks if username is already in use
                let user: Interface.User = await users.findOne({ "user": url.query.user.toString() });
                if (user != undefined) _response.write("Benutzername ist bereits vergeben.");
                else {
                    users.insertOne(url.query);
                    _response.write("Ihr Account wurde erstellt.");
                    await connectToMongo(databaseURL);
                }
            }


            // myRecipes.html
            // request to save a recipe
            if (url.pathname == "/submitRecipe") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("Request to save recipe received.");

                // checks if there is an author to the recipe
                if (url.query.author != "") {
                    console.log("onto saving!");
                    recipes.insertOne(url.query);
                    _response.write("Ihr Rezept wurde erfolgreich gespeichert.");
                } else {
                    _response.write("Sie müssen eingeloggt sein, um ein Rezept erstellen zu können.");
                }
            }

            // request to show recipes the user created
            if (url.pathname == "/showMyRecipes") {
                _response.setHeader("content-type", "application/json; charset=utf-8");
                console.log("Request to show user's recipes received.");

                let cursor: Mongo.Cursor = recipes.find({ "author": url.query.user });
                let result: Interface.Recipe[] = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }

            // request to send old version back to client so user can edit the recipe
            if (url.pathname == "/editMyRecipe") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                console.log("Request to edit user's recipe received.");

                console.log("url.query: ", url.query);
                let recipe: Interface.Recipe = await recipes.findOne({ "_id": new Mongo.ObjectId(url.query._id.toString()) });
                console.log(recipe);

                _response.write(JSON.stringify(recipe));
            }
            // request to resubmit edited recipe
            if (url.pathname == "/resubmitMyRecipe") {

                let doc: Interface.MongoRecipe = { "title": url.query.title.toString(), "author": url.query.author.toString(), "ingredients": url.query.ingredients.toString(), "preparation": url.query.preparation.toString() };
                let filter: Mongo.FilterQuery<Mongo.ObjectId> = { "_id": new Mongo.ObjectId(url.query._id.toString()) };
                console.log(filter);

                recipes.replaceOne(filter, doc);
                _response.write("Ihr Rezept wurde erfolgreich geändert.");
            }

            // request to delete one recipe the user created themselves
            if (url.pathname == "/deleteMyRecipe") {
                console.log("Request to delete user's recipe received.");
                recipes.deleteOne({ "_id": new Mongo.ObjectId(url.query._id.toString()) });
                _response.write("Rezept wurde erfolgreich gelöscht.");
            }

            //recipe.html
            // request to show all recipes in the collection recipes
            if (url.pathname == "/showAll") {
                console.log("Request to show all recipes received.");
                let cursor: Mongo.Cursor = recipes.find();
                let result: Interface.Recipe[] = await cursor.toArray();
                _response.write(JSON.stringify(result));
            }

            // request to get array of faves of the user
            if (url.pathname == "/getFavs") {
                console.log("Request to give back Favs received.");
                let user: Interface.User = await users.findOne({ "user": url.query.user.toString() });

                let favorites: Interface.Recipe[] = user.myFavs;
                console.log(user.user + "s Favoriten: " + JSON.stringify(favorites));

                _response.write(JSON.stringify(favorites));

            }

            // request to save a recipe into myFaves on the users profile
            if (url.pathname == "/likeThis") {
                console.log("Request to save this recipe to faves received.");
                let newFaveRecipe: Interface.Recipe = await recipes.findOne({ "_id": new Mongo.ObjectId(url.query._id.toString()) });
                let oldUser: Interface.User = await users.findOne({ "user": url.query.user });
                let faves: Interface.Recipe[] = new Array();
                let updatedUser: Mongo.FindAndModifyWriteOpResultObject<Interface.User>;

                faves = oldUser.myFavs;
                if (faves != undefined) {
                    faves.push(newFaveRecipe);
                    console.log("Favorites now: " + JSON.stringify(faves) + "\n");

                    updatedUser = await users.findOneAndUpdate({ "user": url.query.user }, { $set: { "myFavs": faves } });
                }
                else updatedUser = await users.findOneAndUpdate({ "user": url.query.user }, { $set: { "myFavs": [newFaveRecipe] } });
                console.log("updatedUser: " + JSON.stringify(updatedUser));

                _response.write("Rezept \"" + newFaveRecipe.title + "\" wurde zu Ihren Favoriten hinzugefügt.");
            }

        }
        _response.end();
        console.log("--------Server sent response--------");
    }

}
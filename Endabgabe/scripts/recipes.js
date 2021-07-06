"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
//import { GeneralFunctions } from "./general";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", buildNavbar);
    window.addEventListener("load", handleLoadShowAllRecipes);
    let recipeDiv = document.getElementById("recipeDiv");
    let serverResponseDiv = document.getElementById("serverReply");
    let url;
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function buildNavbar() {
        let user = localStorage.getItem("user");
        let navBar = document.getElementById("navBar");
        let recipesLink = document.createElement("a");
        recipesLink.setAttribute("href", "../html/recipes.html");
        navBar.appendChild(recipesLink);
        let recipesHLine = document.createElement("h1");
        recipesHLine.appendChild(document.createTextNode("Rezeptesammlung"));
        recipesLink.appendChild(recipesHLine);
        let loggedInOrNot = document.createElement("div");
        loggedInOrNot.setAttribute("id", "loggedInOrNot");
        navBar.appendChild(loggedInOrNot);
        if (user == null) {
            let loginLink = document.createElement("a");
            loginLink.setAttribute("href", "../html/login.html");
            loggedInOrNot.appendChild(loginLink);
            let loginHLine = document.createElement("h2");
            loginHLine.appendChild(document.createTextNode("Login"));
            loginLink.appendChild(loginHLine);
        }
        else {
            let myFavoritesLink = document.createElement("a");
            myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
            loggedInOrNot.appendChild(myFavoritesLink);
            let myFavoritesHLine = document.createElement("h2");
            myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
            myFavoritesLink.appendChild(myFavoritesHLine);
            let myRecipesLink = document.createElement("a");
            myRecipesLink.setAttribute("href", "../html/myRecipes.html");
            loggedInOrNot.appendChild(myRecipesLink);
            let myRecipesHLine = document.createElement("h2");
            myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
            myRecipesLink.appendChild(myRecipesHLine);
            let loggedIn = document.createElement("h3");
            loggedIn.innerText = "Eingeloggt als \n" + user;
            loggedInOrNot.appendChild(loggedIn);
        }
    }
    async function handleLoadShowAllRecipes() {
        getURL();
        url += "/showAll?";
        console.log(url);
        let response = await fetch(url);
        let showReply = await response.json();
        for (let i = 0; i < showReply.length; i++) {
            let post = document.createElement("div");
            serverResponseDiv.appendChild(post);
            let recipeDiv = document.createElement("div");
            post.appendChild(recipeDiv);
            createRecipe(showReply[i], post);
            if (localStorage.getItem("user") != undefined) {
                createFavButton(showReply[i], recipeDiv);
            }
        }
    }
    function createFavButton(_serverReply, _parent) {
        let favButton = document.createElement("button");
        favButton.setAttribute("type", "button");
        favButton.appendChild(document.createTextNode("Favorisieren"));
        _parent.appendChild(favButton);
        favButton.dataset._id = _serverReply._id;
        favButton.addEventListener("click", handleClickFavButton);
    }
    async function handleClickFavButton(_event) {
        getURL();
        let target = _event.currentTarget;
        let id = target.dataset._id;
        url += "/likeThis?_id=" + id + "&user=" + localStorage.getItem("user");
        console.log(url);
        let response = await fetch(url);
        let deleteReply = await response.text();
        serverResponseDiv.innerHTML = deleteReply;
    }
    function createRecipe(_serverReply, _parent) {
        // formatting one recipe
        let author = document.createElement("p");
        author.appendChild(document.createTextNode("Verfasser: " + _serverReply.author));
        _parent.appendChild(author);
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode(_serverReply.title));
        _parent.appendChild(title);
        let ingredients = document.createElement("p");
        ingredients.appendChild(document.createTextNode("Zutaten: " + _serverReply.ingredients));
        _parent.appendChild(ingredients);
        let preparation = document.createElement("p");
        preparation.appendChild(document.createTextNode("Zubereitung: " + _serverReply.preparation));
        _parent.appendChild(preparation);
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=recipes.js.map
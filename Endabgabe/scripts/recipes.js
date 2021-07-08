"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
//import { GeneralFunctions } from "./general";
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", buildNavbar);
    window.addEventListener("load", handleLoadShowAllRecipes);
    let recipesDiv = document.getElementById("recipeDiv");
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
        let showAllResponse = await fetch(url);
        let showAllReply = await showAllResponse.json();
        let user = localStorage.getItem("user");
        console.log("user: " + user);
        let favRecipes = await getFavRecipes(user);
        console.log(favRecipes);
        for (let i = 0; i < showAllReply.length; i++) {
            let post = document.createElement("div");
            recipesDiv.appendChild(post);
            let recipeDiv = document.createElement("div");
            recipeDiv.setAttribute("id", "recipe" + i);
            post.appendChild(recipeDiv);
            createRecipe(showAllReply[i], recipeDiv);
            if (user != undefined) {
                createFavNoFavButton(user, showAllReply[i], favRecipes, recipeDiv);
            }
        }
    }
    async function getFavRecipes(_user) {
        getURL();
        url += "/getFavs?user=" + _user;
        console.log(url);
        let response = await fetch(url);
        let favRecipes = await response.json();
        return favRecipes;
    }
    function createFavNoFavButton(_user, _recipe, _favRecipes, _parent) {
        let notFaveYet = true;
        for (let i = 0; i < _favRecipes.length; i++) {
            if (_recipe._id == _favRecipes[i]._id) {
                createNoFavButton(_parent);
                notFaveYet = false;
                break;
            }
        }
        if (notFaveYet == true) {
            createFavButton(_recipe, _parent);
        }
    }
    function createFavButton(_serverReply, _parent) {
        let favButton = document.createElement("button");
        favButton.setAttribute("type", "button");
        favButton.appendChild(document.createTextNode("Favorisieren"));
        _parent.appendChild(favButton);
        favButton.dataset._id = _serverReply._id;
        favButton.dataset.parent = _parent.id;
        console.log("parent id: " + favButton.dataset.parent);
        favButton.addEventListener("click", handleClickFavButton);
    }
    function createNoFavButton(_parent) {
        let noFavButton = document.createElement("button");
        noFavButton.setAttribute("type", "button");
        noFavButton.appendChild(document.createTextNode("Favorisiert"));
        _parent.appendChild(noFavButton);
    }
    async function handleClickFavButton(_event) {
        getURL();
        let target = _event.currentTarget;
        let id = target.dataset._id;
        let parentId = target.dataset.parent;
        let parent = document.getElementById(parentId);
        url += "/likeThis?_id=" + id + "&user=" + localStorage.getItem("user");
        console.log(url);
        let response = await fetch(url);
        let favReply = await response.text();
        serverResponseDiv.innerHTML = favReply;
        target.classList.add("ishidden");
        createNoFavButton(parent);
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
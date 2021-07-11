"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", buildNavbar);
    window.addEventListener("load", handleLoadShowAllRecipes);
    let recipesDiv = document.getElementById("recipeDiv");
    let serverResponseDiv = document.getElementById("serverReply");
    let url;
    function buildNavbar() {
        let user = localStorage.getItem("user");
        let navBar = document.getElementById("navBar");
        let recipesLink = document.createElement("a");
        recipesLink.setAttribute("href", "../html/recipes.html");
        navBar.appendChild(recipesLink);
        let recipesHLine = document.createElement("h2");
        recipesHLine.appendChild(document.createTextNode("Rezepte"));
        recipesLink.appendChild(recipesHLine);
        if (user == null) {
            let loginLink = document.createElement("a");
            loginLink.setAttribute("href", "../html/login.html");
            navBar.appendChild(loginLink);
            let loginHLine = document.createElement("h2");
            loginHLine.appendChild(document.createTextNode("Login"));
            loginLink.appendChild(loginHLine);
            navBar.classList.add("navBar-padding");
        }
        else {
            let myFavoritesLink = document.createElement("a");
            myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
            navBar.appendChild(myFavoritesLink);
            let myFavoritesHLine = document.createElement("h2");
            myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
            myFavoritesLink.appendChild(myFavoritesHLine);
            let myRecipesLink = document.createElement("a");
            myRecipesLink.setAttribute("href", "../html/myRecipes.html");
            navBar.appendChild(myRecipesLink);
            let myRecipesHLine = document.createElement("h2");
            myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
            myRecipesLink.appendChild(myRecipesHLine);
            let userDiv = document.createElement("div");
            navBar.appendChild(userDiv);
            let loggedIn = document.createElement("h4");
            loggedIn.innerText = user;
            userDiv.appendChild(loggedIn);
            let logout = document.createElement("button");
            logout.setAttribute("type", "button");
            logout.innerText = "Logout";
            userDiv.appendChild(logout);
            logout.addEventListener("click", logOut);
        }
    }
    function logOut() {
        localStorage.removeItem("user");
        window.open("../html/login.html", "_self");
    }
    function getURL() {
        url = "https://gis-server-git-gud.herokuapp.com";
        //url = "http://localhost:8100";
    }
    async function handleLoadShowAllRecipes() {
        getURL();
        url += "/showAll?";
        console.log(url);
        let showAllResponse = await fetch(url);
        let showAllReply = await showAllResponse.json();
        let user = localStorage.getItem("user");
        console.log("user: " + user);
        let favRecipes;
        if (user != null) {
            favRecipes = await getFavRecipes(user);
        }
        console.log(favRecipes);
        for (let i = 0; i < showAllReply.length; i++) {
            let outlinePost = document.createElement("div");
            outlinePost.classList.add("recipe-post");
            recipesDiv.appendChild(outlinePost);
            let post = document.createElement("div");
            post.classList.add("recipe-inlay");
            post.classList.add("flexbox");
            outlinePost.appendChild(post);
            let recipeDiv = document.createElement("div");
            recipeDiv.setAttribute("id", "recipe" + i);
            post.appendChild(recipeDiv);
            createRecipe(showAllReply[i], recipeDiv);
            if (user != undefined) {
                if (favRecipes.favs != undefined) {
                    let buttonDiv = document.createElement("div");
                    buttonDiv.id = "buttonDiv" + i;
                    post.appendChild(buttonDiv);
                    createFavNoFavButton(user, showAllReply[i], favRecipes.favs, buttonDiv);
                }
                else
                    createFavButton(showAllReply[i], recipeDiv);
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
        favButton.addEventListener("click", handleClickFavButton);
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
    function createNoFavButton(_parent) {
        let noFavButton = document.createElement("button");
        noFavButton.setAttribute("type", "button");
        noFavButton.classList.add("nopeButton");
        noFavButton.appendChild(document.createTextNode("Favorisiert"));
        _parent.appendChild(noFavButton);
        noFavButton.addEventListener("click", handleClickNoFavButton);
    }
    function handleClickNoFavButton() {
        serverResponseDiv.innerText = "Bitte gehen Sie in Meine Favoriten, um ihre Favoriten zu verwalten.";
    }
    function createRecipe(_serverReply, _parent) {
        // formatting one recipe
        let author = document.createElement("p");
        let authorBold = document.createElement("b");
        authorBold.appendChild(document.createTextNode(_serverReply.author));
        author.appendChild(authorBold);
        _parent.appendChild(author);
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode(_serverReply.title));
        _parent.appendChild(title);
        let ingredients = document.createElement("p");
        let ingBold = document.createElement("b");
        ingBold.appendChild(document.createTextNode("Zutaten"));
        ingredients.appendChild(ingBold);
        ingredients.appendChild(document.createTextNode(" " + _serverReply.ingredients.toString()));
        _parent.appendChild(ingredients);
        let preparation = document.createElement("p");
        let prepBold = document.createElement("b");
        prepBold.appendChild(document.createTextNode("Zubereitung"));
        preparation.appendChild(prepBold);
        preparation.appendChild(document.createTextNode(" " + _serverReply.preparation));
        _parent.appendChild(preparation);
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=recipes.js.map
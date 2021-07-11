"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
var Endabgabe;
(function (Endabgabe) {
    window.addEventListener("load", buildNavbar);
    if (localStorage.getItem("user") != undefined) {
        window.addEventListener("load", showMyFavs);
    }
    else {
        window.addEventListener("load", notYou);
    }
    let serverReplyDiv = document.getElementById("serverReply");
    let favoritesDiv = document.getElementById("myFavs");
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
    function notYou() {
        let notYou = document.createElement("h2");
        notYou.classList.add("notYou");
        notYou.innerText = "Sie müssen angemeldet sein, um dieses Feature nutzen zu können.";
        favoritesDiv.appendChild(notYou);
    }
    function createDeleteButton(_serverReply, _parent) {
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("Entfernen"));
        _parent.appendChild(deleteButton);
        deleteButton.dataset._id = _serverReply._id;
        deleteButton.dataset.title = _serverReply.title;
        deleteButton.addEventListener("click", handleClickDeleteFav);
    }
    async function showMyFavs() {
        getURL();
        let user = localStorage.getItem("user");
        url += "/getFavs?" + "user=" + user;
        console.log(url);
        let showResponse = await fetch(url);
        let serverReply = await showResponse.json();
        if (serverReply.favs != undefined) {
            let favRecipes = serverReply.favs;
            for (let i = 0; i < favRecipes.length; i++) {
                let outlinePost = document.createElement("div");
                outlinePost.classList.add("recipe-post");
                favoritesDiv.appendChild(outlinePost);
                let post = document.createElement("div");
                post.classList.add("recipe-inlay");
                post.classList.add("flexbox");
                outlinePost.appendChild(post);
                let recipeDiv = document.createElement("div");
                recipeDiv.setAttribute("id", "recipe" + i);
                post.appendChild(recipeDiv);
                let buttonDiv = document.createElement("div");
                buttonDiv.id = "buttonDiv" + i;
                post.appendChild(buttonDiv);
                createRecipe(favRecipes[i], recipeDiv);
                createDeleteButton(favRecipes[i], buttonDiv);
            }
        }
        else {
            serverReplyDiv.innerHTML = "Sie haben noch keine Favoriten ausgewählt.";
        }
    }
    async function handleClickDeleteFav(_event) {
        getURL();
        console.log("DeleteButton wurde gedrückt.");
        let target = _event.currentTarget;
        let id = target.dataset._id;
        url += "/deletemyFav?" + "user=" + localStorage.getItem("user") + "&_id=" + id;
        console.log(url);
        let deleteResponse = await fetch(url);
        let serverResponse = await deleteResponse.text();
        serverReplyDiv.innerHTML = serverResponse;
        favoritesDiv.innerHTML = "";
        showMyFavs();
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=myFavorites.js.map
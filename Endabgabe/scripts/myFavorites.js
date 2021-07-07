"use strict";
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
//# sourceMappingURL=myFavorites.js.map
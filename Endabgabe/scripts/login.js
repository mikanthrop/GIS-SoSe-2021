"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
var Endabgabe;
(function (Endabgabe) {
    //generally used elements/variables
    let formData;
    let serverResponseDiv = document.getElementById("serverResponse");
    let query;
    let url;
    //login.html
    window.addEventListener("load", buildNavbar);
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);
    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");
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
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function setQuery(_formData) {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(_formData);
    }
    //makes switching between login and signup form possible
    function handleClickSwitchToLogin() {
        console.log("SwitchToLogin wurde gedrückt.");
        signupForm.classList.add("ishidden");
        loginForm.classList.remove("ishidden");
    }
    function handleClickSwitchToSignup() {
        console.log("SwitchToSignup wurde gedrückt.");
        loginForm.classList.add("ishidden");
        signupForm.classList.remove("ishidden");
    }
    function getFormDataLogin() {
        formData = new FormData(loginForm);
        console.log("user: " + formData.get("user"));
        setQuery(formData);
    }
    function getFormDataSignup() {
        formData = new FormData(signupForm);
        console.log(formData.entries());
        setQuery(formData);
    }
    async function handleClickButtonLogin() {
        console.log("ButtonLogin wurde gedrückt. Server sieht nach, ob Eingabedaten mit Datenbank übereinstimmen.");
        getURL();
        getFormDataLogin();
        url += "/login?" + query.toString();
        console.log(query.toString());
        let response = await fetch(url);
        let text = await response.text();
        console.log(text);
        let displayResponse = JSON.parse(text);
        if (displayResponse.message != undefined) {
            window.open("../html/recipes.html", "_self");
            localStorage.setItem("user", formData.get("user").toString());
        }
        if (displayResponse.error != undefined)
            serverResponseDiv.innerHTML = "Nutzer konnte nicht gefunden werden.";
    }
    async function handleClickButtonSignup() {
        console.log("ButtonSignup wurde gedrückt. Server erstellt ein neues Nutzerprofil.");
        getURL();
        getFormDataSignup();
        url += "/signup?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        console.log(displayResponse);
        if (displayResponse == "Ihr Account wurde erstellt.")
            window.open("../html/login.html", "_self");
        else
            serverResponseDiv.innerHTML = displayResponse;
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=login.js.map
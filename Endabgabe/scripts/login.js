"use strict";
var Endabgabe;
(function (Endabgabe) {
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);
    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");
    let formData;
    let serverResponseDiv = document.getElementById("serverResponse");
    let url;
    let query;
    //make switching between login and signup form possible
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
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function setQuery(_formData) {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(_formData);
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
        let response = await fetch(url);
        let displayResponse = await response.text();
        console.log(displayResponse);
        serverResponseDiv.innerHTML = displayResponse;
        if (displayResponse == "Found user") {
            sessionStorage.setItem("user", formData.get("user").toString());
            //recipefavs?
            //sessionStorage.setItem("")
        }
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
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=login.js.map
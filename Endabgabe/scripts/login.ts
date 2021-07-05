import * as Interface from "../source/interface";

export namespace Endabgabe {
    //generally used elements/variables
    let formData: FormData;
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let query: URLSearchParams;

    let url: string;

    //login.html
    window.addEventListener("load", buildNavbar);
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);
    let loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("loginForm");
    let signupForm: HTMLFormElement = <HTMLFormElement>document.getElementById("signupForm");

    function buildNavbar(): void {
        let user: string = localStorage.getItem("user");
        let navBar: HTMLElement = document.getElementById("navBar");
    
        let recipesLink: HTMLAnchorElement = document.createElement("a");
        recipesLink.setAttribute("href", "../html/recipes.html");
        navBar.appendChild(recipesLink);
        let recipesHLine: HTMLElement = document.createElement("h1");
        recipesHLine.appendChild(document.createTextNode("Rezeptesammlung"));
        recipesLink.appendChild(recipesHLine);
        
        let loggedInOrNot: HTMLDivElement = document.createElement("div");
        loggedInOrNot.setAttribute("id", "loggedInOrNot");
        navBar.appendChild(loggedInOrNot);
        
        if (user == null) {
            let loginLink: HTMLAnchorElement = document.createElement("a");
            loginLink.setAttribute("href", "../html/login.html");
            loggedInOrNot.appendChild(loginLink);
            let loginHLine: HTMLElement = document.createElement("h2");
            loginHLine.appendChild(document.createTextNode("Login"));
            loginLink.appendChild(loginHLine);
        
        } else {
            let myFavoritesLink: HTMLAnchorElement = document.createElement("a");
            myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
            loggedInOrNot.appendChild(myFavoritesLink);
            let myFavoritesHLine: HTMLElement = document.createElement("h2");
            myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
            myFavoritesLink.appendChild(myFavoritesHLine);
    
            let myRecipesLink: HTMLAnchorElement = document.createElement("a");
            myRecipesLink.setAttribute("href", "../html/myRecipes.html");
            loggedInOrNot.appendChild(myRecipesLink);
            let myRecipesHLine: HTMLElement = document.createElement("h2");
            myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
            myRecipesLink.appendChild(myRecipesHLine);

            let loggedIn: HTMLElement = document.createElement("h3");
            loggedIn.innerText = "Eingeloggt als \n" + user;
            loggedInOrNot.appendChild(loggedIn);
        }
    
    }

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function setQuery(_formData: FormData): void {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(<any>_formData);
    }

    //makes switching between login and signup form possible
    function handleClickSwitchToLogin(): void {
        console.log("SwitchToLogin wurde gedrückt.");

        signupForm.classList.add("ishidden");
        loginForm.classList.remove("ishidden");
    }

    function handleClickSwitchToSignup(): void {
        console.log("SwitchToSignup wurde gedrückt.");

        loginForm.classList.add("ishidden");
        signupForm.classList.remove("ishidden");
    }

    function getFormDataLogin(): void {
        formData = new FormData(loginForm);
        console.log("user: " + formData.get("user"));
        setQuery(formData);
    }

    function getFormDataSignup(): void {
        formData = new FormData(signupForm);
        console.log(formData.entries());
        setQuery(formData);
    }

    async function handleClickButtonLogin(): Promise<void> {
        console.log("ButtonLogin wurde gedrückt. Server sieht nach, ob Eingabedaten mit Datenbank übereinstimmen.");
        getURL();
        getFormDataLogin();

        url += "/login?" + query.toString();
        console.log(query.toString());
        let response: Response = await fetch(url);
        let text: string = await response.text();
        console.log(text);
        let displayResponse: Interface.LoginMessage = JSON.parse(text);
        if (displayResponse.message != undefined) {
            window.open("../html/recipes.html", "_self");
            localStorage.setItem("user", formData.get("user").toString());
        }
        if (displayResponse.error != undefined) serverResponseDiv.innerHTML = "Nutzer konnte nicht gefunden werden.";
    }

    async function handleClickButtonSignup(): Promise<void> {
        console.log("ButtonSignup wurde gedrückt. Server erstellt ein neues Nutzerprofil.");
        getURL();
        getFormDataSignup();

        url += "/signup?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        console.log(displayResponse);
        if (displayResponse == "Ihr Account wurde erstellt.") window.open("../html/login.html", "_self");
        else
            serverResponseDiv.innerHTML = displayResponse;
    }
}
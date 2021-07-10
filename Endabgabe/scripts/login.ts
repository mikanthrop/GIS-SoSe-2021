import * as Interface from "../source/interface";

export namespace Endabgabe {
    //generally used elements/variables
    let formData: FormData;
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverReply");
    let query: URLSearchParams;

    let url: string;

    //login.html
    window.addEventListener("load", buildNavbar);
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);

    let loginDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("loginDiv");
    let loginForm: HTMLFormElement = <HTMLFormElement>document.getElementById("loginForm");
    let signupDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("signupDiv");
    let signupForm: HTMLFormElement = <HTMLFormElement>document.getElementById("signupForm");

    function buildNavbar(): void {
        let user: string = localStorage.getItem("user");
        let navBar: HTMLElement = document.getElementById("navBar");

        let recipesLink: HTMLAnchorElement = document.createElement("a");
        recipesLink.setAttribute("href", "../html/recipes.html");
        navBar.appendChild(recipesLink);
        let recipesHLine: HTMLElement = document.createElement("h2");
        recipesHLine.appendChild(document.createTextNode("Rezepte"));
        recipesLink.appendChild(recipesHLine);

        if (user == null) {
            let loginLink: HTMLAnchorElement = document.createElement("a");
            loginLink.setAttribute("href", "../html/login.html");
            navBar.appendChild(loginLink);
            let loginHLine: HTMLElement = document.createElement("h2");
            loginHLine.appendChild(document.createTextNode("Login"));
            loginLink.appendChild(loginHLine);

            navBar.classList.add("navBar-padding");

        } else {
            let myFavoritesLink: HTMLAnchorElement = document.createElement("a");
            myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
            navBar.appendChild(myFavoritesLink);
            let myFavoritesHLine: HTMLElement = document.createElement("h2");
            myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
            myFavoritesLink.appendChild(myFavoritesHLine);

            let myRecipesLink: HTMLAnchorElement = document.createElement("a");
            myRecipesLink.setAttribute("href", "../html/myRecipes.html");
            navBar.appendChild(myRecipesLink);
            let myRecipesHLine: HTMLElement = document.createElement("h2");
            myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
            myRecipesLink.appendChild(myRecipesHLine);

            let userDiv: HTMLDivElement = document.createElement("div");
            navBar.appendChild(userDiv);

            let loggedIn: HTMLElement = document.createElement("h4");
            loggedIn.innerText = user;
            userDiv.appendChild(loggedIn);

            let logout: HTMLButtonElement = document.createElement("button");
            logout.setAttribute("type", "button");
            logout.innerText = "Logout";
            userDiv.appendChild(logout);
            logout.addEventListener("click", logOut);
        }
    }

    function logOut(): void {
        localStorage.removeItem("user");
        window.open("../html/login.html", "_self");
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

        signupDiv.classList.add("ishidden");
        loginDiv.classList.remove("ishidden");

        serverResponseDiv.innerText = "";
    }

    function handleClickSwitchToSignup(): void {
        console.log("SwitchToSignup wurde gedrückt.");

        loginDiv.classList.add("ishidden");
        signupDiv.classList.remove("ishidden");

        serverResponseDiv.innerText = "";
    }

    function getFormDataLogin(): void {
        formData = new FormData(loginForm);
        setQuery(formData);
    }

    function getFormDataSignup(): void {
        formData = new FormData(signupForm);
        setQuery(formData);
    }

    async function handleClickButtonLogin(): Promise<void> {
        console.log("ButtonLogin wurde gedrückt. Server sieht nach, ob Eingabedaten mit Datenbank übereinstimmen.");
        getURL();
        getFormDataLogin();

        url += "/login?" + query.toString() + "&myFavs=";
        if (query.toString() == "user=&password=") serverResponseDiv.innerText = "Bitte geben Sie etwas ein.";
        else {
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
    }

    async function handleClickButtonSignup(): Promise<void> {
        console.log("ButtonSignup wurde gedrückt. Server erstellt ein neues Nutzerprofil.");
        getURL();
        getFormDataSignup();

        url += "/signup?" + query.toString();
        if (query.toString() == "user=&password=") serverResponseDiv.innerText = "Bitte geben Sie etwas ein.";
        else {
            let response: Response = await fetch(url);
            let displayResponse: string = await response.text();
            console.log(displayResponse);
            if (displayResponse == "Ihr Account wurde erstellt.") window.open("../html/login.html", "_self");
            else
                serverResponseDiv.innerHTML = displayResponse;
        }
    }
}
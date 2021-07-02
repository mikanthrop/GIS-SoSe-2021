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
    document.getElementById("switchToSignup").addEventListener("click", handleClickSwitchToSignup);
    document.getElementById("switchToLogin").addEventListener("click", handleClickSwitchToLogin);
    document.getElementById("buttonLogin").addEventListener("click", handleClickButtonLogin);
    document.getElementById("buttonSignup").addEventListener("click", handleClickButtonSignup);
    let loginForm = document.getElementById("loginForm");
    let signupForm = document.getElementById("signupForm");
    /* //myRecipes.html
     document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
     document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
     let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
     let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
     let ingredientList: string[];
     let ingredientCount: number = 1;*/
    // generally used functions
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function setQuery(_formData) {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(_formData);
    }
    //login.html functions
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
            serverResponseDiv.innerHTML = displayResponse.error;
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
    //myRecipes.html functions
    /* function handleClickAddIngredient(): void {
         let nextIngredient: HTMLInputElement = document.createElement("input");
         nextIngredient.type = "text";
         nextIngredient.name = "ingredient" + ingredientCount;
         ingredientCount++;
         ingredientsDiv.appendChild(nextIngredient);
     }
 
     async function handleClickSubmitRecipe(): Promise<void> {
         console.log("Submit Recipe wurde gedrückt.");
         
         formData = new FormData(recipeForm);
         console.log(formData.getAll("ingredient"));
         setQuery(formData);
         url += "/submit?" + query.toString();
         let response: Response = await fetch(url);
         let displayResponse: string = await response.text();
         serverResponseDiv.innerHTML = displayResponse;
 
     }*/
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=login.js.map
import * as Interface from "../source/interface";
//import { GeneralFunctions } from "./general";

export namespace Endabgabe {

    window.addEventListener("load", buildNavbar);
    window.addEventListener("load", handleLoadShowAllRecipes);

    let recipesDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("recipeDiv");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverReply");

    let url: string;

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

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

    async function handleLoadShowAllRecipes(): Promise<void> {
        getURL();

        url += "/showAll?";

        console.log(url);
        let response: Response = await fetch(url);
        let showReply: Interface.Recipe[] = await response.json();

        for (let i: number = 0; i < showReply.length; i++) {
            let post: HTMLDivElement = document.createElement("div");
            recipesDiv.appendChild(post);
            let recipeDiv: HTMLDivElement = document.createElement("div");
            recipeDiv.setAttribute("id", "recipe" + i);
            post.appendChild(recipeDiv);
            createRecipe(showReply[i], recipeDiv);
            if (localStorage.getItem("user") != undefined) {
                
                //createFavButton(showReply[i], recipeDiv);
            }
        }

    }

    async function maybeButtons(): Promise<void> {
        let user: string = localStorage.getItem("user");
        getURL();
        url += "/getFavs?" 

    }

    function createFavButton(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        let favButton: HTMLButtonElement = document.createElement("button");
        favButton.setAttribute("type", "button");
        favButton.appendChild(document.createTextNode("Favorisieren"));
        _parent.appendChild(favButton);

        favButton.dataset._id = _serverReply._id;
        favButton.dataset.parent = _parent.id;
        console.log("parent id: " + favButton.dataset.parent);
        
        favButton.addEventListener("click", handleClickFavButton);
    }

    function createNoFavButton(_parent: HTMLDivElement): void {
        let noFavButton: HTMLButtonElement = document.createElement("button");
        noFavButton.setAttribute("type", "button");
        noFavButton.appendChild(document.createTextNode("Favorisiert"));
        _parent.appendChild(noFavButton);
    }

    async function handleClickFavButton(_event: Event): Promise<void> {
        getURL();

        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;
        let parentId: string = target.dataset.parent;
        let parent: HTMLDivElement = <HTMLDivElement>document.getElementById(parentId);

        url += "/likeThis?_id=" + id + "&user=" + localStorage.getItem("user");
        console.log(url);

        let response: Response = await fetch(url);
        let favReply: string = await response.text();
        serverResponseDiv.innerHTML = favReply;

        target.classList.add("ishidden");
        createNoFavButton(parent);
    }

    function createRecipe(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        // formatting one recipe
        let author: HTMLParagraphElement = document.createElement("p");
        author.appendChild(document.createTextNode("Verfasser: " + _serverReply.author));
        _parent.appendChild(author);

        let title: HTMLElement = document.createElement("h3");
        title.appendChild(document.createTextNode(_serverReply.title));
        _parent.appendChild(title);

        let ingredients: HTMLParagraphElement = document.createElement("p");
        ingredients.appendChild(document.createTextNode("Zutaten: " + _serverReply.ingredients));
        _parent.appendChild(ingredients);

        let preparation: HTMLParagraphElement = document.createElement("p");
        preparation.appendChild(document.createTextNode("Zubereitung: " + _serverReply.preparation));
        _parent.appendChild(preparation);
    }
}
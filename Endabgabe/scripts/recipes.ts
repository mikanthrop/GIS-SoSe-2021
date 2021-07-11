import * as Interface from "../source/interface";

export namespace Endabgabe {

    window.addEventListener("load", buildNavbar);
    window.addEventListener("load", handleLoadShowAllRecipes);

    let recipesDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("recipeDiv");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverReply");

    let url: string;

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
        url = "https://gis-server-git-gud.herokuapp.com";
        //url = "http://localhost:8100";
    }

    async function handleLoadShowAllRecipes(): Promise<void> {
        getURL();

        url += "/showAll?";
        console.log(url);
        
        let showAllResponse: Response = await fetch(url);
        let showAllReply: Interface.Recipe[] = await showAllResponse.json();
        let user: string = localStorage.getItem("user");

        let favRecipes: Interface.FavsResponse;

        if (user != null) {
            favRecipes = await getFavRecipes(user);
        }

        for (let i: number = 0; i < showAllReply.length; i++) {

            let outlinePost: HTMLDivElement = document.createElement("div");
            outlinePost.classList.add("recipe-post");
            recipesDiv.appendChild(outlinePost);

            let post: HTMLDivElement = document.createElement("div");
            post.classList.add("recipe-inlay");
            post.classList.add("flexbox");
            outlinePost.appendChild(post);

            let recipeDiv: HTMLDivElement = document.createElement("div");
            recipeDiv.setAttribute("id", "recipe" + i);
            post.appendChild(recipeDiv);
            createRecipe(showAllReply[i], recipeDiv);

            if (user != undefined) {
                if (favRecipes.favs != undefined) {

                    let buttonDiv: HTMLDivElement = document.createElement("div");
                    buttonDiv.id = "buttonDiv" + i;
                    post.appendChild(buttonDiv);
                    createFavNoFavButton(user, showAllReply[i], favRecipes.favs, buttonDiv);

                } else createFavButton(showAllReply[i], recipeDiv);
            }
        }
    }

    async function getFavRecipes(_user: string): Promise<Interface.FavsResponse> {
        getURL();

        url += "/getFavs?user=" + _user;
        console.log(url);

        let response: Response = await fetch(url);
        let favRecipes: Interface.FavsResponse = await response.json();

        return favRecipes;
    }

    function createFavNoFavButton(_user: string, _recipe: Interface.Recipe, _favRecipes: Interface.Recipe[], _parent: HTMLElement): void {

        let notFaveYet: boolean = true;

        for (let i: number = 0; i < _favRecipes.length; i++) {
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

    function createFavButton(_serverReply: Interface.Recipe, _parent: HTMLElement): void {

        let favButton: HTMLButtonElement = document.createElement("button");
        favButton.setAttribute("type", "button");
        favButton.appendChild(document.createTextNode("Favorisieren"));
        _parent.appendChild(favButton);

        favButton.dataset._id = _serverReply._id;
        favButton.dataset.parent = _parent.id;

        favButton.addEventListener("click", handleClickFavButton);
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

    function createNoFavButton(_parent: HTMLElement): void {

        let noFavButton: HTMLButtonElement = document.createElement("button");
        noFavButton.setAttribute("type", "button");
        noFavButton.classList.add("nopeButton");
        noFavButton.appendChild(document.createTextNode("Favorisiert"));
        _parent.appendChild(noFavButton);

        noFavButton.addEventListener("click", handleClickNoFavButton);
    }

    function handleClickNoFavButton(): void {
        serverResponseDiv.innerText = "Bitte gehen Sie in Meine Favoriten, um ihre Favoriten zu verwalten.";
    }

    function createRecipe(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        // formatting one recipe
        let author: HTMLParagraphElement = document.createElement("p");
        let authorBold: HTMLElement = document.createElement("b");
        authorBold.appendChild(document.createTextNode(_serverReply.author));
        author.appendChild(authorBold);
        _parent.appendChild(author);

        let title: HTMLElement = document.createElement("h3");
        title.appendChild(document.createTextNode(_serverReply.title));
        _parent.appendChild(title);

        let ingredients: HTMLParagraphElement = document.createElement("p");
        let ingBold: HTMLElement = document.createElement("b");
        ingBold.appendChild(document.createTextNode("Zutaten"));
        ingredients.appendChild(ingBold);
        ingredients.appendChild(document.createTextNode(" " + _serverReply.ingredients.toString()));
        _parent.appendChild(ingredients);

        let preparation: HTMLParagraphElement = document.createElement("p");
        let prepBold: HTMLElement = document.createElement("b");
        prepBold.appendChild(document.createTextNode("Zubereitung"));
        preparation.appendChild(prepBold);
        preparation.appendChild(document.createTextNode(" " + _serverReply.preparation));
        _parent.appendChild(preparation);
    }
}
import * as Interface from "../source/interface";

export namespace Endabgabe {

    window.addEventListener("load", buildNavbar);
    if (localStorage.getItem("user") != undefined) {
        window.addEventListener("load", showMyFavs);
    } else {
        window.addEventListener("load", notYou);
    }

    let serverReplyDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverReply");
    let favoritesDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("myFavs");

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

    function notYou(): void {
        let notYou: HTMLElement = document.createElement("h2");
        notYou.classList.add("notYou");
        notYou.innerText = "Sie müssen angemeldet sein, um dieses Feature nutzen zu können.";
        favoritesDiv.appendChild(notYou);
    }

    function createDeleteButton(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        let deleteButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("Entfernen"));
        _parent.appendChild(deleteButton);

        deleteButton.dataset._id = _serverReply._id;
        deleteButton.dataset.title = _serverReply.title;

        deleteButton.addEventListener("click", handleClickDeleteFav);
    }

    async function showMyFavs(): Promise<void> {
        getURL();

        let user: string = localStorage.getItem("user");

        url += "/getFavs?" + "user=" + user;
        console.log(url);

        let showResponse: Response = await fetch(url);
        let serverReply: Interface.FavsResponse = await showResponse.json();
        console.log(serverReply);

        if (serverReply.favs != undefined) {
            let favRecipes: Interface.Recipe[] = serverReply.favs;

            for (let i: number = 0; i < favRecipes.length; i++) {

                let outlinePost: HTMLDivElement = document.createElement("div");
                outlinePost.classList.add("recipe-post");
                favoritesDiv.appendChild(outlinePost);

                let post: HTMLDivElement = document.createElement("div");
                post.classList.add("recipe-inlay");
                post.classList.add("flexbox");
                outlinePost.appendChild(post);

                let recipeDiv: HTMLDivElement = document.createElement("div");
                recipeDiv.setAttribute("id", "recipe" + i);
                post.appendChild(recipeDiv);

                let buttonDiv: HTMLDivElement = document.createElement("div");
                buttonDiv.id = "buttonDiv" + i;
                post.appendChild(buttonDiv);

                createRecipe(favRecipes[i], recipeDiv);
                createDeleteButton(favRecipes[i], buttonDiv);
            }
        } else {
            serverReplyDiv.innerHTML = "Sie haben noch keine Favoriten ausgewählt.";
        }
    }

    async function handleClickDeleteFav(_event: Event): Promise<void> {
        getURL();
        console.log("DeleteButton wurde gedrückt.");


        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;
        console.log("Titel des Rezepts, welches gelöscht werden soll: " + target.dataset.title);


        url += "/deletemyFav?" + "user=" + localStorage.getItem("user") + "&_id=" + id;
        console.log(url);

        let deleteResponse: Response = await fetch(url);
        let serverResponse: string = await deleteResponse.text();
        serverReplyDiv.innerHTML = serverResponse;

        favoritesDiv.innerHTML = "";
        showMyFavs();
    }
}
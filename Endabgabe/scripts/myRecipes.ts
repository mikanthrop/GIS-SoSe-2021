import * as Interface from "../source/interface";

export namespace Endabgabe {

    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    let loggedInDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("loggedIn");
    let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let recipeTitle: HTMLInputElement = <HTMLInputElement>document.getElementById("title");
    let ingredientInput: HTMLInputElement = <HTMLInputElement>document.getElementById("ingredient0");
    let recipePreparation: HTMLInputElement = <HTMLInputElement>document.getElementById("preparationTextfield");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverReply");
    let scriptResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("scriptReply");
    let formButtonDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("buttonDiv");
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitRecipe");
    let addIngButton: HTMLInputElement = <HTMLInputElement>document.getElementById("addIngredient");
    let myRecipesDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("recipeDiv");
    let resubmitButton: HTMLButtonElement;

    let url: string;
    let ingredientCounter: number = 0;

    window.addEventListener("load", handleShowMyRecipes);
    window.addEventListener("load", buildNavbar);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    addIngButton.addEventListener("click", handleClickAddIngredient);

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

    function createIngredientInput(_ingredientIDCounter: number): HTMLInputElement {
        let thisIngredientId: string = "ingredient" + _ingredientIDCounter;

        let nextIngredient: HTMLInputElement = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.id = thisIngredientId;
        nextIngredient.name = thisIngredientId;
        nextIngredient.placeholder = "Zutat " + (_ingredientIDCounter + 1);
        ingredientsDiv.appendChild(nextIngredient);
        return nextIngredient;
    }

    function handleClickAddIngredient(_event: Event): void {
        scriptResponseDiv.innerHTML = "";

        let thisIngredientId: string = "ingredient" + ingredientCounter;
        let newIngrInput: HTMLInputElement = <HTMLInputElement>document.getElementById(thisIngredientId);

        if (newIngrInput.value != "") {
            ingredientCounter++;
            createIngredientInput(ingredientCounter);
        } else scriptResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
    }

    function getRecipeOutOfForm(): Interface.Recipe {
        let input: HTMLInputElement = <HTMLInputElement>document.getElementById("ingredient0");
        let ingredientList: string[] = [input.value];

        //appends every ingredient to ingredientList
        for (let i: number = 1; i < ingredientsDiv.childElementCount; i++) {

            ingredientInput = <HTMLInputElement>document.getElementById("ingredient" + i);
            if (!ingredientInput.value == false) {
                ingredientList.push(ingredientInput.value);
            } 
        }

        let recipe: Interface.Recipe = { _id: "", ingredients: ingredientList, author: localStorage.getItem("user"), title: recipeTitle.value, preparation: recipePreparation.value };
        return recipe;
    }

    function createButtonDiv(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        // adding buttons

        let editButton: HTMLButtonElement = document.createElement("button");
        editButton.setAttribute("type", "button");
        editButton.appendChild(document.createTextNode("Bearbeiten"));
        _parent.appendChild(editButton);

        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("L??schen"));
        _parent.appendChild(deleteButton);

        // eventListener and their functions
        editButton.addEventListener("click", handleClickEditButton);
        deleteButton.addEventListener("click", handleClickDeleteButton);

        editButton.dataset._id = _serverReply._id.toString();
        deleteButton.dataset._id = _serverReply._id.toString();
    }

    async function handleShowMyRecipes(): Promise<void> {
        getURL();

        let user: string = localStorage.getItem("user");
        console.log(user);
        if (user == null) {
            loggedInDiv.classList.add("ishidden");
            let notYou: HTMLElement = document.createElement("h2");
            notYou.classList.add("notYou");
            notYou.appendChild(document.createTextNode("Sie m??ssen angemeldet sein, um dieses Feature nutzen zu k??nnen."));
            serverResponseDiv.appendChild(notYou);
        } else {
            url += "/showMyRecipes?" + "user=" + user;
            console.log(url);
            let response: Response = await fetch(url);
            let showReply: Interface.Recipe[] = await response.json();

            for (let i: number = 0; i < showReply.length; i++) {
                let outlinePost: HTMLDivElement = document.createElement("div");
                outlinePost.classList.add("recipe-post");
                myRecipesDiv.appendChild(outlinePost);

                let post: HTMLDivElement = document.createElement("div");
                post.classList.add("recipe-inlay");
                post.classList.add("flexbox");
                outlinePost.appendChild(post);

                let recipeDiv: HTMLDivElement = document.createElement("div");
                recipeDiv.setAttribute("id", "recipe" + i);
                post.appendChild(recipeDiv);

                let buttonDiv: HTMLDivElement = document.createElement("div");
                buttonDiv.id = "buttonDiv" + i;
                buttonDiv.classList.add("flexbox");
                post.appendChild(buttonDiv);

                createPost(showReply[i], recipeDiv);
                createButtonDiv(showReply[i], buttonDiv);
            }
        }
    }

    function createPost(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
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

    async function handleClickDeleteButton(_event: Event): Promise<void> {
        getURL();

        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;

        url += "/deleteMyRecipe?" + "_id=" + id;
        console.log(url);

        let response: Response = await fetch(url);
        let deleteReply: string = await response.text();
        serverResponseDiv.innerText = deleteReply;

        handleShowMyRecipes();
    }

    async function handleClickEditButton(_event: Event): Promise<void> {
        getURL();
        recipeForm.reset();

        // writing url with infos from button.dataset
        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;

        url += "/editMyRecipe?" + "_id=" + id;
        console.log(url);
        let response: Response = await fetch(url);
        let thisRecipe: Interface.Recipe = await response.json();

        // writing values of the recipe in question into recipeForm
        recipeTitle.value = thisRecipe.title;
        recipePreparation.value = thisRecipe.preparation;

        let firstChar: number = 0;
        let lastChar: number;
        let inputId: number = 0;

        //ingredients come back as a string, so you have to splice it
        for (let i: number = 0; i <= thisRecipe.ingredients.length; i++) {
          
            let character: string = thisRecipe.ingredients[i];
            
            if (i == thisRecipe.ingredients.length || character.includes(",")) {
                
                lastChar = i;
                // slicing the ingredient out of the ingredient string
                let inputValue: string | string[] = thisRecipe.ingredients.slice(firstChar, lastChar);
                let input: HTMLInputElement = <HTMLInputElement>document.getElementById("ingredient" + inputId);
               
                if (!input) {
                    let newInput: HTMLInputElement = createIngredientInput(inputId);
                    newInput.value = inputValue.toString();
                } else {
                    input.value = inputValue.toString();
                }

                inputId += 1;
                firstChar = i + 1;
            }
        }
        //changing submit button to resubmit button and adding the eventlistener onto it
        submitButton.classList.add("ishidden");

        let checkResub: HTMLButtonElement = <HTMLButtonElement>document.getElementById("resubmitButton");

        if (!checkResub == true) {

            resubmitButton = document.createElement("button");
            resubmitButton.setAttribute("type", "button");
            resubmitButton.setAttribute("id", "resubmitButton");
            resubmitButton.appendChild(document.createTextNode("Rezept ??ndern"));
            formButtonDiv.appendChild(resubmitButton);

            resubmitButton.addEventListener("click", handleClickResubmitRecipe);
            resubmitButton.dataset._id = id;
        }
    }

    async function handleClickResubmitRecipe(_event: Event): Promise<void> {
        getURL();

        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;

        let recipe: Interface.Recipe = getRecipeOutOfForm();
        recipe._id = id;

        console.log("Resubmit Recipe wurde gedr??ckt.");
        url += "/resubmitMyRecipe?" + "_id=" + recipe._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
        console.log(url);

        let response: Response = await fetch(url);
        let resubmitReply: string = await response.text();
        serverResponseDiv.innerText = resubmitReply;

        submitButton.classList.remove("ishidden");
        resubmitButton.remove();
        recipeForm.reset();
        handleShowMyRecipes();
        cleanUpInputs();
    }

    async function handleClickSubmitRecipe(): Promise<void> {
        scriptResponseDiv.innerHTML = "";
        console.log("Submit Recipe wurde gedr??ckt.");
        getURL();

        if (!recipeTitle.value) scriptResponseDiv.innerHTML = "Bitte geben Sie einen Titel ein.";
        else if (!ingredientInput.value) scriptResponseDiv.innerHTML = "Bitte geben Sie eine Zutat ein.";
        else if (!recipePreparation.value) scriptResponseDiv.innerHTML = "Bitte geben Sie an, wie das Gericht zubereitet wird.";
        else {

            let recipe: Interface.Recipe = getRecipeOutOfForm();

            // gotta make the query by myself
            url += "/submitRecipe?title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
            console.log(url);
            let response: Response = await fetch(url);
            let displayResponse: string = await response.text();
            serverResponseDiv.innerText = displayResponse;

            recipeForm.reset();
            myRecipesDiv.innerHTML = "";
            handleShowMyRecipes();
            cleanUpInputs();
        }
    }

    function cleanUpInputs(): void {
        let size: number = ingredientsDiv.children.length;

        for (let i: number = size - 1; i >= 1; i--) {

            let inputId: string = "ingredient" + i;
            document.getElementById(inputId).remove();
        }
    }
}

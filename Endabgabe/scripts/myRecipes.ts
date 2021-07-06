import * as Interface from "../source/interface";
//import { GeneralFunctions } from "./general";

export namespace Endabgabe {

    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    let loggedInDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("loggedIn");
    let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let recipeTitle: HTMLInputElement = <HTMLInputElement>document.getElementById("title");
    let ingredientInput: HTMLInputElement = <HTMLInputElement>document.getElementById("ingredient0");
    let recipePreparation: HTMLInputElement = <HTMLInputElement>document.getElementById("preparationTextfield");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let scriptResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("scriptResponse");
    let formButtonDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("buttonDiv");
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitRecipe");
    let addIngButton: HTMLInputElement = <HTMLInputElement>document.getElementById("addIngredient");
    let resubmitButton: HTMLButtonElement;

    //let query: URLSearchParams;
    let url: string;
    //let recipeData: FormData;
    let ingredientCounter: number = 0;

    window.addEventListener("load", handleShowMyRecipes);
    window.addEventListener("load", buildNavbar);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    addIngButton.addEventListener("click", handleClickAddIngredient);

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

    function createPost(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
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

    function createIngredientInput(_ingredientIDCounter: number): HTMLInputElement {
        let thisIngredientId: string = "ingredient" + _ingredientIDCounter;

        let nextIngredient: HTMLInputElement = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.id = thisIngredientId;
        nextIngredient.name = thisIngredientId;
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

        console.log("------------allererste Zutatenliste: " + ingredientList + "-------------");

        //appends every ingredient to ingredientList
        for (let i: number = 1; i < ingredientsDiv.childElementCount; i++) {
            console.log("----------i'm in------------");
            console.log("child Elements " + ingredientsDiv.childElementCount);
            ingredientInput = <HTMLInputElement>document.getElementById("ingredient" + i);
            console.log("value " + ingredientInput.value);
            console.log(!ingredientInput.value);
            if (!ingredientInput.value == false) {
                ingredientList.push(ingredientInput.value);
            } else console.log("--------------i'm out--------------");

            console.log("Zutatenliste " + ingredientList);
        }
        let recipe: Interface.Recipe = { _id: "", ingredients: ingredientList, author: localStorage.getItem("user"), title: recipeTitle.value, preparation: recipePreparation.value };
        console.log("recipe ", recipe);
        return recipe;
    }

    function createButtonDiv(_serverReply: Interface.Recipe, _parent: HTMLDivElement): void {
        // adding buttons
        let postButtonDiv: HTMLDivElement = document.createElement("div");
        _parent.appendChild(postButtonDiv);

        let editButton: HTMLButtonElement = document.createElement("button");
        editButton.setAttribute("type", "button");
        editButton.appendChild(document.createTextNode("Bearbeiten"));
        postButtonDiv.appendChild(editButton);

        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("Löschen"));
        postButtonDiv.appendChild(deleteButton);

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
            notYou.appendChild(document.createTextNode("Sie müssen angemeldet sein, um dieses Feature nutzen zu können."));
            serverResponseDiv.appendChild(notYou);
        } else {
            url += "/showMyRecipes?" + "user=" + user;
            console.log(url);
            let response: Response = await fetch(url);
            let showReply: Interface.Recipe[] = await response.json();

            for (let i: number = 0; i < showReply.length; i++) {
                let post: HTMLDivElement = document.createElement("div");
                serverResponseDiv.appendChild(post);
                createPost(showReply[i], post);
                createButtonDiv(showReply[i], post);
            }
        }
    }

    async function handleClickDeleteButton(_event: Event): Promise<void> {
        getURL();

        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;

        url += "/deleteMyRecipe?" + "_id=" + id;
        console.log(url);

        let response: Response = await fetch(url);
        let deleteReply: string = await response.text();
        serverResponseDiv.innerHTML = deleteReply;

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
        let recipe: Interface.Recipe[] = await response.json();
        let thisRecipe: Interface.Recipe = recipe[0];
        

        // writing values of the recipe in question into recipeForm
        recipeTitle.value = thisRecipe.title;
        console.log("title: " + thisRecipe.title);

        console.log("ingredients: " + thisRecipe.ingredients);

        recipePreparation.value = thisRecipe.preparation;
        console.log("preparation: " + thisRecipe.preparation);

        let firstChar: number = 0;
        let lastChar: number;
        let inputId: number = 0;

        //ingredients come back as a string, so you have to splice it
        for (let i: number = 0; i <= thisRecipe.ingredients.length; i++) {
            let character: string = thisRecipe.ingredients[i];
            if (i == thisRecipe.ingredients.length || character.includes(",")) {
                lastChar = i;
                console.log("Stelle nach der letzten Stelle der Zutat: " + lastChar);
                // slicing the ingredient out of the ingredient string
                let inputValue: string | string[] = thisRecipe.ingredients.slice(firstChar, lastChar);
                console.log("tatsächliche Zutat: " + inputValue.toString());

                console.log("id des nächsten inputs: " + inputId);

                // looking for input whom to fill with inputValue
                let input: HTMLInputElement = <HTMLInputElement>document.getElementById("ingredient" + inputId);
                // if input does not exist
                if (!input) {
                    //create the input Element
                    let newInput: HTMLInputElement = createIngredientInput(inputId);
                    newInput.value = inputValue.toString();
                } else {
                    input.value = inputValue.toString();
                }
                inputId += 1;
                firstChar = i + 1;
                console.log("erste Stelle der nächsten Zutat: " + firstChar);
            }
        }
        //changing submit button to resubmit button and adding the eventlistener onto it
        submitButton.classList.add("ishidden");

        let checkResub: HTMLButtonElement = <HTMLButtonElement>document.getElementById("resubmitButton");
        console.log("resubmit: ", !checkResub);

        if (!checkResub == true) {
            resubmitButton = document.createElement("button");
            resubmitButton.setAttribute("type", "button");
            resubmitButton.setAttribute("id", "resubmitButton");
            resubmitButton.appendChild(document.createTextNode("Rezept ändern"));
            formButtonDiv.appendChild(resubmitButton);

            resubmitButton.addEventListener("click", handleClickResubmitRecipe);
            resubmitButton.dataset._id = id;
        }
        let _id: string = thisRecipe._id;
        console.log("id " + _id);
    }

    async function handleClickResubmitRecipe(_event: Event): Promise<void> {
        getURL();

        let target: HTMLElement = <HTMLElement>_event.currentTarget;
        let id: string = target.dataset._id;

        let recipe: Interface.Recipe = getRecipeOutOfForm();
        recipe._id = id;
        console.log(recipe._id);


        console.log("Resubmit Recipe wurde gedrückt.");
        url += "/resubmitMyRecipe?" + "_id=" + recipe._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
        console.log("z190: " + url);

        let response: Response = await fetch(url);
        let resubmitReply: string = await response.text();
        serverResponseDiv.innerHTML = resubmitReply;

        submitButton.classList.remove("ishidden");
        resubmitButton.remove();
        recipeForm.reset();
        handleShowMyRecipes();
        cleanUpInputs();
    }

    async function handleClickSubmitRecipe(): Promise<void> {
        scriptResponseDiv.innerHTML = "";
        console.log("Submit Recipe wurde gedrückt.");
        getURL();

        console.log(ingredientsDiv.childElementCount);

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
            serverResponseDiv.innerHTML = displayResponse;

            recipeForm.reset();
            handleShowMyRecipes();
            cleanUpInputs();
        }
    }

    function cleanUpInputs(): void {
        let size: number = ingredientsDiv.children.length;
        console.log("Anzahl der Inputs: " + size);
        for (let i: number = size - 1; i >= 1; i--) {
            let inputId: string = "ingredient" + i;
            document.getElementById(inputId).remove();
        }
    }
}

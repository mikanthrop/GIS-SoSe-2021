import * as Interface from "../source/interface";

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

    //let query: URLSearchParams;
    let url: string;
    //let recipeData: FormData;
    let ingredientList: string[];
    let ingredientCount: number = 0;

    window.addEventListener("load", handleShowMyRecipes);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function handleClickAddIngredient(): void {
        serverResponseDiv.innerHTML = "";

        let thisIngredient: string = "ingredient" + ingredientCount;
        ingredientInput = <HTMLInputElement>document.getElementById(thisIngredient);

        if (ingredientInput.value != "") {
            ingredientCount++;
            thisIngredient = "ingredient" + ingredientCount;

            let nextIngredient: HTMLInputElement = document.createElement("input");
            nextIngredient.type = "text";
            nextIngredient.id = thisIngredient;
            nextIngredient.name = thisIngredient;
            ingredientsDiv.appendChild(nextIngredient);

        } else serverResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
    }

    function getRecipeOutOfForm(): Interface.Recipe {
        ingredientList = [ingredientInput.value];
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

            for (let i in showReply) {
                // formatting one recipe
                let post: HTMLDivElement = document.createElement("div");
                serverResponseDiv.appendChild(post);

                let author: HTMLParagraphElement = document.createElement("p");
                author.appendChild(document.createTextNode("Verfasser: " + showReply[i].author));
                post.appendChild(author);

                let title: HTMLElement = document.createElement("h3");
                title.appendChild(document.createTextNode(showReply[i].title));
                post.appendChild(title);

                let ingredients: HTMLParagraphElement = document.createElement("p");
                ingredients.appendChild(document.createTextNode("Zutaten: " + showReply[i].ingredients));
                post.appendChild(ingredients);

                let preparation: HTMLParagraphElement = document.createElement("p");
                preparation.appendChild(document.createTextNode("Zubereitung: " + showReply[i].preparation));
                post.appendChild(preparation);

                // adding buttons
                let postButtonDiv: HTMLDivElement = document.createElement("div");
                post.appendChild(postButtonDiv);

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

                async function handleClickEditButton(): Promise<void> {
                    getURL();

                    url += "/editMyRecipe?" + "_id=" + showReply[i]._id;
                    console.log(url);

                    ingredientInput = <HTMLInputElement>document.getElementById("ingredient0");

                    let response: Response = await fetch(url);
                    let thisRecipe: Interface.Recipe[] = await response.json();

                    // writing values of the recipe in question into recipeForm
                    recipeTitle.value = thisRecipe[0].title;
                    console.log("title: " + thisRecipe[0].title);

                    recipePreparation.value = thisRecipe[0].preparation;
                    console.log("preparation: " + thisRecipe[0].preparation);

                    ingredientInput.value = thisRecipe[0].ingredients[0];
                    console.log("First ingredient: " + thisRecipe[0].ingredients[0]);

                    for (let i: number = 1; i < thisRecipe[0].ingredients.length; i++) {

                        let newIngredient: HTMLInputElement = document.createElement("input");
                        newIngredient.setAttribute("type", "text");
                        newIngredient.setAttribute("id", "ingredient" + i);
                        ingredientsDiv.appendChild(newIngredient);
                        newIngredient.value = thisRecipe[0].ingredients[i];
                        console.log(i + ". ingredient: " + thisRecipe[0].ingredients[i]);
                    }

                    //changing submit button to resubmit button and adding the eventlistener onto it
                    submitButton.classList.add("ishidden");

                    let resubmitButton: HTMLButtonElement = document.createElement("button");
                    resubmitButton.setAttribute("type", "button");
                    resubmitButton.appendChild(document.createTextNode("Rezept ändern"));
                    formButtonDiv.appendChild(resubmitButton);

                    resubmitButton.addEventListener("click", handleClickResubmitRecipe);

                    async function handleClickResubmitRecipe(): Promise<void> {
                        let recipe: Interface.Recipe = getRecipeOutOfForm();

                        url += "/resubmitRecipe?_id" + thisRecipe[0]._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
                        console.log(url);

                        let response: Response = await fetch(url);
                        let resubmitReply: string = await response.text();
                        serverResponseDiv.innerHTML = resubmitReply;
                    }
                }

                async function handleClickDeleteButton(): Promise<void> {
                    getURL();

                    url += "/deleteMyRecipe?" + "_id=" + showReply[i]._id;
                    console.log(url);

                    let response: Response = await fetch(url);
                    let deleteReply: string = await response.text();
                    serverResponseDiv.innerHTML = deleteReply;

                    handleShowMyRecipes();
                }
            }
        }
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
        }
    } 
}

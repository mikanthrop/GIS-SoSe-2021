"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
var Endabgabe;
(function (Endabgabe) {
    let ingredientsDiv = document.getElementById("ingredients");
    let loggedInDiv = document.getElementById("loggedIn");
    let recipeForm = document.getElementById("recipeForm");
    let recipeTitle = document.getElementById("title");
    let ingredientInput = document.getElementById("ingredient0");
    let recipePreparation = document.getElementById("preparationTextfield");
    let serverResponseDiv = document.getElementById("serverResponse");
    let scriptResponseDiv = document.getElementById("scriptResponse");
    let formButtonDiv = document.getElementById("buttonDiv");
    let submitButton = document.getElementById("submitRecipe");
    //let query: URLSearchParams;
    let url;
    //let recipeData: FormData;
    let ingredientList;
    let ingredientCount = 0;
    window.addEventListener("load", handleShowMyRecipes);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function handleClickAddIngredient() {
        serverResponseDiv.innerHTML = "";
        let thisIngredient = "ingredient" + ingredientCount;
        ingredientInput = document.getElementById(thisIngredient);
        if (ingredientInput.value != "") {
            ingredientCount++;
            thisIngredient = "ingredient" + ingredientCount;
            let nextIngredient = document.createElement("input");
            nextIngredient.type = "text";
            nextIngredient.id = thisIngredient;
            nextIngredient.name = thisIngredient;
            ingredientsDiv.appendChild(nextIngredient);
        }
        else
            serverResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
    }
    function getRecipeOutOfForm() {
        ingredientList = [ingredientInput.value];
        //appends every ingredient to ingredientList
        for (let i = 1; i < ingredientsDiv.childElementCount; i++) {
            console.log("----------i'm in------------");
            console.log("child Elements " + ingredientsDiv.childElementCount);
            ingredientInput = document.getElementById("ingredient" + i);
            console.log("value " + ingredientInput.value);
            console.log(!ingredientInput.value);
            if (!ingredientInput.value == false) {
                ingredientList.push(ingredientInput.value);
            }
            else
                console.log("--------------i'm out--------------");
            console.log("Zutatenliste " + ingredientList);
        }
        let recipe = { _id: "", ingredients: ingredientList, author: localStorage.getItem("user"), title: recipeTitle.value, preparation: recipePreparation.value };
        console.log("recipe ", recipe);
        return recipe;
    }
    async function handleShowMyRecipes() {
        getURL();
        let user = localStorage.getItem("user");
        console.log(user);
        if (user == null) {
            loggedInDiv.classList.add("ishidden");
            let notYou = document.createElement("h2");
            notYou.appendChild(document.createTextNode("Sie müssen angemeldet sein, um dieses Feature nutzen zu können."));
            serverResponseDiv.appendChild(notYou);
        }
        else {
            url += "/showMyRecipes?" + "user=" + user;
            console.log(url);
            let response = await fetch(url);
            let showReply = await response.json();
            for (let i in showReply) {
                // formatting one recipe
                let post = document.createElement("div");
                serverResponseDiv.appendChild(post);
                let author = document.createElement("p");
                author.appendChild(document.createTextNode("Verfasser: " + showReply[i].author));
                post.appendChild(author);
                let title = document.createElement("h3");
                title.appendChild(document.createTextNode(showReply[i].title));
                post.appendChild(title);
                let ingredients = document.createElement("p");
                ingredients.appendChild(document.createTextNode("Zutaten: " + showReply[i].ingredients));
                post.appendChild(ingredients);
                let preparation = document.createElement("p");
                preparation.appendChild(document.createTextNode("Zubereitung: " + showReply[i].preparation));
                post.appendChild(preparation);
                // adding buttons
                let postButtonDiv = document.createElement("div");
                post.appendChild(postButtonDiv);
                let editButton = document.createElement("button");
                editButton.setAttribute("type", "button");
                editButton.appendChild(document.createTextNode("Bearbeiten"));
                postButtonDiv.appendChild(editButton);
                let deleteButton = document.createElement("button");
                deleteButton.setAttribute("type", "button");
                deleteButton.appendChild(document.createTextNode("Löschen"));
                postButtonDiv.appendChild(deleteButton);
                // eventListener and their functions
                editButton.addEventListener("click", handleClickEditButton);
                deleteButton.addEventListener("click", handleClickDeleteButton);
                async function handleClickEditButton() {
                    getURL();
                    url += "/editMyRecipe?" + "_id=" + showReply[i]._id;
                    console.log(url);
                    ingredientInput = document.getElementById("ingredient0");
                    let response = await fetch(url);
                    let thisRecipe = await response.json();
                    // writing values of the recipe in question into recipeForm
                    recipeTitle.value = thisRecipe[0].title;
                    console.log("title: " + thisRecipe[0].title);
                    recipePreparation.value = thisRecipe[0].preparation;
                    console.log("preparation: " + thisRecipe[0].preparation);
                    ingredientInput.value = thisRecipe[0].ingredients[0];
                    console.log("First ingredient: " + thisRecipe[0].ingredients[0]);
                    for (let i = 1; i < thisRecipe[0].ingredients.length; i++) {
                        let newIngredient = document.createElement("input");
                        newIngredient.setAttribute("type", "text");
                        newIngredient.setAttribute("id", "ingredient" + i);
                        ingredientsDiv.appendChild(newIngredient);
                        newIngredient.value = thisRecipe[0].ingredients[i];
                        console.log(i + ". ingredient: " + thisRecipe[0].ingredients[i]);
                    }
                    //changing submit button to resubmit button and adding the eventlistener onto it
                    submitButton.classList.add("ishidden");
                    let resubmitButton = document.createElement("button");
                    resubmitButton.setAttribute("type", "button");
                    resubmitButton.appendChild(document.createTextNode("Rezept ändern"));
                    formButtonDiv.appendChild(resubmitButton);
                    resubmitButton.addEventListener("click", handleClickResubmitRecipe);
                    async function handleClickResubmitRecipe() {
                        let recipe = getRecipeOutOfForm();
                        url += "/submitRecipe?_id" + thisRecipe[0]._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
                        console.log(url);
                        let response = await fetch(url);
                        let resubmitReply = await response.text();
                        serverResponseDiv.innerHTML = resubmitReply;
                    }
                }
                async function handleClickDeleteButton() {
                    getURL();
                    url += "/deleteMyRecipe?" + "_id=" + showReply[i]._id;
                    console.log(url);
                    let response = await fetch(url);
                    let deleteReply = await response.text();
                    serverResponseDiv.innerHTML = deleteReply;
                    handleShowMyRecipes();
                }
            }
        }
    }
    async function handleClickSubmitRecipe() {
        scriptResponseDiv.innerHTML = "";
        console.log("Submit Recipe wurde gedrückt.");
        getURL();
        console.log(ingredientsDiv.childElementCount);
        if (!recipeTitle.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie einen Titel ein.";
        else if (!ingredientInput.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie eine Zutat ein.";
        else if (!recipePreparation.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie an, wie das Gericht zubereitet wird.";
        else {
            let recipe = getRecipeOutOfForm();
            // gotta make the query by myself
            url += "/submitRecipe?title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
            console.log(url);
            let response = await fetch(url);
            let displayResponse = await response.text();
            serverResponseDiv.innerHTML = displayResponse;
            recipeForm.reset();
            handleShowMyRecipes();
        }
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
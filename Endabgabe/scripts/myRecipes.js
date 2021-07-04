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
    let resubmitButton;
    //let query: URLSearchParams;
    let url;
    //let recipeData: FormData;
    let thisIngredient;
    let ingredientList = [""];
    let ingredientCount = 0;
    let _id;
    window.addEventListener("load", handleShowMyRecipes);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function createIngredientInput() {
        ingredientCount++;
        thisIngredient = "ingredient" + ingredientCount;
        let nextIngredient = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.id = thisIngredient;
        nextIngredient.name = thisIngredient;
        ingredientsDiv.appendChild(nextIngredient);
        //return nextIngredient;
    }
    function handleClickAddIngredient() {
        scriptResponseDiv.innerHTML = "";
        thisIngredient = "ingredient" + ingredientCount;
        ingredientInput = document.getElementById(thisIngredient);
        if (ingredientInput.value != "") {
            createIngredientInput();
        }
        else
            scriptResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
    }
    function getRecipeOutOfForm() {
        let input = document.getElementById("ingredient0");
        ingredientList[0] = input.value;
        console.log("------------allererste Zutatenliste: " + ingredientList + "-------------");
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
                    recipeForm.reset();
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
                    //ingredientInput.value = "";
                    //console.log("First ingredient: " + thisRecipe[0].ingredients);
                    let ingredientsArray = [""];
                    let newIngredient = "";
                    //ingredients gets chopped into one character strings, so I have to put them back together
                    for (let i = 0; i < thisRecipe[0].ingredients.length; i++) {
                        let character = thisRecipe[0].ingredients[i];
                        if (character.includes(",")) {
                            ingredientsArray.push(newIngredient);
                            newIngredient = "";
                            console.log("Ein wildes Komma ist aufgetaucht.");
                        }
                        else {
                            if (i < thisRecipe[0].ingredients.length - 1) {
                                newIngredient += character;
                                console.log("next Ingredient: " + newIngredient);
                            }
                            else {
                                newIngredient += character;
                                ingredientsArray.push(newIngredient);
                            }
                        }
                    }
                    console.log("Anzahl der Zutaten: " + ingredientsArray.length);
                    ingredientInput.value = ingredientsArray[1];
                    // appending ingredients to the form
                    for (let i = 2; i < ingredientsArray.length; i++) {
                        createIngredientInput();
                        console.log("ingredientCounter: " + ingredientCount);
                        let nextInput = document.getElementById("ingredient" + ingredientCount);
                        nextInput.value = ingredientsArray[i];
                    }
                    console.log("Liste der Zutaten: ", ingredientsArray);
                    //changing submit button to resubmit button and adding the eventlistener onto it
                    submitButton.classList.add("ishidden");
                    let checkResub = document.getElementById("resubmitButton");
                    console.log("resubmit: ", !checkResub);
                    if (!checkResub == true) {
                        resubmitButton = document.createElement("button");
                        resubmitButton.setAttribute("type", "button");
                        resubmitButton.setAttribute("id", "resubmitButton");
                        resubmitButton.appendChild(document.createTextNode("Rezept ändern"));
                        formButtonDiv.appendChild(resubmitButton);
                        resubmitButton.addEventListener("click", handleClickResubmitRecipe);
                    }
                    _id = thisRecipe[0]._id;
                    console.log("id " + _id);
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
                async function handleClickResubmitRecipe() {
                    getURL();
                    let recipe = getRecipeOutOfForm();
                    recipe._id = _id;
                    console.log(recipe._id);
                    console.log("Resubmit Recipe wurde gedrückt.");
                    url += "/resubmitMyRecipe?" + "_id=" + recipe._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
                    console.log("z190: " + url);
                    let response = await fetch(url);
                    let resubmitReply = await response.text();
                    serverResponseDiv.innerHTML = resubmitReply;
                    submitButton.classList.remove("ishidden");
                    resubmitButton.remove();
                    recipeForm.reset();
                    recipe.ingredients = [""];
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
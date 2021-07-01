"use strict";
var Endabgabe;
(function (Endabgabe) {
    let ingredientsDiv = document.getElementById("ingredients");
    let loggedInDiv = document.getElementById("loggedIn");
    let recipeForm = document.getElementById("recipeForm");
    let serverResponseDiv = document.getElementById("serverResponse");
    let scriptResponseDiv = document.getElementById("scriptResponse");
    let query;
    let ingredientInput;
    let url;
    let recipeData;
    let ingredientList;
    let ingredientCount = 0;
    window.addEventListener("load", handleLoggedIn);
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    function handleLoggedIn() {
        console.log(localStorage.getItem("user"));
        if (localStorage.getItem("user") == null) {
            loggedInDiv.classList.add("ishidden");
            let notYou = document.createElement("h2");
            notYou.innerHTML = "Sie müssen angemeldet sein, um dieses Feature nutzen zu können.";
            serverResponseDiv.appendChild(notYou);
        }
    }
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
    async function handleClickSubmitRecipe() {
        scriptResponseDiv.innerHTML = "";
        console.log("Submit Recipe wurde gedrückt.");
        getURL();
        console.log(ingredientsDiv.childElementCount);
        let recipeTitle = document.getElementById("title");
        ingredientInput = document.getElementById("ingredient0");
        let recipePreparation = document.getElementById("preparationTextfield");
        if (!recipeTitle.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie einen Titel ein.";
        else if (!ingredientInput.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie eine Zutat ein.";
        else if (!recipePreparation.value)
            scriptResponseDiv.innerHTML = "Bitte geben Sie an, wie das Gericht zubereitet wird.";
        else {
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
            let recipe = { ingredients: ingredientList, author: localStorage.getItem("user"), title: recipeTitle.value, preparation: recipePreparation.value };
            console.log("recipe ", recipe);
            // gotta make the query by myself
            url += "/submit?title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
            console.log(url);
            let response = await fetch(url);
            let displayResponse = await response.text();
            serverResponseDiv.innerHTML = displayResponse;
            recipeForm.reset();
        }
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
"use strict";
var Endabgabe;
(function (Endabgabe) {
    let serverResponseDiv = document.getElementById("serverResponse");
    let query;
    let ingredientInput;
    let url;
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    let ingredientsDiv = document.getElementById("ingredients");
    let recipeForm = document.getElementById("recipeForm");
    let recipeData;
    let ingredientList;
    let ingredientCount = 0;
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
        console.log("Submit Recipe wurde gedrückt.");
        getURL();
        let recipe;
        console.log(ingredientsDiv.childElementCount);
        ingredientInput = document.getElementById("ingredient0");
        ingredientList = [ingredientInput.value];
        //appends every ingredient to ingredientList
        for (let i = 1; i < ingredientsDiv.childElementCount; i++) {
            console.log("----------i'm in------------");
            ingredientInput = document.getElementById("ingredient" + i);
            console.log(ingredientInput.value);
            ingredientList.push(ingredientInput.value);
            console.log(ingredientList);
        }
        recipe.ingredients = ingredientList;
        console.log(recipeData.getAll("ingredient"));
        // gotta make the query by myself
        url += "/submit?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
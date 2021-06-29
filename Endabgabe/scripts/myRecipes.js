"use strict";
var Endabgabe;
(function (Endabgabe) {
    let serverResponseDiv = document.getElementById("serverResponse");
    let query;
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
    function setQuery(_formData) {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(_formData);
    }
    function handleClickAddIngredient() {
        serverResponseDiv.innerHTML = "";
        //console.log("valueOf", recipeData.get("ingredient0").valueOf());
        let thisIngredient = "ingredient" + ingredientCount;
        console.log(thisIngredient);
        let ingredientInput = document.getElementById(thisIngredient);
        //console.log(ingredientInput.value);
        console.log("im input " + ingredientCount + " steht " + recipeData.get("ingredient0"));
        //hier nicht sicher ob != "" oder != null oder != undefined richtig ist, 
        //alles funktioniert nicht so richtig
        if (ingredientInput != null) {
            console.log("----------i'm in---------------");
            let nextIngredient = document.createElement("input");
            nextIngredient.type = "text";
            nextIngredient.name = "ingredient" + ingredientCount;
            ingredientsDiv.appendChild(nextIngredient);
            ingredientCount++;
        }
        else {
            serverResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
        }
    }
    async function handleClickSubmitRecipe() {
        console.log("Submit Recipe wurde gedrückt.");
        getURL();
        let recipe;
        recipe.ingredients = ingredientList;
        console.log(recipeData.getAll("ingredient"));
        setQuery(recipeData);
        url += "/submit?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
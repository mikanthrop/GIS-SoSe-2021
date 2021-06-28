"use strict";
var Endabgabe;
(function (Endabgabe) {
    let formData;
    let serverResponseDiv = document.getElementById("serverResponse");
    let query;
    let url;
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    let ingredientsDiv = document.getElementById("ingredients");
    let recipeForm = document.getElementById("recipeForm");
    let ingredientList;
    let ingredientCount = 1;
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function setQuery(_formData) {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(_formData);
    }
    function handleClickAddIngredient() {
        let nextIngredient = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.name = "ingredient" + ingredientCount;
        ingredientCount++;
        ingredientsDiv.appendChild(nextIngredient);
    }
    async function handleClickSubmitRecipe() {
        console.log("Submit Recipe wurde gedrückt.");
        getURL();
        formData = new FormData(recipeForm);
        console.log(formData.getAll("ingredient"));
        setQuery(formData);
        url += "/submit?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
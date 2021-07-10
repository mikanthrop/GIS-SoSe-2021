"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
//import { GeneralFunctions } from "./general";
var Endabgabe;
(function (Endabgabe) {
    let ingredientsDiv = document.getElementById("ingredients");
    let loggedInDiv = document.getElementById("loggedIn");
    let recipeForm = document.getElementById("recipeForm");
    let recipeTitle = document.getElementById("title");
    let ingredientInput = document.getElementById("ingredient0");
    let recipePreparation = document.getElementById("preparationTextfield");
    let serverResponseDiv = document.getElementById("serverReply");
    let scriptResponseDiv = document.getElementById("scriptReply");
    let formButtonDiv = document.getElementById("buttonDiv");
    let submitButton = document.getElementById("submitRecipe");
    let addIngButton = document.getElementById("addIngredient");
    let myRecipesDiv = document.getElementById("recipeDiv");
    let resubmitButton;
    //let query: URLSearchParams;
    let url;
    //let recipeData: FormData;
    let ingredientCounter = 0;
    window.addEventListener("load", handleShowMyRecipes);
    window.addEventListener("load", buildNavbar);
    submitButton.addEventListener("click", handleClickSubmitRecipe);
    addIngButton.addEventListener("click", handleClickAddIngredient);
    function buildNavbar() {
        let user = localStorage.getItem("user");
        let navBar = document.getElementById("navBar");
        let recipesLink = document.createElement("a");
        recipesLink.setAttribute("href", "../html/recipes.html");
        navBar.appendChild(recipesLink);
        let recipesHLine = document.createElement("h2");
        recipesHLine.appendChild(document.createTextNode("Rezepte"));
        recipesLink.appendChild(recipesHLine);
        if (user == null) {
            let loginLink = document.createElement("a");
            loginLink.setAttribute("href", "../html/login.html");
            navBar.appendChild(loginLink);
            let loginHLine = document.createElement("h2");
            loginHLine.appendChild(document.createTextNode("Login"));
            loginLink.appendChild(loginHLine);
            navBar.classList.add("navBar-padding");
        }
        else {
            let myFavoritesLink = document.createElement("a");
            myFavoritesLink.setAttribute("href", "../html/myFavorites.html");
            navBar.appendChild(myFavoritesLink);
            let myFavoritesHLine = document.createElement("h2");
            myFavoritesHLine.appendChild(document.createTextNode("Meine Favoriten"));
            myFavoritesLink.appendChild(myFavoritesHLine);
            let myRecipesLink = document.createElement("a");
            myRecipesLink.setAttribute("href", "../html/myRecipes.html");
            navBar.appendChild(myRecipesLink);
            let myRecipesHLine = document.createElement("h2");
            myRecipesHLine.appendChild(document.createTextNode("Meine Rezepte"));
            myRecipesLink.appendChild(myRecipesHLine);
            let userDiv = document.createElement("div");
            navBar.appendChild(userDiv);
            let loggedIn = document.createElement("h4");
            loggedIn.innerText = user;
            userDiv.appendChild(loggedIn);
            let logout = document.createElement("button");
            logout.setAttribute("type", "button");
            logout.innerText = "Logout";
            userDiv.appendChild(logout);
            logout.addEventListener("click", logOut);
        }
    }
    function logOut() {
        localStorage.removeItem("user");
        window.open("../html/login.html", "_self");
    }
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }
    function createIngredientInput(_ingredientIDCounter) {
        let thisIngredientId = "ingredient" + _ingredientIDCounter;
        let nextIngredient = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.id = thisIngredientId;
        nextIngredient.name = thisIngredientId;
        nextIngredient.placeholder = "Zutat " + (_ingredientIDCounter + 1);
        ingredientsDiv.appendChild(nextIngredient);
        return nextIngredient;
    }
    function handleClickAddIngredient(_event) {
        scriptResponseDiv.innerHTML = "";
        let thisIngredientId = "ingredient" + ingredientCounter;
        let newIngrInput = document.getElementById(thisIngredientId);
        if (newIngrInput.value != "") {
            ingredientCounter++;
            createIngredientInput(ingredientCounter);
        }
        else
            scriptResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
    }
    function getRecipeOutOfForm() {
        let input = document.getElementById("ingredient0");
        let ingredientList = [input.value];
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
    function createButtonDiv(_serverReply, _parent) {
        // adding buttons
        let editButton = document.createElement("button");
        editButton.setAttribute("type", "button");
        editButton.appendChild(document.createTextNode("Bearbeiten"));
        _parent.appendChild(editButton);
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.appendChild(document.createTextNode("Löschen"));
        _parent.appendChild(deleteButton);
        // eventListener and their functions
        editButton.addEventListener("click", handleClickEditButton);
        deleteButton.addEventListener("click", handleClickDeleteButton);
        editButton.dataset._id = _serverReply._id.toString();
        deleteButton.dataset._id = _serverReply._id.toString();
    }
    async function handleShowMyRecipes() {
        getURL();
        let user = localStorage.getItem("user");
        console.log(user);
        if (user == null) {
            loggedInDiv.classList.add("ishidden");
            let notYou = document.createElement("h2");
            notYou.classList.add("notYou");
            notYou.appendChild(document.createTextNode("Sie müssen angemeldet sein, um dieses Feature nutzen zu können."));
            serverResponseDiv.appendChild(notYou);
        }
        else {
            url += "/showMyRecipes?" + "user=" + user;
            console.log(url);
            let response = await fetch(url);
            let showReply = await response.json();
            for (let i = 0; i < showReply.length; i++) {
                let outlinePost = document.createElement("div");
                outlinePost.classList.add("recipe-post");
                myRecipesDiv.appendChild(outlinePost);
                let post = document.createElement("div");
                post.classList.add("recipe-inlay");
                post.classList.add("flexbox");
                outlinePost.appendChild(post);
                let recipeDiv = document.createElement("div");
                recipeDiv.setAttribute("id", "recipe" + i);
                post.appendChild(recipeDiv);
                let buttonDiv = document.createElement("div");
                buttonDiv.id = "buttonDiv" + i;
                buttonDiv.classList.add("flexbox");
                post.appendChild(buttonDiv);
                createPost(showReply[i], recipeDiv);
                createButtonDiv(showReply[i], buttonDiv);
            }
        }
    }
    function createPost(_serverReply, _parent) {
        // formatting one recipe
        let author = document.createElement("p");
        let authorBold = document.createElement("b");
        authorBold.appendChild(document.createTextNode(_serverReply.author));
        author.appendChild(authorBold);
        _parent.appendChild(author);
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode(_serverReply.title));
        _parent.appendChild(title);
        let ingredients = document.createElement("p");
        let ingBold = document.createElement("b");
        ingBold.appendChild(document.createTextNode("Zutaten"));
        ingredients.appendChild(ingBold);
        ingredients.appendChild(document.createTextNode(" " + _serverReply.ingredients.toString()));
        _parent.appendChild(ingredients);
        let preparation = document.createElement("p");
        let prepBold = document.createElement("b");
        prepBold.appendChild(document.createTextNode("Zubereitung"));
        preparation.appendChild(prepBold);
        preparation.appendChild(document.createTextNode(" " + _serverReply.preparation));
        _parent.appendChild(preparation);
    }
    async function handleClickDeleteButton(_event) {
        getURL();
        let target = _event.currentTarget;
        let id = target.dataset._id;
        url += "/deleteMyRecipe?" + "_id=" + id;
        console.log(url);
        let response = await fetch(url);
        let deleteReply = await response.text();
        serverResponseDiv.innerText = deleteReply;
        handleShowMyRecipes();
    }
    async function handleClickEditButton(_event) {
        getURL();
        recipeForm.reset();
        // writing url with infos from button.dataset
        let target = _event.currentTarget;
        let id = target.dataset._id;
        url += "/editMyRecipe?" + "_id=" + id;
        console.log(url);
        let response = await fetch(url);
        let thisRecipe = await response.json();
        console.log(thisRecipe);
        // writing values of the recipe in question into recipeForm
        recipeTitle.value = thisRecipe.title;
        console.log("title: " + thisRecipe.title);
        console.log("ingredients: " + thisRecipe.ingredients);
        recipePreparation.value = thisRecipe.preparation;
        console.log("preparation: " + thisRecipe.preparation);
        let firstChar = 0;
        let lastChar;
        let inputId = 0;
        //ingredients come back as a string, so you have to splice it
        for (let i = 0; i <= thisRecipe.ingredients.length; i++) {
            let character = thisRecipe.ingredients[i];
            if (i == thisRecipe.ingredients.length || character.includes(",")) {
                lastChar = i;
                console.log("Stelle nach der letzten Stelle der Zutat: " + lastChar);
                // slicing the ingredient out of the ingredient string
                let inputValue = thisRecipe.ingredients.slice(firstChar, lastChar);
                console.log("tatsächliche Zutat: " + inputValue.toString());
                console.log("id des nächsten inputs: " + inputId);
                // looking for input whom to fill with inputValue
                let input = document.getElementById("ingredient" + inputId);
                // if input does not exist
                if (!input) {
                    //create the input Element
                    let newInput = createIngredientInput(inputId);
                    newInput.value = inputValue.toString();
                }
                else {
                    input.value = inputValue.toString();
                }
                inputId += 1;
                firstChar = i + 1;
                console.log("erste Stelle der nächsten Zutat: " + firstChar);
            }
        }
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
            resubmitButton.dataset._id = id;
        }
        let _id = thisRecipe._id;
        console.log("id " + _id);
    }
    async function handleClickResubmitRecipe(_event) {
        getURL();
        let target = _event.currentTarget;
        let id = target.dataset._id;
        let recipe = getRecipeOutOfForm();
        recipe._id = id;
        console.log(recipe._id);
        console.log("Resubmit Recipe wurde gedrückt.");
        url += "/resubmitMyRecipe?" + "_id=" + recipe._id + "&title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
        console.log("z190: " + url);
        let response = await fetch(url);
        let resubmitReply = await response.text();
        serverResponseDiv.innerText = resubmitReply;
        submitButton.classList.remove("ishidden");
        resubmitButton.remove();
        recipeForm.reset();
        handleShowMyRecipes();
        cleanUpInputs();
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
            serverResponseDiv.innerText = displayResponse;
            recipeForm.reset();
            myRecipesDiv.innerHTML = "";
            handleShowMyRecipes();
            cleanUpInputs();
        }
    }
    function cleanUpInputs() {
        let size = ingredientsDiv.children.length;
        console.log("Anzahl der Inputs: " + size);
        for (let i = size - 1; i >= 1; i--) {
            let inputId = "ingredient" + i;
            document.getElementById(inputId).remove();
        }
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=myRecipes.js.map
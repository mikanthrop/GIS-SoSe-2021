namespace Endabgabe {

    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    let loggedInDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("loggedIn");
    let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let scriptResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("scriptResponse");

    let query: URLSearchParams;
    let ingredientInput: HTMLInputElement;
    let url: string;
    let recipeData: FormData;
    let ingredientList: string[];
    let ingredientCount: number = 0;

    window.addEventListener("load", handleLoggedIn);
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);

    function handleLoggedIn(): void {
        console.log(localStorage.getItem("user"));
        if (localStorage.getItem("user") == null) {
            loggedInDiv.classList.add("ishidden");
            let notYou: HTMLElement = document.createElement("h2");
            notYou.innerHTML = "Sie müssen angemeldet sein, um dieses Feature nutzen zu können.";
            serverResponseDiv.appendChild(notYou);
        }
    }

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

    async function handleClickSubmitRecipe(): Promise<void> {
        scriptResponseDiv.innerHTML = "";
        console.log("Submit Recipe wurde gedrückt.");
        getURL();

        console.log(ingredientsDiv.childElementCount);
        let recipeTitle: HTMLInputElement = <HTMLInputElement>document.getElementById("title");
        ingredientInput = <HTMLInputElement>document.getElementById("ingredient0");
        let recipePreparation: HTMLInputElement = <HTMLInputElement>document.getElementById("preparationTextfield");

        if (!recipeTitle.value) scriptResponseDiv.innerHTML = "Bitte geben Sie einen Titel ein.";
        else if (!ingredientInput.value) scriptResponseDiv.innerHTML = "Bitte geben Sie eine Zutat ein.";
        else if (!recipePreparation.value) scriptResponseDiv.innerHTML = "Bitte geben Sie an, wie das Gericht zubereitet wird.";
        else {
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
            let recipe: Recipe = { ingredients: ingredientList, author: localStorage.getItem("user"), title: recipeTitle.value, preparation: recipePreparation.value };
            console.log("recipe ", recipe);
            // gotta make the query by myself
            url += "/submit?title=" + recipe.title + "&author=" + recipe.author + "&ingredients=" + recipe.ingredients + "&preparation=" + recipe.preparation;
            console.log(url);
            let response: Response = await fetch(url);
            let displayResponse: string = await response.text();
            serverResponseDiv.innerHTML = displayResponse;
            
            recipeForm.reset();
        }
    }
}
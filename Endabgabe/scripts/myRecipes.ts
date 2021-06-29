namespace Endabgabe {
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let query: URLSearchParams;
    let ingredientInput: HTMLInputElement;
    let url: string;
    
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    //let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let recipeData: FormData;
    let ingredientList: string[];
    let ingredientCount: number = 0;

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
        console.log("Submit Recipe wurde gedrückt.");
        getURL();

        let recipe: Recipe;
        console.log(ingredientsDiv.childElementCount);
        ingredientInput = <HTMLInputElement>document.getElementById("ingredient0");
        ingredientList = [ingredientInput.value];

        //appends every ingredient to ingredientList
        for (let i: number = 1; i < ingredientsDiv.childElementCount; i++) {
            console.log("----------i'm in------------");
            ingredientInput = <HTMLInputElement>document.getElementById("ingredient" + i);
            console.log(ingredientInput.value);
            ingredientList.push(ingredientInput.value);
            console.log(ingredientList);
        }
        recipe.ingredients = ingredientList;
        console.log(recipeData.getAll("ingredient"));
        // gotta make the query by myself
        url += "/submit?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
}
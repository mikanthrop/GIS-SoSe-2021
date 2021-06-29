namespace Endabgabe {
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let query: URLSearchParams;
    
    let url: string;
    
    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let recipeData: FormData;
    let ingredientList: string[];
    let ingredientCount: number = 0;

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function setQuery(_formData: FormData): void {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(<any>_formData);
    }

    function handleClickAddIngredient(): void {
        serverResponseDiv.innerHTML = "";
        recipeData = new FormData(recipeForm);
        let thisIngredient: string = "ingredient" + ingredientCount;
    
        console.log("im input " + ingredientCount + " steht " + recipeData.get(thisIngredient));
       
        //hier nicht sicher ob != "" oder != null oder != undefined richtig ist, 
        //alles funktioniert nicht so richtig
        if (recipeData.get(thisIngredient) != undefined) {
            console.log("----------i'm in---------------");
            let nextIngredient: HTMLInputElement = document.createElement("input");
            nextIngredient.type = "text";
            nextIngredient.name = "ingredient" + ingredientCount;
            ingredientsDiv.appendChild(nextIngredient);
            
            ingredientCount++;
        } else {
            serverResponseDiv.innerHTML = "Bitte geben Sie eine weitere Zutat ein.";
        }
    }

    async function handleClickSubmitRecipe(): Promise<void> {
        console.log("Submit Recipe wurde gedrückt.");
        getURL();

       
        let recipe: Recipe;
        recipe.ingredients = ingredientList;
        console.log(recipeData.getAll("ingredient"));
        setQuery(recipeData);
        url += "/submit?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
}
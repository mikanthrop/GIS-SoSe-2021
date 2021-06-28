namespace Endabgabe {
    let formData: FormData;
    let serverResponseDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("serverResponse");
    let query: URLSearchParams;

    let url: string;

    document.getElementById("submitRecipe").addEventListener("click", handleClickSubmitRecipe);
    document.getElementById("addIngredient").addEventListener("click", handleClickAddIngredient);
    let ingredientsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("ingredients");
    let recipeForm: HTMLFormElement = <HTMLFormElement>document.getElementById("recipeForm");
    let ingredientList: string[];
    let ingredientCount: number = 1;

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function setQuery(_formData: FormData): void {
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(<any>_formData);
    }

    function handleClickAddIngredient(): void {
        let nextIngredient: HTMLInputElement = document.createElement("input");
        nextIngredient.type = "text";
        nextIngredient.name = "ingredient" + ingredientCount;
        ingredientCount++;
        ingredientsDiv.appendChild(nextIngredient);
    }

    async function handleClickSubmitRecipe(): Promise<void> {
        console.log("Submit Recipe wurde gedrückt.");
        getURL();

        formData = new FormData(recipeForm);
        console.log(formData.getAll("ingredient"));
        setQuery(formData);
        url += "/submit?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverResponseDiv.innerHTML = displayResponse;
    }
}
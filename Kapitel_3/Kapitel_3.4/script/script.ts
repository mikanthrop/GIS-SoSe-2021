

namespace Aufgabe_3_4 {

    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveRant");
    htmlButton.addEventListener("click", handleSaveButtonClick);
    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showRants");
    jsonButton.addEventListener("click", handleShowButtonClick);
    let serverAnswer: HTMLDivElement = <HTMLDivElement>document.getElementById("Rants");
    let url: string;
    let query: URLSearchParams;

    function getURL(): void {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
    }

    function getFormData(): void {
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(<any>formData);
    }

    async function handleSaveButtonClick(): Promise<void> {
        getURL();
        getFormData();

        console.log("Save-Button wurde gedrückt.");

        url += "/saveRant" + "?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverAnswer.innerText = displayResponse;
        console.log(displayResponse);
        
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }

    async function handleShowButtonClick(): Promise<void> {
        getURL();

        console.log("Show-Button wurde gedrückt.");
        console.log(query);
        
        url += "/show" + "?";
        let response: Response = await fetch(url);
        let displayResponse: string = await response.json();
        serverAnswer.innerText = displayResponse;
        console.log(displayResponse);
    }
}
namespace Aufgabe_3_2 {

    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let displayDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("htmlAnswer");
    let url: string = "http://localhost:8100";

    async function handleHTMLButtonClick(): Promise<void> {
        console.log("HTML-Button wurde gedrückt.");
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/html" + "?" + query.toString();

        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        displayDiv.innerText = displayResponse;
        console.log(displayResponse);
    }

    async function handleJSONButtonClick(): Promise<void> {
        console.log("JSON-Button wurde gedrückt.");
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/json" + "?" + query.toString();

        let response: Response = await fetch(url);
        let consoleResponse: string = await response.json();
        console.log(consoleResponse);
    }
}
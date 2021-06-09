

namespace Aufgabe_3_2 {

    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let htmlAnswer: HTMLDivElement = <HTMLDivElement>document.getElementById("htmlAnswer");
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

    async function handleHTMLButtonClick(): Promise<void> {
        getURL();
        getFormData();

        console.log("HTML-Button wurde gedrückt.");

        url += "/html" + "?" + query.toString();
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        htmlAnswer.innerText = displayResponse;
        console.log(displayResponse);
        
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }

    async function handleJSONButtonClick(): Promise<void> {
        getURL();
        getFormData();

        console.log("JSON-Button wurde gedrückt.");
        console.log(query);
        
        url += "/json" + "?" + query.toString();
        let response: Response = await fetch(url);
        let jsonResponse: string = await response.json();
        htmlAnswer.innerText = "Bitte sehen Sie in der Konsole nach.";
        console.log(jsonResponse);

        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
}


namespace Aufgabe_3_2 {

    let htmlButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let htmlAnswer: HTMLDivElement = <HTMLDivElement>document.getElementById("htmlAnswer");
    let url: string;

    function getURL(): void {
        url = "https://gis-server-git-gud.herokuapp.com";
        //url = "http://localhost:8100";
    }

    async function handleHTMLButtonClick(): Promise<void> {
        getURL();

        console.log("HTML-Button wurde gedrückt.");
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
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

        console.log("JSON-Button wurde gedrückt.");
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/json" + "?" + query.toString();

        let response: Response = await fetch(url);
        let jsonResponse: string = await response.json();
        console.log(jsonResponse);

        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
}
namespace Aufgabe_3_2 {

    let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    button.addEventListener("click", handleButtonClick);

    function handleButtonClick(): void {
        getServerAnswer("https://gis-server-git-gud.herokuapp.com");
        console.log("Button wurde gedrückt.");
    }

    async function getServerAnswer(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url += "?" + query.toString();

        let response: Response = await fetch(_url);
        let loggedResponse: string = await response.text();
        console.log("query lautet: " + loggedResponse);
    }
}
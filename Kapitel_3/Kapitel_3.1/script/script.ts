let formData: FormData = new FormData(document.forms[0]);

let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
button.addEventListener("click", handleButtonClick);

async function handleButtonClick(): Promise<void> {
    let url: string = "https://gis-server-git-gud.herokuapp.com";
    //tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url += "/?" + query.toString();

    let response: Response = await fetch(url, {method: "get"});
    let loggedResponse: string = await response.text();
    console.log(loggedResponse);

    for (let entry of query) {
        console.log(entry);
        console.log("Key: " + entry[0]);
        console.log("Value: " + entry[1]);
    }
}
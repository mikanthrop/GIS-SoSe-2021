namespace Aufgabe_3_4 {

    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveRant");
    saveButton.addEventListener("click", handleSaveButtonClick);
    let showButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showRants");
    showButton.addEventListener("click", handleShowButtonClick);
    let deleteButton: HTMLCollectionOf<Element>;
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

        url += "/show" + "?";
        let response: Response = await fetch(url);
        let displayResponse: Rant[] = await response.json();
        let serverString: string = "";
        for (let i in displayResponse) {
            serverString += "<div><p>" + "Verfasst von: " + displayResponse[i].user + "</p>";
            serverString += "<p>" + "Kategorie: " + displayResponse[i].category + "</p>";
            serverString += "<p><h3>" + displayResponse[i].title + "</h3></p>";
            serverString += "<p>" + displayResponse[i].rant + "</p>";
            serverString += "<span>" + "<button type=\"button\" class=\"delete\">Löschen</button>" + "</span></div>";
        }
        serverAnswer.innerHTML = serverString;
        deleteButton = document.getElementsByClassName("delete");
        for (let element in deleteButton) {
            deleteButton[element].addEventListener("click", handleDeleteButtonClick);
            console.log(element);
        }

        console.log(displayResponse);
    }

    async function handleDeleteButtonClick(): Promise<void> {
        getURL();

        console.log("Delete-Button wurde gedrückt.");

        url += "/delete" + + "?";
        let response: Response = await fetch(url);
        let displayResponse: string = await response.text();
        serverAnswer.innerHTML = displayResponse;

    }

}
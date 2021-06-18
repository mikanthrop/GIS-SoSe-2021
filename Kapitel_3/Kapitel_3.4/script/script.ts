import * as Mongo from "mongodb";
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
        for (let i in displayResponse) {
            let post: HTMLDivElement = document.createElement("div");
            serverAnswer.appendChild(post);
            let user: HTMLParagraphElement = document.createElement("p");
            user.innerHTML = "Verfasst von: " + displayResponse[i].user;
            post.appendChild(user);
            let category: HTMLParagraphElement = document.createElement("p");
            category.innerHTML = "Kategorie: " + displayResponse[i].category;
            post.appendChild(category);
            let title: HTMLParagraphElement = document.createElement("p");
            title.innerHTML = "<h3>" + displayResponse[i].title + "</h3>";
            post.appendChild(title);
            let rant: HTMLParagraphElement = document.createElement("p");
            rant.innerHTML = displayResponse[i].rant;
            post.appendChild(rant);
            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.addEventListener("click", handleDeleteButtonClick);
            //_id des Objektes in einer Variable speichern und in der URL mitsenden
            
            async function handleDeleteButtonClick(): Promise<void> {
                getURL();
        
                console.log("Delete-Button wurde gedrückt.");
        
                url += "/delete" +  + "?";
                let response: Response = await fetch(url);
                let displayResponse: string = await response.text();
                serverAnswer.innerHTML = displayResponse;
            }
        }
        console.log(displayResponse);
    }
}
//import * as Mongo from "mongodb";
import { ObjectID } from "mongodb";
import { Rant } from "../source/interface";

namespace Kapiteldreivier {

    let saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("saveRant");
    saveButton.addEventListener("click", handleSaveButtonClick);
    let showButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("showRants");
    showButton.addEventListener("click", handleShowButtonClick);
    let serverAnswer: HTMLDivElement = <HTMLDivElement>document.getElementById("Rants");
    let url: string;
    let query: URLSearchParams;

    function getURL(): void {
        url = "https://gis-server-git-gud.herokuapp.com";
        //url = "http://localhost:8100";
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
        serverAnswer.innerHTML = "";

        console.log("Show-Button wurde gedrückt.");

        url += "/show" + "?";
        let response: Response = await fetch(url);
        let displayResponse: Rant[] = await response.json();
        for (let i in displayResponse) {
            let queryDelete: Rant = displayResponse[i];
            
            let post: HTMLDivElement = document.createElement("div");
            serverAnswer.appendChild(post);
            let user: HTMLParagraphElement = document.createElement("p");
            user.appendChild(document.createTextNode("Verfasst von: " + queryDelete.user));
            post.appendChild(user);
            let category: HTMLParagraphElement = document.createElement("p");
            category.appendChild(document.createTextNode("Kategorie: " + queryDelete.category));
            post.appendChild(category);
            let title: HTMLElement = document.createElement("h3");
            title.appendChild(document.createTextNode(queryDelete.title));

            post.appendChild(title);
            let rant: HTMLParagraphElement = document.createElement("p");
            rant.appendChild(document.createTextNode(queryDelete.rant));
            post.appendChild(rant);
            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.appendChild(document.createTextNode("Löschen"));
            //deleteButton.setAttribute("id", queryDelete._id);
            deleteButton.setAttribute("type", "button");
            deleteButton.addEventListener("click", handleDeleteButtonClick);
            post.appendChild(deleteButton);
            //_id des Objektes in einer Variable speichern und in der URL mitsenden

            async function handleDeleteButtonClick(): Promise<void> {
                getURL();

                console.log("Delete-Button wurde gedrückt.");
                let id: ObjectID = queryDelete._id;
                console.log("id: " + id.toString());
                
                url += "/delete" + "?_id=" + id.toString();
                console.log(url);
                let response: Response = await fetch(url);
                let displayResponse: string = await response.text();
                serverAnswer.innerHTML = displayResponse;
            }
        }
        console.log(displayResponse);
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kapiteldreivier;
(function (Kapiteldreivier) {
    let saveButton = document.getElementById("saveRant");
    saveButton.addEventListener("click", handleSaveButtonClick);
    let showButton = document.getElementById("showRants");
    showButton.addEventListener("click", handleShowButtonClick);
    let serverAnswer = document.getElementById("Rants");
    let rantForm = document.getElementById("rantForm");
    let url;
    let query;
    function getURL() {
        url = "https://gis-server-git-gud.herokuapp.com";
        //url = "http://localhost:8100";
    }
    function getFormData() {
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        query = new URLSearchParams(formData);
    }
    async function handleSaveButtonClick() {
        getURL();
        getFormData();
        console.log("Save-Button wurde gedrückt.");
        url += "/saveRant" + "?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        serverAnswer.innerText = displayResponse;
        console.log(displayResponse);
        rantForm.reset();
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
    async function handleShowButtonClick() {
        getURL();
        serverAnswer.innerHTML = "";
        console.log("Show-Button wurde gedrückt.");
        url += "/show" + "?";
        let response = await fetch(url);
        let displayResponse = await response.json();
        for (let i in displayResponse) {
            let queryDelete = displayResponse[i];
            let post = document.createElement("div");
            serverAnswer.appendChild(post);
            let user = document.createElement("p");
            user.appendChild(document.createTextNode("Verfasst von: " + queryDelete.user));
            post.appendChild(user);
            let category = document.createElement("p");
            category.appendChild(document.createTextNode("Kategorie: " + queryDelete.category));
            post.appendChild(category);
            let title = document.createElement("h3");
            title.appendChild(document.createTextNode(queryDelete.title));
            post.appendChild(title);
            let rant = document.createElement("p");
            rant.appendChild(document.createTextNode(queryDelete.rant));
            post.appendChild(rant);
            let deleteButton = document.createElement("button");
            deleteButton.appendChild(document.createTextNode("Löschen"));
            //deleteButton.setAttribute("id", queryDelete._id);
            deleteButton.setAttribute("type", "button");
            deleteButton.addEventListener("click", handleDeleteButtonClick);
            post.appendChild(deleteButton);
            //_id des Objektes in einer Variable speichern und in der URL mitsenden
            async function handleDeleteButtonClick() {
                getURL();
                console.log("Delete-Button wurde gedrückt.");
                let id = queryDelete._id;
                console.log("id: " + id.toString());
                url += "/delete" + "?_id=" + id.toString();
                console.log(url);
                let response = await fetch(url);
                let displayResponse = await response.text();
                serverAnswer.innerHTML = displayResponse;
            }
        }
        console.log(displayResponse);
    }
})(Kapiteldreivier || (Kapiteldreivier = {}));
//# sourceMappingURL=script.js.map
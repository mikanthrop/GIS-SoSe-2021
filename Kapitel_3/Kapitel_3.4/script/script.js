"use strict";
var Aufgabe_3_4;
(function (Aufgabe_3_4) {
    let saveButton = document.getElementById("saveRant");
    saveButton.addEventListener("click", handleSaveButtonClick);
    let showButton = document.getElementById("showRants");
    showButton.addEventListener("click", handleShowButtonClick);
    let serverAnswer = document.getElementById("Rants");
    let url;
    let query;
    function getURL() {
        //url = "https://gis-server-git-gud.herokuapp.com";
        url = "http://localhost:8100";
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
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
    async function handleShowButtonClick() {
        getURL();
        console.log("Show-Button wurde gedrückt.");
        console.log(query);
        url += "/show" + "?";
        let response = await fetch(url);
        let displayResponse = await response.json();
        let serverString = "";
        for (let i in displayResponse) {
            serverString += "<div><p>" + "Verfasst von: " + displayResponse[i].user + "</p>";
            serverString += "<p>" + "Kategorie: " + displayResponse[i].category + "</p>";
            serverString += "<p><h3>" + displayResponse[i].title + "</h3></p>";
            serverString += "<p>" + displayResponse[i].rant + "</p>";
            serverString += "<span><button>Löschen</button></span></div>";
        }
        serverAnswer.innerHTML = serverString;
        console.log(displayResponse);
    }
})(Aufgabe_3_4 || (Aufgabe_3_4 = {}));
//# sourceMappingURL=script.js.map
"use strict";
var Aufgabe_3_4;
(function (Aufgabe_3_4) {
    let htmlButton = document.getElementById("saveRant");
    htmlButton.addEventListener("click", handleSaveButtonClick);
    let jsonButton = document.getElementById("showRants");
    jsonButton.addEventListener("click", handleShowButtonClick);
    let htmlAnswer = document.getElementById("Rants");
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
        let displayResponse = await response.json();
        htmlAnswer.innerText = displayResponse;
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
        htmlAnswer.innerText = displayResponse;
        console.log(displayResponse);
    }
})(Aufgabe_3_4 || (Aufgabe_3_4 = {}));
//# sourceMappingURL=script.js.map
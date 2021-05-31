"use strict";
var Aufgabe_3_2;
(function (Aufgabe_3_2) {
    let htmlButton = document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton = document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let displayDiv = document.getElementById("htmlAnswer");
    let url = "http://localhost:8100";
    async function handleHTMLButtonClick() {
        console.log("HTML-Button wurde gedrückt.");
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/html" + "?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        displayDiv.innerText = displayResponse;
        console.log(displayResponse);
    }
    async function handleJSONButtonClick() {
        console.log("JSON-Button wurde gedrückt.");
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/json" + "?" + query.toString();
        let response = await fetch(url);
        let consoleResponse = await response.json();
        console.log(consoleResponse);
    }
})(Aufgabe_3_2 || (Aufgabe_3_2 = {}));
//# sourceMappingURL=script.js.map
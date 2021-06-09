"use strict";
var Aufgabe_3_2;
(function (Aufgabe_3_2) {
    let htmlButton = document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton = document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let htmlAnswer = document.getElementById("htmlAnswer");
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
    async function handleHTMLButtonClick() {
        getURL();
        getFormData();
        console.log("HTML-Button wurde gedrückt.");
        url += "/html" + "?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        htmlAnswer.innerText = displayResponse;
        console.log(displayResponse);
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
    async function handleJSONButtonClick() {
        getURL();
        getFormData();
        console.log("JSON-Button wurde gedrückt.");
        console.log(query);
        url += "/json" + "?" + query.toString();
        let response = await fetch(url);
        let jsonResponse = await response.json();
        htmlAnswer.innerText = "Bitte sehen Sie in der Konsole nach.";
        console.log(jsonResponse);
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
})(Aufgabe_3_2 || (Aufgabe_3_2 = {}));
//# sourceMappingURL=script.js.map
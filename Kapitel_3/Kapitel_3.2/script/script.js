"use strict";
var Aufgabe_3_2;
(function (Aufgabe_3_2) {
    let htmlButton = document.getElementById("html");
    htmlButton.addEventListener("click", handleHTMLButtonClick);
    let jsonButton = document.getElementById("json");
    jsonButton.addEventListener("click", handleJSONButtonClick);
    let htmlAnswer = document.getElementById("htmlAnswer");
    let url;
    function getURL() {
        url = "http://localhost:8100";
    }
    async function handleHTMLButtonClick() {
        getURL();
        console.log("HTML-Button wurde gedrückt.");
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/html" + "?" + query.toString();
        let response = await fetch(url);
        let displayResponse = await response.text();
        htmlAnswer.innerText = displayResponse;
        document.body.appendChild(htmlAnswer);
        console.log(displayResponse);
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
    async function handleJSONButtonClick() {
        getURL();
        console.log("JSON-Button wurde gedrückt.");
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/json" + "?" + query.toString();
        let response = await fetch(url);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        // setback of URL to prevent requests with multiple inputs
        getURL();
    }
})(Aufgabe_3_2 || (Aufgabe_3_2 = {}));
//# sourceMappingURL=script.js.map
"use strict";
var Aufgabe_3_2;
(function (Aufgabe_3_2) {
    let button = document.getElementById("button");
    button.addEventListener("click", handleButtonClick);
    function handleButtonClick() {
        getServerAnswer("https://gis-server-git-gud.herokuapp.com");
        console.log("Button wurde gedrückt.");
    }
    async function getServerAnswer(_url) {
        let formData = new FormData(document.forms[0]);
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url += "?" + query.toString();
        let response = await fetch(_url);
        let loggedResponse = await response.text();
        sessionStorage.setItem("serveranswer", loggedResponse);
    }
    console.log("Server sagt: " + sessionStorage.getItem("serveranswer"));
})(Aufgabe_3_2 || (Aufgabe_3_2 = {}));
//# sourceMappingURL=script.js.map
"use strict";
let formData = new FormData(document.forms[0]);
let button = document.getElementById("button");
button.addEventListener("click", handleButtonClick);
async function handleButtonClick() {
    let url = "https://gis-server-git-gud.herokuapp.com";
    //tslint:disable-next-line: no-any
    let query = new URLSearchParams(formData);
    url += "/?" + query.toString();
    let response = await fetch(url, { method: "get" });
    let loggedResponse = await response.text();
    console.log(loggedResponse);
    for (let entry of query) {
        console.log(entry);
        console.log("Key: " + entry[0]);
        console.log("Value: " + entry[1]);
    }
}
//# sourceMappingURL=script.js.map
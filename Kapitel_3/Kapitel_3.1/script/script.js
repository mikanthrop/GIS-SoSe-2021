"use strict";
let formData = new FormData(document.forms[0]);
let button = document.getElementById("button");
button.addEventListener("click", handleButtonClick);
async function handleButtonClick() {
    let url = "https://gis-server-git-gud.herokuapp.com";
    //tslint:disable-next-line: no-any
    let query = new URLSearchParams(formData);
    url += "/?" + query.toString();
    let response = await fetch(url);
    let loggedResponse = await response.text();
    console.log(loggedResponse);
}
//# sourceMappingURL=script.js.map
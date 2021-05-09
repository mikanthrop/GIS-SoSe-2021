"use strict";
var Kapitelaufgabe2;
(function (Kapitelaufgabe2) {
    function textilesExist(_textile) {
        if (_textile == true)
            return "vorhanden";
        else
            return "nicht vorhanden";
    }
    let header = document.createElement("header");
    document.body.appendChild(header);
    let main = document.createElement("main");
    document.body.appendChild(main);
    let footer = document.createElement("footer");
    document.body.appendChild(footer);
    let homeLink = document.createElement("a");
    homeLink.innerText = "Build-A-Entenhausener";
    homeLink.setAttribute("style", "padding: " + 20 + "px; margin: " + 5 + "px; font-size: " + 40 + "px; text-transform: capitalize; font-weight: bold");
    homeLink.setAttribute("href", "../Kapitelaufgabe_2/index.html");
    header.appendChild(homeLink);
    let infoLine = document.createElement("p");
    infoLine.setAttribute("style", "fontsize: " + 30 + "px; color: inherit");
    infoLine.setAttribute("id", "info");
    infoLine.innerText = "Bitte wählen Sie einen Kopf aus, um Ihren eigenen Entenhausener zusammenzusetzen.";
    main.appendChild(infoLine);
    let presentHeadSpace = document.createElement("div");
    presentHeadSpace.setAttribute("id", "headChoices");
    main.appendChild(presentHeadSpace);
    // creating the items inside the flexbox
    for (let i = 0; i < Kapitelaufgabe2.headArray.length; i++) {
        //creates overarching div-element
        let flexitem = document.createElement("div");
        presentHeadSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic = document.createElement("img");
        pic.setAttribute("src", Kapitelaufgabe2.headArray[i].picture);
        pic.setAttribute("height", 300 + "px");
        flexitem.appendChild(pic);
        //following lines create paragraph elements with info
        let name = document.createElement("p");
        name.innerText = "Name: " + Kapitelaufgabe2.headArray[i].name;
        flexitem.appendChild(name);
        let animal = document.createElement("p");
        animal.innerText = "Tierart: " + Kapitelaufgabe2.headArray[i].animal;
        flexitem.appendChild(animal);
        let hat = document.createElement("p");
        hat.innerText = "Hut: " + textilesExist(Kapitelaufgabe2.headArray[i].hat);
        flexitem.appendChild(hat);
        let color = document.createElement("p");
        color.innerText = "Farbe des Hutes: " + Kapitelaufgabe2.headArray[i].color;
        if (Kapitelaufgabe2.headArray[i].hat == true)
            flexitem.appendChild(color);
        //adds eventlistener for doubletapping the pic
        //pic.addEventListener("dblclick", handlePicDblClick);
        let button = document.createElement("button");
        button.innerText = "Dieser Kopf";
        flexitem.appendChild(button);
        button.addEventListener("click", handleClickButton);
        function handleClickButton(_event) {
            console.log(Kapitelaufgabe2.headArray[i]);
        }
    }
})(Kapitelaufgabe2 || (Kapitelaufgabe2 = {}));
//# sourceMappingURL=script.js.map
"use strict";
var Kapitelaufgabe2;
(function (Kapitelaufgabe2) {
    let parsedData = JSON.parse(Kapitelaufgabe2.allData);
    let absoluteLinkHead = "https://mikanthrop.github.io/GIS-SoSe-2021/Kapitel_2/Kapitelaufgabe_2/head.html";
    let absoluteLinkBody = "https://mikanthrop.github.io/GIS-SoSe-2021/Kapitel_2/Kapitelaufgabe_2/body.html";
    let absoluteLinkFeet = "https://mikanthrop.github.io/GIS-SoSe-2021/Kapitel_2/Kapitelaufgabe_2/feet.html";
    let absoluteLinkIndex = "https://mikanthrop.github.io/GIS-SoSe-2021/Kapitel_2/Kapitelaufgabe_2/index.html";
    //creating basic structure header main and footer in the body
    let header = document.createElement("header");
    document.body.appendChild(header);
    let main = document.createElement("main");
    document.body.appendChild(main);
    let footer = document.createElement("footer");
    document.body.appendChild(footer);
    //creating the headline which also functions as a link
    let homeLink = document.createElement("a");
    homeLink.innerText = "Build-A-Entenhausener";
    homeLink.setAttribute("style", "padding: " + 20 + "px; margin: " + 5 + "px; font-size: " + 40 + "px; text-transform: capitalize; font-weight: bold");
    homeLink.setAttribute("href", "../Kapitelaufgabe_2/index.html");
    header.appendChild(homeLink);
    //creating the subtext of the headline for that specific site without anything in it
    let infoLine = document.createElement("p");
    infoLine.setAttribute("style", "fontsize: " + 30 + "px; color: inherit");
    infoLine.setAttribute("id", "info");
    main.appendChild(infoLine);
    let choicesSoFar = document.createElement("div");
    infoLine.setAttribute("style", "display: flex, flex-flow: column nowrap, justify-content: flex-start, align-items: center");
    main.appendChild(choicesSoFar);
    //creating the space were APart s will be appended to
    let presentPartSpace = document.createElement("div");
    presentPartSpace.setAttribute("id", "Choices");
    main.appendChild(presentPartSpace);
    function createAPart(_part, _thisPart) {
        //creates overarching div-element
        let flexitem = document.createElement("div");
        presentPartSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic = document.createElement("img");
        pic.setAttribute("src", _part.picture);
        pic.setAttribute("height", 200 + "px");
        flexitem.appendChild(pic);
        //following lines create paragraph elements with info
        let name = document.createElement("p");
        name.innerText = "Name: " + _part.name;
        flexitem.appendChild(name);
        let animal = document.createElement("p");
        animal.innerText = "Tierart: " + _part.animal;
        flexitem.appendChild(animal);
        let button = document.createElement("button");
        button.innerText = "Ich wähle dich!";
        button.setAttribute("class", _thisPart);
        if (_thisPart == "head")
            button.setAttribute("href", "../Kapitelaufgabe_2/body.html");
        if (_thisPart == "body")
            button.setAttribute("href", "../Kapitelaufgabe_2/feet.html");
        if (_thisPart == "feet")
            button.setAttribute("href", "../Kapitelaufgabe_2/index.html");
        button.addEventListener("click", handleClickButton);
        flexitem.appendChild(button);
        function handleClickButton(_event) {
            console.log(_part);
            sessionStorage.setItem(_thisPart + "Picture", _part.picture);
            sessionStorage.setItem(_thisPart + "Name", _part.name);
            sessionStorage.setItem(_thisPart + "Animal", _part.animal);
            if (_thisPart == "head")
                window.open("../Kapitelaufgabe_2/body.html", "_self");
            if (_thisPart == "body")
                window.open("../Kapitelaufgabe_2/feet.html", "_self");
            if (_thisPart == "feet")
                window.open("../Kapitelaufgabe_2/index.html", "_self");
        }
    }
    let currentPage = window.location.href;
    console.log(currentPage);
    if (currentPage == "http://127.0.0.1:5500/Kapitel_2/Kapitelaufgabe_2/head.html")
        console.log("absolute links work");
    else
        console.log("absolute links don't work");
    if (currentPage == absoluteLinkHead) {
        for (let i = 0; i < parsedData.heads.length; i++) {
            infoLine.innerText = "Bitte wählen Sie einen Kopf, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.heads[i], "head");
        }
    }
    if (currentPage == absoluteLinkBody) {
        for (let i = 0; i < parsedData.bodies.length; i++) {
            infoLine.innerText = "Bitte wählen Sie einen Körper, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.bodies[i], "body");
        }
    }
    if (currentPage == absoluteLinkFeet) {
        for (let i = 0; i < parsedData.feet.length; i++) {
            infoLine.innerText = "Bitte wählen Sie die Füße, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.feet[i], "feet");
        }
    }
})(Kapitelaufgabe2 || (Kapitelaufgabe2 = {}));
//# sourceMappingURL=script.js.map
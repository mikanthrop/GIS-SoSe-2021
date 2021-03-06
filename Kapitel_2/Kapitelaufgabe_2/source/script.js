"use strict";
var Kapitelaufgabe2;
(function (Kapitelaufgabe2) {
    let parsedData;
    async function getData(_url) {
        let response = await fetch(_url);
        let jsonObj = await response.json();
        parsedData = JSON.parse(jsonObj);
    }
    let currentPage = getSubpage();
    console.log(currentPage);
    function getSubpage() {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    async function getServerAnswer(_url) {
        let browserCacheData = JSON.parse(JSON.stringify(sessionStorage));
        //tslint:disable-next-line: no-any
        let query = new URLSearchParams(browserCacheData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let text = await response.text();
        let displayText = JSON.parse(text);
        if (displayText.error != undefined)
            return displayText.error;
        if (displayText.message != undefined)
            return displayText.message;
        return "Ooops, something went wrong.";
    }
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
    homeLink.setAttribute("href", "../html/index.html");
    header.appendChild(homeLink);
    // creating div for server message on finish.html
    let showServerMessage = document.createElement("div");
    showServerMessage.setAttribute("id", "ServerMessage");
    main.appendChild(showServerMessage);
    //creating the subtext of the headline for that specific site without anything in it
    let infoLine = document.createElement("p");
    infoLine.setAttribute("style", "fontsize: " + 30 + "px; color: inherit; margin-bottom: " + 20 + "px");
    infoLine.setAttribute("id", "info");
    main.appendChild(infoLine);
    //creating another flexbox which shows the choices pictures so far
    let choicesSoFar = document.createElement("div");
    choicesSoFar.setAttribute("id", "displayStoredChoices");
    main.appendChild(choicesSoFar);
    //creating the space were APart s will be appended to
    let presentPartSpace = document.createElement("div");
    presentPartSpace.setAttribute("id", "Choices");
    main.appendChild(presentPartSpace);
    //function for creating a div with all the info in presentPartSpace
    function createAPart(_part, _bodyPart) {
        //creates overarching div-element
        let flexitem = document.createElement("div");
        presentPartSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic = document.createElement("img");
        pic.setAttribute("src", _part.picture);
        pic.setAttribute("class", "displayPic");
        if (_bodyPart == "head" || _bodyPart == "body")
            pic.setAttribute("height", 200 + "px");
        if (_bodyPart == "feet")
            pic.setAttribute("width", 200 + "px");
        flexitem.appendChild(pic);
        //following lines create paragraph elements with info
        let name = document.createElement("p");
        name.innerText = "Name: " + _part.name;
        flexitem.appendChild(name);
        let animal = document.createElement("p");
        animal.innerText = "Tierart: " + _part.animal;
        flexitem.appendChild(animal);
        //creating button and event handler that works on this button only
        let button = document.createElement("button");
        button.innerText = "Ich w??hle dich!";
        button.setAttribute("class", _bodyPart);
        button.addEventListener("click", handleClickButton);
        flexitem.appendChild(button);
        function handleClickButton(_event) {
            console.log(_part);
            sessionStorage.setItem(_bodyPart + "Picture", _part.picture);
            sessionStorage.setItem(_bodyPart + "Name", _part.name);
            sessionStorage.setItem(_bodyPart + "Animal", _part.animal);
            if (_bodyPart == "head")
                window.open("../html/body.html", "_self");
            if (_bodyPart == "body")
                window.open("../html/feet.html", "_self");
            if (_bodyPart == "feet")
                window.open("../html/finish.html", "_self");
        }
    }
    function showChoices() {
        let headPic = document.createElement("img");
        let bodyPic = document.createElement("img");
        let feetPic = document.createElement("img");
        headPic.setAttribute("src", sessionStorage.getItem("headPicture"));
        bodyPic.setAttribute("src", sessionStorage.getItem("bodyPicture"));
        feetPic.setAttribute("src", sessionStorage.getItem("feetPicture"));
        if (currentPage == "body.html")
            choicesSoFar.appendChild(headPic);
        if (currentPage == "feet.html") {
            choicesSoFar.appendChild(headPic);
            choicesSoFar.appendChild(bodyPic);
        }
        if (currentPage == "finish.html") {
            choicesSoFar.appendChild(headPic);
            choicesSoFar.appendChild(bodyPic);
            choicesSoFar.appendChild(feetPic);
        }
    }
    async function buildPage() {
        await getData("../source/data.json");
        if (currentPage == "index.html") {
            let info1 = document.createElement("p");
            info1.innerText = "Als Projekt f??r mein Studium m??chte ich auf dieser Webseite den Benutzer einen Entenhausener aus Bildern ausgew??hlter Figuren zusammenbauen lassen.";
            main.appendChild(info1);
            let info2 = document.createElement("p");
            info2.innerText = "Bitte dr??cken Sie auf den untenstehenden Button, um zu beginnen.";
            main.appendChild(info2);
            let startButton = document.createElement("button");
            startButton.innerText = "Los geht's!";
            startButton.addEventListener("click", handleStartButtonClick);
            main.appendChild(startButton);
            function handleStartButtonClick(_event) {
                window.open("../html/head.html", "_self");
            }
        }
        if (currentPage == "head.html") {
            for (let i = 0; i < parsedData.heads.length; i++) {
                infoLine.innerText = "Bitte w??hlen Sie einen Kopf, um Ihren eigenen Entenhausener zusammenzusetzen.";
                createAPart(parsedData.heads[i], "head");
            }
        }
        if (currentPage == "body.html") {
            showChoices();
            for (let i = 0; i < parsedData.bodies.length; i++) {
                infoLine.innerText = "Bitte w??hlen Sie einen K??rper, um Ihren eigenen Entenhausener zusammenzusetzen.";
                createAPart(parsedData.bodies[i], "body");
            }
        }
        if (currentPage == "feet.html") {
            showChoices();
            for (let i = 0; i < parsedData.feet.length; i++) {
                infoLine.innerText = "Bitte w??hlen Sie die F????e, um Ihren eigenen Entenhausener zusammenzusetzen.";
                createAPart(parsedData.feet[i], "feet");
            }
        }
        if (currentPage == "finish.html") {
            showServerMessage.innerText = "Server sagt: " + await getServerAnswer("https://gis-communication.herokuapp.com");
            infoLine.innerText = "Das ist Ihr Entenhausener:";
            showChoices();
            let name = document.createElement("p");
            let animal = document.createElement("p");
            name.innerText = "Name: " + sessionStorage.getItem("headName") + sessionStorage.getItem("bodyName") + sessionStorage.getItem("feetName");
            animal.innerText = "Tier: " + sessionStorage.getItem("headAnimal") + "-" + sessionStorage.getItem("bodyAnimal") + "-" + sessionStorage.getItem("feetAnimal");
            choicesSoFar.appendChild(name);
            choicesSoFar.appendChild(animal);
            let thankYouLine = document.createElement("p");
            thankYouLine.innerText = "Danke, dass Sie meine Website benutzt haben. Viel Spa?? mit Ihrem eigenen Entenhausener.";
            thankYouLine.setAttribute("style", "margin-bottom: " + 20 + "px");
            main.appendChild(thankYouLine);
            let newStart = document.createElement("button");
            newStart.innerText = "Versuchen wir das nochmal.";
            newStart.addEventListener("click", handleButtonClick);
            main.appendChild(newStart);
            function handleButtonClick(_event) {
                window.open("../html/head.html", "_self");
            }
        }
    }
    buildPage();
})(Kapitelaufgabe2 || (Kapitelaufgabe2 = {}));
//# sourceMappingURL=script.js.map
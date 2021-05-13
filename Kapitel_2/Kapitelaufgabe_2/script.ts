namespace Kapitelaufgabe2 {

    export interface APart {
        picture: string;
        name: string;
        animal: string;
    }
    export interface AllParts {
        heads: APart[];
        bodies: APart[];
        feet: APart[];
    }
    export interface PickedBodyParts {
        head: APart;
        body: APart;
        feet: APart;
    }

    let parsedData: AllParts = JSON.parse(allData);

    //creating basic structure header main and footer in the body
    let header: HTMLElement = document.createElement("header");
    document.body.appendChild(header);

    let main: HTMLElement = document.createElement("main");
    document.body.appendChild(main);

    let footer: HTMLElement = document.createElement("footer");
    document.body.appendChild(footer);

    //creating the headline which also functions as a link
    let homeLink: HTMLAnchorElement = document.createElement("a");
    homeLink.innerText = "Build-A-Entenhausener";
    homeLink.setAttribute("style", "padding: " + 20 + "px; margin: " + 5 + "px; font-size: " + 40 + "px; text-transform: capitalize; font-weight: bold");
    homeLink.setAttribute("href", "../Kapitelaufgabe_2/index.html");
    header.appendChild(homeLink);

    //creating the subtext of the headline for that specific site without anything in it
    let infoLine: HTMLParagraphElement = document.createElement("p");
    infoLine.setAttribute("style", "fontsize: " + 30 + "px; color: inherit");
    infoLine.setAttribute("id", "info");
    main.appendChild(infoLine);

    //creating another flexbox which shows the choices pictures so far
    let choicesSoFar: HTMLDivElement = document.createElement("div");
    choicesSoFar.setAttribute("id", "displayStoredChoices");
    main.appendChild(choicesSoFar);

    //creating the space were APart s will be appended to
    let presentPartSpace: HTMLDivElement = document.createElement("div");
    presentPartSpace.setAttribute("id", "Choices");
    main.appendChild(presentPartSpace);



    //function for creating a div with all the info in presentPartSpace
    function createAPart(_part: APart, _bodyPart: string): void {

        //creates overarching div-element
        let flexitem: HTMLDivElement = document.createElement("div");
        presentPartSpace.appendChild(flexitem);

        //creates picture whose path is saved as a string
        let pic: HTMLImageElement = document.createElement("img");
        pic.setAttribute("src", _part.picture);
        pic.setAttribute("class", "displayPic");
        if (_bodyPart == "head") pic.setAttribute("height", 200 + "px");
        if (_bodyPart == "body" || _bodyPart == "feet") pic.setAttribute("width", 200 + "px");
        flexitem.appendChild(pic);

        //following lines create paragraph elements with info
        let name: HTMLParagraphElement = document.createElement("p");
        name.innerText = "Name: " + _part.name;
        flexitem.appendChild(name);

        let animal: HTMLParagraphElement = document.createElement("p");
        animal.innerText = "Tierart: " + _part.animal;
        flexitem.appendChild(animal);

        let button: HTMLButtonElement = document.createElement("button");
        button.innerText = "Ich wähle dich!";
        button.setAttribute("class", _bodyPart);
        button.addEventListener("click", handleClickButton);
        flexitem.appendChild(button);

        function handleClickButton(_event: MouseEvent): void {
            console.log(_part);
            sessionStorage.setItem(_bodyPart + "Picture", _part.picture);
            sessionStorage.setItem(_bodyPart + "Name", _part.name);
            sessionStorage.setItem(_bodyPart + "Animal", _part.animal);
            if (_bodyPart == "head") window.open("../Kapitelaufgabe_2/body.html", "_self");
            if (_bodyPart == "body") window.open("../Kapitelaufgabe_2/feet.html", "_self");
            if (_bodyPart == "feet") window.open("../Kapitelaufgabe_2/index.html", "_self");
        }
    }

    function showChoices(): void {
        let headPic: HTMLImageElement = document.createElement("img");
        let bodyPic: HTMLImageElement = document.createElement("img");
        let feetPic: HTMLImageElement = document.createElement("img");
        choicesSoFar.appendChild(headPic);
        choicesSoFar.appendChild(bodyPic);
        choicesSoFar.appendChild(feetPic);

    }

    function getSubpage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }

    let currentPage: string = getSubpage();
    console.log(currentPage);

    if (currentPage == "head.html") {
        for (let i: number = 0; i < parsedData.heads.length; i++) {
            infoLine.innerText = "Bitte wählen Sie einen Kopf, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.heads[i], "head");
        }
    }
    if (currentPage == "body.html") {
        for (let i: number = 0; i < parsedData.bodies.length; i++) {
            infoLine.innerText = "Bitte wählen Sie einen Körper, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.bodies[i], "body");
        }
    }
    if (currentPage == "feet.html") {
        for (let i: number = 0; i < parsedData.feet.length; i++) {
            infoLine.innerText = "Bitte wählen Sie die Füße, um Ihren eigenen Entenhausener zusammenzusetzen.";
            createAPart(parsedData.feet[i], "feet");
        }
    }
    if (currentPage == "index.html") {

        let info1: HTMLParagraphElement = document.createElement("p");
        info1.innerText = "Als Projekt für mein Studium möchte ich auf dieser Webseite den Benutzer einen Entenhausener aus Bildern ausgewählter Figuren zusammenbauen lassen.";
        main.appendChild(info1);

        let info2: HTMLParagraphElement = document.createElement("p");
        info2.innerText = "Bitte drücken Sie auf den untenstehenden Button, um zu beginnen.";
        main.appendChild(info2);
    }

}

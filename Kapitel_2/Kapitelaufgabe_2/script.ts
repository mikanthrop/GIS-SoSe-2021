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
    let headArray: APart[] = JSON.parse(jsonHeads);
    let bodyArray: APart[] = JSON.parse(jsonBodies);
    let feetArray: APart[] = JSON.parse(jsonFeet);

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
    //creating the space were APart s will be appended to
    let presentPartSpace: HTMLDivElement = document.createElement("div");
    presentPartSpace.setAttribute("id", "Choices");
    main.appendChild(presentPartSpace);

    function createAPart(_part: APart, _thisPart: string): void {
        //creates overarching div-element
        let flexitem: HTMLDivElement = document.createElement("div");
        presentPartSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic: HTMLImageElement = document.createElement("img");
        pic.setAttribute("src", _part.picture);
        pic.setAttribute("height", 200 + "px");
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
        button.setAttribute("class", _thisPart);
        flexitem.appendChild(button);
        button.addEventListener("click", handleClickButton);

        function handleClickButton(_event: MouseEvent): void {
            console.log(_part);
            if (button.className == "head") 
            button.setAttribute("href", "../Kapitelaufgabe_2/body.html");

            
        }
    }

    for (let i: number = 0; i < headArray.length; i++) {
        infoLine.innerText = "Bitte wählen Sie einen Kopf, um Ihren eigenen Entenhausener zusammenzusetzen.";
        createAPart(headArray[i], "head");
    }
    let currentPage: string = window.location.href;
    console.log(currentPage);
    

}

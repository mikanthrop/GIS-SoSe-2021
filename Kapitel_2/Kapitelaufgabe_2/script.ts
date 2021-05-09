namespace Kapitelaufgabe2 {

    export interface Head {
        picture: string;
        name: string;
        animal: string;
        hat: boolean;
        color?: string;
    }
    export interface Body {
        name: string;
        animal: string;
        clothes: boolean;
        color?: string;
    }
    export interface Feet {
        name: string;
        animal: string;
        shoes: boolean;
        color?: string;
    }
    interface PickedBodyParts {
        head: Head;
        body: Body;
        feet: Feet;
    }

    

    function textilesExist(_textile: boolean): string {
        if (_textile == true) return "vorhanden";
        else return "nicht vorhanden";
    }
    let header: HTMLElement = document.createElement("header");
    document.body.appendChild(header);
    let main: HTMLElement = document.createElement("main");
    document.body.appendChild(main);
    let footer: HTMLElement = document.createElement("footer");
    document.body.appendChild(footer);

    let homeLink: HTMLAnchorElement = document.createElement("a");
    homeLink.innerText = "Build-A-Entenhausener";
    homeLink.setAttribute("style", "padding: " + 20 + "px; margin: " + 5 + "px; font-size: " + 40 + "px; text-transform: capitalize; font-weight: bold");
    homeLink.setAttribute("href", "../Kapitelaufgabe_2/index.html");
    header.appendChild(homeLink);

    let infoLine: HTMLParagraphElement = document.createElement("p");
    infoLine.setAttribute("style", "fontsize: " + 30 + "px; color: inherit");
    infoLine.setAttribute("id", "info");
    infoLine.innerText = "Bitte wählen Sie einen Kopf aus, um Ihren eigenen Entenhausener zusammenzusetzen.";
    main.appendChild(infoLine);

    let presentHeadSpace: HTMLElement = document.createElement("div");
    presentHeadSpace.setAttribute("id", "headChoices");
    main.appendChild(presentHeadSpace);

    // creating the items inside the flexbox
    for (let i: number = 0; i < headArray.length; i++) {
        //creates overarching div-element
        let flexitem: HTMLDivElement = document.createElement("div");
        presentHeadSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic: HTMLImageElement = document.createElement("img");
        pic.setAttribute("src", headArray[i].picture);
        pic.setAttribute("height", 300 + "px");
        flexitem.appendChild(pic);
        //following lines create paragraph elements with info
        let name: HTMLParagraphElement = document.createElement("p");
        name.innerText = "Name: " + headArray[i].name;
        flexitem.appendChild(name);
        let animal: HTMLParagraphElement = document.createElement("p");
        animal.innerText = "Tierart: " + headArray[i].animal;
        flexitem.appendChild(animal);
        let hat: HTMLParagraphElement = document.createElement("p");
        hat.innerText = "Hut: " + textilesExist(headArray[i].hat);
        flexitem.appendChild(hat);
        let color: HTMLParagraphElement = document.createElement("p");
        color.innerText = "Farbe des Hutes: " + headArray[i].color;
        if (headArray[i].hat == true) flexitem.appendChild(color);
        //adds eventlistener for doubletapping the pic
        //pic.addEventListener("dblclick", handlePicDblClick);
        let button: HTMLButtonElement = document.createElement("button");
        button.innerText = "Dieser Kopf";
        flexitem.appendChild(button);
        button.addEventListener("click", handleClickButton);

        function handleClickButton(_event: MouseEvent): void {
            console.log(headArray[i]);
        }
    }
}

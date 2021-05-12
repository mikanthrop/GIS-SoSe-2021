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

    function setUpBody(_specificDisplay: string): HTMLElement[] {
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
        infoLine.innerText = "Bitte wählen Sie einen " + _specificDisplay + " aus, um Ihren eigenen Entenhausener zusammenzusetzen.";
        main.appendChild(infoLine);

        let presentPartSpace: HTMLDivElement = document.createElement("div");
        presentPartSpace.setAttribute("id", _specificDisplay + "Choices");
        main.appendChild(presentPartSpace);

        let specificDisplay: HTMLSpanElement = document.createElement("span");
        specificDisplay.innerText = _specificDisplay;
        return [presentPartSpace, specificDisplay];
    }

    function createAPart(_whichPartArray: APart[], _wrapperAndDisplay: HTMLElement[], _index: number): void {
        //creates overarching div-element
        let flexitem: HTMLDivElement = document.createElement("div");
        _wrapperAndDisplay[0].appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic: HTMLImageElement = document.createElement("img");
        
        pic.setAttribute("height", 300 + "px");
        flexitem.appendChild(pic);
        //following lines create paragraph elements with info
        let name: HTMLParagraphElement = document.createElement("p");
        name.innerText = "Name: " + _whichPartArray.[_index].name;
        flexitem.appendChild(name);
        let animal: HTMLParagraphElement = document.createElement("p");
        animal.innerText = "Tierart: " + _whichPartArray[_index].animal;
        flexitem.appendChild(animal);
        //adds eventlistener for doubletapping the pic
        //pic.addEventListener("dblclick", handlePicDblClick);
        let button: HTMLButtonElement = document.createElement("button");
        button.innerText = "Dieser " + _wrapperAndDisplay[1];
        flexitem.appendChild(button);
        button.addEventListener("click", handleClickButton);

        function handleClickButton(_event: MouseEvent): void {
            console.log(_whichPartArray[_index]);
        }
    }


    let currentPageData: HTMLElement[] = setUpBody("Kopf");
    // creating the items inside the flexbox
    for (let i: number = 0; i < _whichPartArray.length; i++) {
        createAPart(currentPageData[], i);
    }
}

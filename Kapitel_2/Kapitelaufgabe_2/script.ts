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

    function handlePicDblclick(_event: Event): void {
        //kann von hier außen ja nicht auf 
        this.pic
    }

    let presentHeadSpace: HTMLElement = document.getElementById("headChoices");
    for (let i: number = 0; i < headArray.length; i++) {
        //creates overarching div-element
        let flexitem: HTMLDivElement = document.createElement("div");
        presentHeadSpace.appendChild(flexitem);
        //creates picture whose path is saved as a string
        let pic: HTMLImageElement = document.createElement("img");
        pic.setAttribute("src", headArray[i].picture);
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
        pic.addEventListener("dblclick", handlePicDblclick);
    }
}
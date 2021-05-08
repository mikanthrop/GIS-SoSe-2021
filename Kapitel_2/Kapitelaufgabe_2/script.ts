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

    let presentHeadSpace: HTMLElement = document.getElementById("headChoices");
    for (let i: number = 0; i < headArray.length; i++) {
        let flexitem: HTMLDivElement = document.createElement("div");
        presentHeadSpace.appendChild(flexitem);
        let pic: HTMLImageElement = document.createElement("img");
        pic.setAttribute("src", headArray[i].picture);
        flexitem.appendChild(pic);
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
    }

    function handleClickPicture(_event: Event): void {
        _event.target
    }
}
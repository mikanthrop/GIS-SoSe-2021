"use strict";
var Kapitelaufgabe2;
(function (Kapitelaufgabe2) {
    function textilesExist(_textile) {
        if (_textile == true)
            return "vorhanden";
        else
            return "nicht vorhanden";
    }
    let presentHeadSpace = document.getElementById("headChoices");
    for (let i = 0; i < Kapitelaufgabe2.headArray.length; i++) {
        let flexitem = document.createElement("div");
        presentHeadSpace.appendChild(flexitem);
        let pic = document.createElement("img");
        pic.setAttribute("src", Kapitelaufgabe2.headArray[i].picture);
        flexitem.appendChild(pic);
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
    }
    function handleClickPicture(_event) {
        _event.target;
    }
})(Kapitelaufgabe2 || (Kapitelaufgabe2 = {}));
//# sourceMappingURL=script.js.map
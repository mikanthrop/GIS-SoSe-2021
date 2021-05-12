"use strict";
var Kapitelaufgabe2;
(function (Kapitelaufgabe2) {
    //heads
    let headArray = [
        {
            picture: "../Kapitelaufgabe_2/images/head/dagobert_head.png",
            name: "Dago",
            animal: "Ente"
        },
        {
            picture: "../Kapitelaufgabe_2/images/head/mickey_head.png",
            name: "Mic",
            animal: "Maus"
        },
        {
            picture: "../Kapitelaufgabe_2/images/head/goofy_head.png",
            name: "Go",
            animal: "Hund"
        },
        {
            picture: "../Kapitelaufgabe_2/images/head/klarabella_head.png",
            name: "Klara",
            animal: "Kuh"
        }
    ];
    //bodies
    let bodyArray = [
        {
            picture: "../Kapitelaufgabe_2/images/body/dagobert_body.png",
            name: "bert",
            animal: "Ente"
        },
        {
            picture: "../Kapitelaufgabe_2/images/body/mickey_body.png",
            name: "key",
            animal: "Maus"
        },
        {
            picture: "../Kapitelaufgabe_2/images/body/goofy_body.png",
            name: "of",
            animal: "Hund"
        },
        {
            picture: "../Kapitelaufgabe_2/images/body/klarabella_body.png",
            name: "bella",
            animal: "Kuh"
        }
    ];
    //feet
    let feetArray = [
        {
            picture: "../Kapitelaufgabe_2/images/feet/dagobert_feet.png",
            name: " Duck",
            animal: "Ente"
        },
        {
            picture: "../Kapitelaufgabe_2/images/feet/mickey_feet.png",
            name: " Mouse",
            animal: "Maus"
        },
        {
            picture: "../Kapitelaufgabe_2/images/feet/goofy_feet.png",
            name: "y",
            animal: "Hund"
        },
        {
            picture: "../Kapitelaufgabe_2/images/feet/klarabella_feet.png",
            name: " Kuh",
            animal: "Kuh"
        }
    ];
    let allParts = {
        heads: headArray,
        bodies: bodyArray,
        feet: feetArray
    };
    Kapitelaufgabe2.jsonHeads = JSON.stringify(headArray);
    Kapitelaufgabe2.jsonBodies = JSON.stringify(bodyArray);
    Kapitelaufgabe2.jsonFeet = JSON.stringify(feetArray);
    Kapitelaufgabe2.allData = JSON.stringify(allParts);
    let parsedData = JSON.parse(Kapitelaufgabe2.allData);
})(Kapitelaufgabe2 || (Kapitelaufgabe2 = {}));
//# sourceMappingURL=data.js.map
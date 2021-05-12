namespace Kapitelaufgabe2 {
    //heads
    export let headArray: APart[] = [
        {
        picture: "../Kapitelaufgabe_2/images/head/dagobert_head.png",
        name: "Dagobert Duck",
        animal: "Ente"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/head/mickey_head.png",
            name: "Mickey Mouse",
            animal: "Maus"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/head/goofy_head.png",
            name: "Goofy",
            animal: "Hund"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/head/klarabella_head.png",
            name: "Klarabella Kuh",
            animal: "Kuh"
        }
    ];
    //bodies
    export let bodyArray: APart[] = [
        {
            picture: "../Kapitelaufgabe_2/images/body/dagobert_body.png",
            name: "Dagobert Duck",
            animal: "Ente"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/body/mickey_body.png",
            name: "Mickey Mouse",
            animal: "Maus"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/body/goofy_body.png",
            name: "Goofy",
            animal: "Hund"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/body/klarabella_body.png",
            name: "Klarabella Kuh",
            animal: "Kuh"
        }
    ];
    //feet
    export let feetArray: APart[] = 
    [
        {
            picture: "../Kapitelaufgabe_2/images/feet/dagobert_feet.png",
            name: "Dagobert Duck",
            animal: "Ente"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/feet/mickey_feet.png",
            name: "Mickey Mouse",
            animal: "Maus"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/feet/goofy_feet.png",
            name: "Goofy",
            animal: "Hund"
        }, 
        {
            picture: "../Kapitelaufgabe_2/images/feet/klarabella_feet.png",
            name: "Klarabella Kuh",
            animal: "Kuh"
        }
    ];

    let allParts: AllParts = {
        heads: headArray,
        bodies: bodyArray,
        feet: feetArray
    };

    export let allData: string = JSON.stringify(allParts);
    let parsedData: AllParts = JSON.parse(allData);
}
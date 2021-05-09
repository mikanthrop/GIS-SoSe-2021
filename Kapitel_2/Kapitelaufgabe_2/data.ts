namespace Kapitelaufgabe2 {
    //heads
    let head1: Head = {
        picture: "../Kapitelaufgabe_2/dagobert-duck.png",
        name: "Dagobert Duck",
        animal: "Ente",
        hat: true,
        color: "Schwarz"
    };
    let head2: Head = {
        picture: "../Kapitelaufgabe_2/mickey_mouse.png",
        name: "Mickey Mouse",
        animal: "Maus",
        hat: false
    };
    let head3: Head = {
        picture: "../Kapitelaufgabe_2/goofy.png",
        name: "Goofy",
        animal: "Hund",
        hat: true,
        color: "Blau"
    };
    let head4: Head = {
        picture: "../Kapitelaufgabe_2/klarabella.png",
        name: "Klarabella Kuh",
        animal: "Kuh",
        hat: false
    };
    export let headArray: Head[] = [head1, head2, head3, head4];
    //bodies
    let body1: Body = {
        name: "Dagobert Duck",
        animal: "Ente",
        clothes: true,
        color: "Rot"
    };
    let body2: Body = {
        name: "Mickey Mouse",
        animal: "Maus",
        clothes: true, 
        color: "Rot"
    };
    let body3: Body = {
        name: "Goofy",
        animal: "Hund",
        clothes: true,
        color: "Rot" + ", " + "blau"
    };
    let body4: Body = {
        name: "Klarabella Kuh",
        animal: "Kuh",
        clothes: true,
        color: "Gelbd"
    };
    export let bodyArray: Body[] = [body1, body2, body3, body4];
    //feet
    let feet1: Feet = {
        name: "Dagobert Duck",
        animal: "Ente",
        shoes: true,
        color: "Blau"
    };
    let feet2: Feet = {
        name: "Mickey Mouse",
        animal: "Maus",
        shoes: true,
        color: "Gelb"
    };
    let feet3: Feet = {
        name: "Goofy",
        animal: "Hund",
        shoes: true,
        color: "Braun"
    };
    let feet4: Feet = {
        name: "Klarabella Kuh",
        animal: "Kuh",
        shoes: true,
        color: "Rot"
    };
    export let feetArray: Feet[] = [feet1, feet2, feet3, feet4];
}
namespace Aufgabe2_3_1 {
    let buttonRect: HTMLElement = document.getElementById("newRectangle");
    let resetPage: HTMLElement = document.getElementById("cleanPage");
    let rectSpace: HTMLElement = document.getElementById("rectangleSpace");


    function handleClickButtonRect(_event: Event): void {
        let rectangle: HTMLDivElement = document.createElement("div");
        let color: string = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255)
            + "," + Math.round(Math.random() * 255) + ")";
        rectangle.setAttribute("style", " position: relative; background-color: " + color + "; height: "
            + Math.random() * 100 + "px; width: " + Math.random() * 100 + "px; top: " + Math.random() * 100 +
            "px; left: " + Math.random() * 1000 + "px;");
        rectSpace.appendChild(rectangle);
    }

    function handleClickResetPage(_event: Event): void {
        window.open("index.html", "_self");
    }

    buttonRect.addEventListener("click", handleClickButtonRect);
    resetPage.addEventListener("click", handleClickResetPage);
}
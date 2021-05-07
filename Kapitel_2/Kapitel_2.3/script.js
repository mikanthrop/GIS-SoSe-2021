"use strict";
var Aufgabe2_3_1;
(function (Aufgabe2_3_1) {
    let buttonRect = document.getElementById("newRectangle");
    let resetPage = document.getElementById("cleanPage");
    let rectSpace = document.getElementById("rectangleSpace");
    function handleClickButtonRect(_event) {
        let rectangle = document.createElement("div");
        let color = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255)
            + "," + Math.round(Math.random() * 255) + ")";
        rectangle.setAttribute("style", " position: relative; background-color: " + color + "; height: "
            + Math.random() * 100 + "px; width: " + Math.random() * 100 + "px; top: " + Math.random() * 100 +
            "px; left: " + Math.random() * 1000 + "px;");
        rectSpace.appendChild(rectangle);
    }
    function handleClickResetPage(_event) {
        window.open("index.html", "_self");
    }
    buttonRect.addEventListener("click", handleClickButtonRect);
    resetPage.addEventListener("click", handleClickResetPage);
})(Aufgabe2_3_1 || (Aufgabe2_3_1 = {}));
//# sourceMappingURL=script.js.map
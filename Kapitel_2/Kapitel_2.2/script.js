"use strict";
// Aufgabe 1 - Mehr "langweilige" Konsolenausgaben
var Aufgabe2_2;
(function (Aufgabe2_2) {
    // a)
    function min(..._numbers) {
        let currentmin = _numbers[0];
        for (let i = 1; i < _numbers.length; i++) {
            if (currentmin > _numbers[i]) {
                currentmin = _numbers[i];
            }
        }
        return currentmin;
    }
    console.log(min(-2, 9, 14, 0, -1, 70, 100023, 3.2, 3, -4));
    // b)
    function isEven(_number) {
        let boolisEven;
        if (_number == 0) {
            boolisEven = true;
            return boolisEven;
        }
        else if (_number == 1) {
            boolisEven = false;
            return boolisEven;
        }
        else {
            _number -= 2;
            return isEven(_number);
        }
    }
    console.log(isEven(50));
    console.log(isEven(75));
    /* für -1 würde die Funktion immer weiter ins Minus zählen, ohne jemals bei 0 oder 1 anzukommen, wodurch es zu einem Stack Overflow
    kommt, da sich die Funktion zu oft selbst aufgerufen hat.
    Folgende bessere Version verhindert diesen Stack Overflow:

    function refinedisEven(_number: number): boolean {
        if (_number == 0) return true;
        else if (_number == 1) return false;
        else {
            if (_number > 0) _number -= 2;
            else if (_number < 0) _number += 2;
            return refinedisEven(_number);
        }
    }

    console.log(refinedisEven(-1));
    Durch die zusätzliche Verzweigung im else-Statement kann überprüft werden, ob die übergebene Zahl positiv oder negativ ist. Dadurch
    kann auch -1 korrekt gehandhabt werden.*/
    //c)
    /*interface Student {
        lastName: string;
        firstName: string;
        studies: string;
        matricNumber: number;
        semester?: number;

    let s1: Student = {lastName: "Nieberg", firstName: "Annika", studies: "Medienkonzeption Bachelor", matricNumber: 192380, semester: 2};
    let s2: Student = {lastName: "Arlington", firstName: "Jayden", studies: "Onlinemedien Bachelor", matricNumber: 298312, semester: 4};
    let s3: Student = {lastName: "Ahorn", firstName: "Nora", studies: "Medieninformatik Bachelor", matricNumber: 200318};
    
    let studentArray: Student[] = [s1, s2, s3, {lastName: "Fischer-Pham", firstName: "Paul", studies: "Informatik", matricNumber: 192238}];
    console.log(s2.semester, s3.studies, s1.firstName, studentArray[3].studies, studentArray[2].matricNumber);

    function showInfo(_generic: Student): void {
        console.log(_generic.lastName, _generic.firstName, _generic.matricNumber);
    }
    showInfo(s1);
    showInfo(s2);
    showInfo(s3);
    showInfo(studentArray[3]);*/
    class Student {
        constructor(_ln, _fn, _studies, _matricNumber, _semester) {
            this.lastName = _ln;
            this.firstName = _fn;
            this.studies = _studies;
            this.matricNumber = _matricNumber;
            this.semester = _semester;
        }
        showInfo() {
            console.log(this.lastName + ", " + this.firstName + ", " + this.matricNumber);
        }
    }
    let s1 = new Student("Diebitz", "Lisa", "MKB", 299109, 1);
    s1.showInfo();
    // Aufgabe 2 - Arrays     
    let testArray = [1, 9, 38, 2.3, 799, 201, -122];
    let bestArray = [29, 183, 1.5, 192, -21.3, 92];
    //let restArray: number[] = [32, 2, -234, 19222, 53.9, 123];
    // a) 
    function backwards(_forwardsArray) {
        let backwardsArray = [];
        for (let i = _forwardsArray.length - 1; i >= 0; i--) {
            backwardsArray.push(_forwardsArray[i]);
        }
        return backwardsArray;
    }
    console.log(backwards(testArray));
    console.log(backwards(bestArray));
    // b)
    function join(_firstArray, _secondArray) {
        let combinedArrays = _firstArray;
        for (let i = 0; i < _secondArray.length; i++) {
            combinedArrays.push(_secondArray[i]);
        }
        return combinedArrays;
    }
    console.log(join(testArray, bestArray));
    // Bonus 
    /*function joinSeveral(... _numberArrays: number[][]): number[] {
        let combinedArrays: number[] = _numberArrays[0];
        for (let indexOverallArray: number = 1; indexOverallArray < _numberArrays.length; indexOverallArray++) {
            for (let indexIndividualArray: number = 0; indexIndividualArray < _numberArrays[indexOverallArray].length; indexIndividualArray++) {
                combinedArrays.push(_numberArrays[indexOverallArray][indexIndividualArray]);
            }
        }
        return combinedArrays;
    }
    console.log(joinSeveral(testArray, bestArray, restArray));*/
    /* Die Funktion joinSeveral() bringt die Seite und damit meinen Debugger zum Absturz, aufgrund von Speichermangel. Ich gehe daher
    davon aus, dass sie in der Theorie einigermaßen korrekt programmiert ist, aber zu einem Stack Overflow führt.
    Ich wusste auch nicht genau, wie ich meine Idee in Typescript umsetzen soll. Die Idee war folgende:
    Die Arrays, die als Parameter übergeben werden als einen Array mit lauter Arrays als gespeicherten Variablentypen annehmen.
    Dann den großen Array mit der äußeren for-Schleife durchgehen, und damit festlegen, bei welchem Array wir uns befinden. Mit
    der inneren for-Schleife wollte ich dann die einzelnen Arrays durchgehen und ihre Stellenwerte im Array combinedArrays speichern.
    In diesen wollte ich außerdem bereits den ersten Array füllen, sodass dort weniger Rechenleistung verbraucht wird.
    Mein Hauptproblem war meiner Meinung nach, dass ich nicht wusste, wie ich einen numberArray mit lauter numberArrays deklariere.
    Daher habe ich mich der Java-Schreibweise für einen zweidimensionalen Array bedient, was vom Linter keinen Fehler zurückgab.*/
    // c)
    function split(_longArray, _firstIndex, _secondIndex) {
        let arrayInBetween = [];
        if (_firstIndex > 0 && _firstIndex < _longArray.length && _secondIndex > 0 && _secondIndex < _longArray.length) {
            for (let i = _firstIndex; i <= _secondIndex; i++) {
                arrayInBetween.push(_longArray[i]);
            }
            return arrayInBetween;
        }
        else
            return [];
    }
    console.log(split(bestArray, 2, 9));
    console.log(split(testArray, 3, 5));
    //Testcode
    let arr = [5, 42, 17, 2018, -10, 60, -10010];
    let arrBack = backwards(arr);
    console.log(arr);
    console.log(arrBack);
    console.log(join(arr, [15, 9001, -440]));
    //console.log(join([123, 666, -911], arr, [15, 9001, -440, 1024])); // Bonus b)
    arr = split(arr, 0, 4);
    console.log(arr);
    console.log(split(arr, 1, 2));
    console.log(split(arr, 2, 0)); // Bonus c)
    console.log(split(arr, -1, 2)); // Bonus c)
    console.log(split(arr, 0, 7)); // Bonus c)
    // Aufgabe 3 - Endlich was visuelles!
    // a)
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.lineWidth = 10;
    // sky
    context.strokeStyle = "rgb(0, 210, 400)";
    context.fillStyle = "rgb(0, 210, 400)";
    context.beginPath();
    context.moveTo(5, 5);
    context.lineTo(695, 5);
    context.lineTo(695, 230);
    context.lineTo(5, 230);
    context.closePath();
    context.stroke();
    context.fill();
    // ground
    context.strokeStyle = "rgb(160, 400, 120)";
    context.fillStyle = "rgb(160, 400, 120)";
    context.beginPath();
    context.moveTo(5, 240);
    context.lineTo(695, 240);
    context.lineTo(695, 495);
    context.lineTo(5, 495);
    context.closePath();
    context.stroke();
    context.fill();
    // hous
    context.strokeStyle = "rgb(250, 200, 400)";
    context.fillStyle = "rgb(250, 200, 400)";
    context.beginPath();
    context.moveTo(60, 210);
    context.lineTo(240, 210);
    context.lineTo(240, 400);
    context.lineTo(60, 400);
    context.closePath();
    context.stroke();
    context.fill();
    // roof
    context.strokeStyle = "rgb(400, 0, 0)";
    context.fillStyle = "rgb(400, 0, 0)";
    context.beginPath();
    context.moveTo(50, 200);
    context.lineTo(150, 120);
    context.lineTo(250, 200);
    context.closePath();
    context.stroke();
    context.fill();
    // treetrunk
    context.strokeStyle = "rgb(70, 70, 40)";
    context.fillStyle = "rgb(70, 70, 40)";
    context.beginPath();
    context.moveTo(470, 220);
    context.lineTo(510, 220);
    context.lineTo(510, 420);
    context.lineTo(470, 420);
    context.closePath();
    context.stroke();
    context.fill();
    // leaves
    context.strokeStyle = "rgb(0, 400, 0)";
    context.fillStyle = "rgb(0, 400, 0)";
    context.beginPath();
    let circleTree = new Path2D();
    circleTree.arc(490, 120, 100, 0, 2 * Math.PI);
    context.stroke(circleTree);
    context.fill(circleTree);
    // b)
    class Rectangle {
        // c)
        constructor() {
            this.xLeft = this.createRandoNumberX(700);
            this.yHigh = this.createRandoNumberY(500);
            this.xRight = this.createRandoNumberX(700);
            this.yLow = this.createRandoNumberY(500);
        }
        setLineWidth(_lineWidth) {
            context.lineWidth = _lineWidth;
        }
        // d)
        drawRect() {
            context.beginPath();
            context.moveTo(this.xLeft, this.yHigh);
            context.lineTo(this.xRight, this.yHigh);
            context.lineTo(this.xRight, this.yLow);
            context.lineTo(this.xLeft, this.yLow);
            context.closePath();
            context.stroke();
        }
        createRandoNumberX(_canvasWidth) {
            return Math.random() * _canvasWidth;
        }
        createRandoNumberY(_canvasHeight) {
            return Math.random() * _canvasHeight;
        }
    }
    let rectArray = [];
    let turnes = 7;
    context.strokeStyle = "black";
    for (let i = 0; i <= turnes; i++) {
        rectArray[i] = new Rectangle();
        rectArray[i].setLineWidth(i + 1);
        rectArray[i].drawRect();
    }
})(Aufgabe2_2 || (Aufgabe2_2 = {}));
/*// b)
interface Rectangle {
    xLeft: number;
    yHigh: number;
    xRight: number;
    yLow: number;
}

// c)
function createRect() {
    let magnifier: number = 10;
    let xLeft: number = Math.random() * magnifier;
    let yHigh: number = Math.random() * magnifier;
    let xRight: number = Math.random() * magnifier;
    let yLow: number = Math.random() * magnifier;
    context.beginPath();
    moveTo
    }
function randomNumber()*/ 
//# sourceMappingURL=script.js.map
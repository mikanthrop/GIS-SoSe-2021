"use strict";
//Aufgabe 1 - Basics
var Aufgabe1;
(function (Aufgabe1) {
    function a3() {
        let BB = "Alles";
        console.log(BB);
        func1();
        console.log(BB);
        func2();
        console.log(BB);
        console.log("Logo!");
    }
    a3();
    function func1() {
        console.log("Gute?");
    }
    function func2() {
        console.log("klar?");
    }
})(Aufgabe1 || (Aufgabe1 = {}));
/* a)
Die Ausgabe ist
Alles
Klar?
Logo!
Als Namen sind Großbuchstaben zulässig. Nur Zahlen nicht. Zahlen zuerst, dann ein Buchstabe auch nicht. Zuerst Buchstabe dann Zahl funktinoiert.
§-Zeichen funktioniert im Namen nicht, genauso wenig wie andere Zeichen, die hardwired sind, wie %, &, ?, =. Punkte und Kommata sind ebenfalls nicht zulässig.
*/
/* b)
Zuerst wird die Funktion a3() aufgerufen, welche den string BB auf "Alles" setzt und diesen ausgibt. Dann wird die func1 aufgerufen, welche in die Konsole
ausgeben lässt: "Klar?" Als letztes wird in die Konsole "Logo!" ausgegeben. */
//Aufgabe 2 - Kontinuierliche Variablenmanipulation
var Aufgabe2;
(function (Aufgabe2) {
    function a2() {
        let i = 9;
        do {
            console.log(i);
            i = i - 1;
        } while (i > 0);
    }
    a2();
})(Aufgabe2 || (Aufgabe2 = {}));
/* Die Funktion a2 hat keinen Rückgabewert. In ihr wird i initalisiert und auf 9 gesetzt. In einer do-while Schleife wird i zuerst in der Konsole ausgegeben, bevor es
in einer Einser-Schritten heruntergezählt wird. Die Bedingung im while-Teil der Schleife lässt die do-Schleife i soweit runterzählen, bis i==1 da das die letzte Zahl
ist, die in diesem Szenario größer als 0 ist.
Auf der Konsole wird ausgegeben:
9
8
7
6
5
4
3
2
1*/
//Aufgabe 3 - Fehler erkennen und vermeiden lernen
/* VS mag es auf jeden Fall nicht, wenn zwischen die Funktionsbezeichnungn und die runden Klammern ein Punkt und der Name einer nicht existenten Variable geschrieben werden.
(Also so: a2.i()) Das gibt 32 Fehlermeldungen,  21 davon mit einem dicken roten Kreuz. Ich würde daraus absolut nicht schlau werden.
Andere, kleinere Sachen sind: statt nach console einen Punkt für console.log() zu machen, einen Doppelpunkt schreiben console:log() Dann findet er den Namen log nicht. Wüsste ich jetzt auch nicht genau, woran ich bin, aber icch würde es herausfinden.
Nur einen Punkt nach einer Variable oder Funktion zu machen, sagt Variable declaration expected, was Sinn macht.
In den Deklarationsköpfen von Funktionen scheint er sehr fehlermeldefreudig zu sein; vertauscht man die runden Klammer der Funktion mit eckigen, tauchen erneut exakt 32 Fehlermeldungen auf
und alles in der Funktion wird bemängelt.*/
//Aufgabe 4 - Global vs Lokal
var Aufgabe4;
(function (Aufgabe4) {
    let x = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    func3();
    console.log(x);
    function func1(y) {
        y = "Bla";
        console.log(y);
    }
    function func2() {
        let x = "Blubb";
        console.log(x);
    }
    function func3() {
        x = "Test";
    }
})(Aufgabe4 || (Aufgabe4 = {}));
/* a) Ausgabe
Meine Annahme:
Hallo
Bla
Bla
Blubb
Bla

Was tatsächlich herauskam:
Hallo
Bla
Hallo
Blubb
Test

Das zweite Bla ist falsch angenommen, da nicht x selbst an func1 übergeben und darin überschrieben wird, sondern nur der Wert, der in x gespeichert ist.
Dieser wird dann in y gespeichert und dort, in dieser lokalen Variable, überschrieben. Dementsprechend wird bei der Ausgabe von x der global
festgelegte Wert von x "Hallo" ausgegeben. An func3 wird die globale Variable x übergeben, in den diese den String "Test" schreibt, woraufhin dieser ausgegeben wird.
Nicht, wie von mir angenommen, dass func3 überhaupt keinen Einfluss auf x nimmt.
*/
/* b)
Eine globale Variable wird im äußersten Block des Programms festgelegt (oder mit dem Wert public gekennzeichnet, zumindest in Java, ich weiß nicht, ob das für
TypeScript auch geht oder etwas gleichwertiges existiert). Auf eine globale Variable kann von überall her zugegriffen werden. In TypeScript kann sie scheinbar auch von
"inneren" Blöcken wie Funktionen überschrieben werden (was mit const verhindert werden kann).
Lokale Variablen sind nur in ihrem Kontext existent, Beispiel hierfür sind der index einer for-Schleife oder Variablen in Funktionen und Methoden. Auf lokale Variablen
kann nur zugegriffen werden, wenn sich der Zugreifer im gleichen Kontext auf der gleichen "Stufe" wie die Variable bewegt. Auf den index einer for-Schleife kann
beispielsweise außerhalb der for-Schleife nicht zugegriffen werden.
Übergabeparameter existieren ebenfalls nur in ihrem Benutzungskontext, können aber schon außerhalb von diesem mit Wert befüllt werden. Dabei überschreiben sie die
Variablen nicht, von denen sie ihren Wert beziehen, sondern speichern diesen in eine neue, lokale Variable. Übergabeparamter können immer nur im Zusammenhang und mit
Nennung ihrer Funktion oder Methode befüllt werden.
"Normale" Variablen wie strings und Zahlen unterscheiden sich darin von Funktionen, dass sie bereits festgelegte und mit einem festen Wertebereich arbeitende, im
Code festgeschriebene Ausdrucksformen sind. Sie haben feste Anwendungsformen.
Funktionen sind flexibler. Man kann in sie Variablen verschiedenen Types speichern, initialisieren und deklarieren und ihnen Methoden mitgeben.
Andererseits wurden für die Benutzung von strings und Zahlen ebenfalls Funktionen geschrieben, die diesen Variablentypen einige grundlegende Methoden an die Hand geben.
*/
//Aufgabe 5
var Aufgabe5;
(function (Aufgabe5) {
    // a)
    function multiply(_num1, _num2) {
        return _num1 * _num2;
    }
    console.log(multiply(4, 8));
    console.log(multiply(17, 2.3));
    console.log(multiply(300, 12.5));
    // b)
    function max(_num1, _num2) {
        if (_num1 > _num2) {
            return _num1;
        }
        else if (_num1 < _num2) {
            return _num2;
        }
        else {
            return 0;
        }
    }
    console.log(max(1, 9));
    console.log(max(7, 6.9));
    console.log(max(4, 4));
    //c)
    function addUpToHundred() {
        let index = 1;
        let sum = 0;
        while (index <= 100) {
            sum += index;
            index += 1;
        }
        console.log(sum);
    }
    addUpToHundred();
    // d)
    function randoNumber() {
        for (let index = 0; index < 10; index++) {
            console.log(Math.random());
        }
    }
    randoNumber();
    //e)
    function factorial(_n) {
        let sum = 1;
        for (let index = 2; index <= _n; index++) {
            sum *= index;
        }
        return sum;
    }
    console.log(factorial(6));
    //f) 
    function leapyears() {
        for (let index = 1900; index <= 2021; index += 4) {
            if (index % 400 == 0) {
                console.log("leapyear " + index);
            }
            else if (index % 100 == 0) {
                console.log("not a leapyear: " + index);
            }
            else if (index % 4 == 0 && index % 100 != 0) {
                console.log("leapyear " + index);
            }
        }
    }
    leapyears();
})(Aufgabe5 || (Aufgabe5 = {}));
//Aufgabe 6 - Mehr Schleifen und Funktionen
var Aufgabe6;
(function (Aufgabe6) {
    //a
    let hashtag = "";
    for (let index = 0; index < 7; index++) {
        console.log(hashtag += "#");
    }
    //b 
    function fizzNumbers() {
        for (let index = 1; index <= 100; index++) {
            if (index % 5 == 0 && index % 3 != 0) {
                console.log("Buzz");
            }
            else if (index % 3 == 0) {
                console.log("Fizz");
            }
            else {
                console.log(index);
            }
        }
    }
    fizzNumbers();
    //c
    function fizzBuzzNumbers() {
        for (let index = 1; index <= 100; index++) {
            if (index % 5 == 0 && index % 3 != 0) {
                console.log("Buzz");
            }
            else if (index % 3 == 0 && index % 5 != 0) {
                console.log("Fizz");
            }
            else if (index % 15 == 0) {
                console.log("FizzBuzz");
            }
            else {
                console.log(index);
            }
        }
    }
    fizzBuzzNumbers();
    //d 
    function chessboard8x8() {
        let board = "";
        for (let row = 0; row < 8; row++) {
            for (let index = 0; index < 8; index++) {
                if (index == 0) {
                    if (row == 0) {
                        board += " ";
                    }
                    else {
                        if (row % 2 == 0) {
                            board += " ";
                        }
                        else {
                            board += "#";
                        }
                    }
                }
                else {
                    if (row % 2 != 0) {
                        if (index % 2 != 0) {
                            board += " ";
                        }
                        else {
                            board += "#";
                        }
                    }
                    else {
                        if (index % 2 != 0) {
                            board += "#";
                        }
                        else {
                            board += " ";
                        }
                    }
                }
                if (index == 7) {
                    board += "\n";
                }
            }
        }
        return board;
    }
    console.log(chessboard8x8());
    // e)
    function checkerboard(_heightWidth) {
        let board = "";
        for (let row = 0; row < _heightWidth; row++) {
            for (let index = 0; index < _heightWidth; index++) {
                if (index == 0) {
                    if (row == 0) {
                        board += " ";
                    }
                    else {
                        if (row % 2 == 0) {
                            board += " ";
                        }
                        else {
                            board += "#";
                        }
                    }
                }
                else {
                    if (row % 2 != 0) {
                        if (index % 2 != 0) {
                            board += " ";
                        }
                        else {
                            board += "#";
                        }
                    }
                    else {
                        if (index % 2 != 0) {
                            board += "#";
                        }
                        else {
                            board += " ";
                        }
                    }
                }
                if (index == _heightWidth - 1) {
                    board += "\n";
                }
            }
        }
        return board;
    }
    console.log(checkerboard(12));
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=script.js.map
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
    let s1 = { lastName: "Nieberg", firstName: "Annika", studies: "Medienkonzeption Bachelor", matricNumber: 192380, semester: 2 };
    let s2 = { lastName: "Arlington", firstName: "Jayden", studies: "Onlinemedien Bachelor", matricNumber: 298312, semester: 4 };
    let s3 = { lastName: "Ahorn", firstName: "Nora", studies: "Medieninformatik Bachelor", matricNumber: 200318 };
    let studentArray = [s1, s2, s3, { lastName: "Fischer-Pham", firstName: "Paul", studies: "Informatik", matricNumber: 192238 }];
    console.log(s2.semester, s3.studies, s1.firstName, studentArray[3].studies, studentArray[2].matricNumber);
    function showInfo(_lastName, _firstName, _matricNumber) {
        console.log(_lastName, _firstName, _matricNumber);
    }
    showInfo(s1);
})(Aufgabe2_2 || (Aufgabe2_2 = {}));
//# sourceMappingURL=script.js.map
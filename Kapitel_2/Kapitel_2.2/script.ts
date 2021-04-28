// Aufgabe 1 - Mehr "langweilige" Konsolenausgaben
namespace Aufgabe2_2 {
    // a)
    function min(..._numbers: number[]): number {
        let currentmin: number = _numbers[0];
        for (let i: number = 1; i < _numbers.length; i++) {
            if (currentmin > _numbers[i]) {
                currentmin = _numbers[i];
            }
        }
        return currentmin;
    }
    console.log(min(-2, 9, 14, 0, -1, 70, 100023, 3.2, 3, -4));

    // b)
    function isEven(_number: number): boolean {
        let boolisEven: boolean;
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
    interface Student {
        lastName: string;
        firstName: string;
        studies: string;
        matricNumber: number;
        semester?: number;
    }

    let s1: Student = {lastName: "Nieberg", firstName: "Annika", studies: "Medienkonzeption Bachelor", matricNumber: 192380, semester: 2};
    let s2: Student = {lastName: "Arlington", firstName: "Jayden", studies: "Onlinemedien Bachelor", matricNumber: 298312, semester: 4};
    let s3: Student = {lastName: "Ahorn", firstName: "Nora", studies: "Medieninformatik Bachelor", matricNumber: 200318};
    
    let studentArray: Student[] = [s1, s2, s3, {lastName: "Fischer-Pham", firstName: "Paul", studies: "Informatik", matricNumber: 192238}];
    console.log(s2.semester, s3.studies, s1.firstName, studentArray[3].studies, studentArray[2].matricNumber);

    function showInfo(_lastName: string, _firstName: string, _matricNumber: number): void {
        console.log(_lastName, _firstName, _matricNumber);
    }
    showInfo(s1);
}
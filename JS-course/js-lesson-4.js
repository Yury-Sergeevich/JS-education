"use strict";

/*          Task #1         */
console.log("Task#1");

function fillNumber(num) {
    // Проверки на текс и соответсвующие условия + обнуление данных

    if (isNaN(parseInt(num))) {
        console.log("'" + num + "'" + " is not a number");
        return number;
    }

    if (num < 0) console.log("Number < 0. The number will be converted to positive");

    if (num > 999) {
        console.log("Number > 1000");
        return number;
    }

    num = Math.abs(num).toString();

    if (num.length == 3) number.hundreds = num[num.length - 3];
    if (num.length >= 2) number.tens = num[num.length - 2];
    number.digits = num[num.length - 1];

    return number;
}

function showNumber() {
    if (number.hundreds) console.log("Hundreds:" + number.hundreds);
    if (number.tens) console.log("Tens:" + number.tens);
    if (number.digits) console.log("Digits:" + number.digits);

    console.log(number);
}
var number = {};

fillNumber(prompt("Enter a number again", 100));

while (true) {
    if (number.digits === undefined) {
        fillNumber(prompt("Enter a number again", 100));
        continue;
    }

    showNumber();
    break;
}

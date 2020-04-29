"use strict";

/*          Task #1         */
console.log("Task#1");

var number = {
    hundreds: undefined,
    tens: undefined,
    digits: undefined,

    fillNumber: function (num) {
        // Проверки на текс и соответсвующие условия + обнуление данных

        if (isNaN(parseInt(num))) {
            console.log("'" + num + "'" + " is not a number");
            return false;
        }

        if (num < 0) console.log("Number < 0. The number will be converted to positive");

        if (num > 999) {
            console.log("Number > 1000");
            return false;
        }

        num = Math.abs(num).toString().split("");

        if (num.length == 3) this.hundreds = num[num.length - 3];
        if (num.length >= 2) this.tens = num[num.length - 2];
        this.digits = num[num.length - 1];

        return true;
    },

    showNumber: function () {
        console.log("Number:");
        if (this.hundreds) console.log("Hundreds:" + this.hundreds);
        if (this.tens) console.log("Tens:" + this.tens);
        console.log("Digits:" + this.digits);
    },

    resetNumber: function () {
        this.hundreds = undefined;
        this.tens = undefined;
        this.digits = undefined;
    }
}

number.resetNumber();
var yourNum = prompt("Enter a number < 1000", 100);

while (true) {

    if (!number.fillNumber(yourNum)) {
        yourNum = prompt("Enter a number again", 100);
        continue;
    }

    number.showNumber();
    break;
}

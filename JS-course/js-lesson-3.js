"use strict";

/*              Task #1              */
/*              Task #1              */
/*              Task #1              */
document.write("<h1>Task #1</h1>");

function simpleNum(num) {

    var i = 2;
    while (i < num) {
        if (num % i == 0) return false;
        i++;
    }

    if (num == 0) return true;
    if (num == 1) return true;

    return true;
}

var scopeEnd = 100, // задаем конечную точку промежутка
    scopeStart = 0; //        начальную

while (scopeStart <= scopeEnd) {
    if (simpleNum(scopeStart)) document.write(scopeStart + " ");
    scopeStart++;
}

/*              Task #2              */
/*              Task #2              */
/*              Task #2              */
document.write("<h1>Task #2</h1>");

function evenNum(num) {
    if (num % 2 != 0) return false;

    return true;
}

scopeStart = 0; // переопределяем промежутки
scopeEnd = 10;

do {
    if (scopeStart == 0) document.write("<p>" + scopeStart + " - это ноль<p>");

    scopeStart++;

    if (evenNum(scopeStart)) {
        document.write("<p>" + scopeStart + " - четное число<p>");
    } else {
        document.write("<p>" + scopeStart + " - нечетное число<p>");
    }
} while (scopeStart != scopeEnd)

/*              Task #3              */
/*              Task #3              */
/*              Task #3              */
document.write("<h1>Task #3</h1>");

for (var i = 0; i <= 9; i++) document.write(i + " ");

/*              Task #4              */
/*              Task #4              */
/*              Task #4              */
document.write("<h1>Task #4</h1>");

var rowCounter = 20; // кол-во строк
var rowSymbol = "x"; // символ

// на мой взгляд следующая функция - лучшее решение задачи
function rowGen(symbol, count) {
    if (count == 0) return symbol;
    return symbol + rowGen(symbol, --count);
}


// решение согласно выученному материалу
function rowGen_2(count) {
    var row = "";
    for (var i = 0; i <= count; i++) row += rowSymbol;
    return row;
}

for (var i = 0; i < rowCounter; i++) {
    document.write("<p>" + rowGen(rowSymbol, i) + "</p>");
    console.log(rowGen_2(i));
}

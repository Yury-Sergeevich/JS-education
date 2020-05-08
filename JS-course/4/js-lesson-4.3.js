"use strict";

var usrName = prompt("Добро пожаловать на Большую игру. Введите свое имя", "Ivan");

if (prompt("Вы готовы рискнуть и  заработать  2^8 бит\n1 - да\n2 - нет", "1") == 1) gameInit();

function gameInit() {
    // инициализация кол-ва вопросов
    var questionCount = 5;
    var lose = false;
    var vinner = false;

    while (!lose && !vinner) {
        // запускаем генератор индекса вопроса +
        // скрипта, опрашивающего юзера
        if (getAnswer(genQuest()) == "lose") {
            lose = true;
            break;
        }

        //  если ответ верный, уменьшаем счетчик до победы
        if (--questionCount == 0) vinner = true;
    }

    // можно легко добавить лог действий, объевив массив объектов вне функций
    // и добавляя  в него значения из genQuest и getAnswer
    if (lose) alert(usrName + "! You lose your chance");
    if (vinner) alert(usrName + "! Viva victoria");
}

function genQuest() {
    //  генерируем индекс вопроса пока не найдем свободный вопрос
    while (true) {
        var questNum = Math.floor(Math.random() * questions.length);
        if (!questions[questNum].used) {
            questions[questNum].used = true;
            return questNum;
        }
    }
}

function getAnswer(questNum) {

    // генерируем полный текст вопроса, чтобы обращаться к нему
    var questTotalText = questions[questNum].text + "\n";
    questions[questNum].answers.forEach(function (item, index) {
        questTotalText += "\n" + ++index + " - " + item;
    });

    // получаем ответ и проверяем его на корректность
    var answ = +prompt(questTotalText, "1");

    while (true) {
        // проверка на текс
        if (isNaN(parseInt(answ))) {
            alert("Enter a number or 9 for exit");
            answ = +prompt(questTotalText, "1");
            continue;
        }

        // -- на "выход"
        if (answ == 9) {
            return "lose";
        }

        // -- на допустимость вводимого значения
        if (answ > questions[questNum].answers.length || answ < 1) {
            alert("The answer does not match the task. Enter a correct number or 9 for exit");
            answ = +prompt(questTotalText, "1");
            continue;
        }

        // -- на правильность ответа
        if (answ - 1 != questions[questNum].rightAnswer) return "lose";

        return;
    }
}

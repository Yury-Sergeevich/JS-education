"use strict";

var event, ok;
// добавляем в массив объект с вопросом и ответом. Используем Array.push()
// каждый раз после удачного хода, чтобы  после была возможность опросить лог
var log = [];


do { //Выводим первый вопрос
    ok = false;
    event = +prompt(works.a00 + works.a1 + works.a2 + '-1 - Выход из игры');
    if (event == -1) break;

    ok = isAnswer(works.a0, event);
} while (!ok);

switch (event) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        log.push({
            question: works.a00,
            answer: works.a1
        });
        do {
            ok = false;
            event = +prompt(works.b00 + works.b1 + works.b2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            } else {
                ok = isAnswer(works.b0, event);
            }
        } while (!ok);
        switch (event) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
                log.push({
                    question: works.b00,
                    answer: works.b1
                });
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.d0, event);
                        if (ok && event == 1) log.push({
                            question: works.d00,
                            answer: works.d1
                        });
                        if (ok && event == 2) log.push({
                            question: works.d00,
                            answer: works.d2
                        });
                    }
                } while (!ok);

                break;
            case 2: // Второе действие   Если ввели 2 то также переходим на 4 окно
                log.push({
                    question: works.b00,
                    answer: works.b2
                });
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.d0, event);
                        if (ok && event == 1) log.push({
                            question: works.d00,
                            answer: works.d1
                        });
                        if (ok && event == 2) log.push({
                            question: works.d00,
                            answer: works.d2
                        });
                    }
                } while (!ok);

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case 2: // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        log.push({
            question: works.a00,
            answer: works.a2
        });
        do {
            ok = false;
            event = +prompt(works.c00 + works.c1 + works.c2 + '-1 - Выход из игры');
            if (event == -1) {
                break;
            } else {
                ok = isAnswer(works.c0, event);
            }
        } while (!ok);
        switch (event) {
            case 1: // Второе действие
                log.push({
                    question: works.c00,
                    answer: works.c1
                });
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.d0, event);
                        if (ok && event == 1) log.push({
                            question: works.d00,
                            answer: works.d1
                        });
                        if (ok && event == 2) log.push({
                            question: works.d00,
                            answer: works.d2
                        });
                    }
                } while (!ok);

                break;
            case 2: // Второе действие
                log.push({
                    question: works.c00,
                    answer: works.c2
                });
                do {
                    ok = false;
                    event = +prompt(works.d00 + works.d1 + works.d2 + '-1 - Выход из игры');
                    if (event == -1) {
                        break;
                    } else {
                        ok = isAnswer(works.d0, event);
                        if (ok && event == 1) log.push({
                            question: works.d00,
                            answer: works.d1
                        });
                        if (ok && event == 2) log.push({
                            question: works.d00,
                            answer: works.d2
                        });
                    }
                } while (!ok);

                break;
            case -1: // Второе действие
                break;
            default:
                alert('Ошибка');
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert('Ошибка');
}
alert('Спасибо за игру');

var moveNumber = prompt("Enter a move number you want to see in log", 1);

while (true) {
    if (moveNumber > 0 && moveNumber <= log.length) {
        console.log("Question: " + log[moveNumber - 1].question);
        console.log("Answer: " + log[moveNumber - 1].answer);
        break;
    }
    moveNumber = prompt("There was no such move number. Reenter it", 1);
}

//------------------------------------------
function isAnswer(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    } else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;

}

//есди свойства "а" нет в объекте window
// присваеваем  var a = 1 и показываем его
if (!("a" in window)) {
    var a = 1;
}
alert(a);

// результат ошибка, потому что а не определена
var b = function a(x) {
    x && a(--x);
};
alert(a);

// резкльтат текст функции, потому что
// мы запросили а без внутреннего запрома
function a(x) {
    return x * 2;
}
var a; // ничего не делает
alert(a);

// функция выводит 3ий аргуменет - 10
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

// мы привязываем пустое значение, т.е. ничто не привязываем. Плэтому this -  window object
function a() {
    alert(this);
}
a.call(null);

// 241 -> 249
// самое явное использование замыкание - функция расчета очков, чтобы
// все коректно работала присваем пременной функцию и выполняем ее каждый раз, когда нудно обновить кол-во очков
function updateScore(score = 0) {
    return () => {
        document.getElementsByClassName("scoreList")[0].innerHTML = "Your score is " + (++score);

        var obstacles = document.getElementsByClassName("obstacle-unit");

        if (score % 3 == 0 && obstacles.length >= 3) {
            obstacles[Math.floor(Math.random() * (obstacles.length - 1))].classList.remove("obstacle-unit");
        }
    }
}
var updateScore = updateScore();
updateScore();
updateScore();
updateScore();

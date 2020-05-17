// Глобальные переменные:
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+';
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    // События кнопок Старт и Новая игра
    // добавлена проверка на запущенную игру
    var startButton = document.getElementById('snake-start');
    startButton.addEventListener('click', function () {
        if (!gameIsRunning) {
            startGame();
            return;
        }

        startButton.textContent = "Игра запущена";
        setTimeout(function () {
            startButton.textContent = "Старт";
        }, 1500);
    });
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);

    // отображение очков
    var scoreDisplay = document.getElementsByClassName("buttons")[0].appendChild(document.createElement("div"));
    scoreDisplay.classList.add("scoreList");
    scoreDisplay.innerHTML = "Your score is " + score;
    scoreDisplay.style.marginTop = "15px";
}

// Осталось как было
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.classList.add('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

// добавил спаун препятствий
// фикс: ускорения движения по нажатию старт
function startGame() {
    gameIsRunning = true;
    respawn(); //создали змейку

    clearInterval(snake_timer);
    snake_timer = setInterval(move, SNAKE_SPEED); //каждые 200мс запускаем функцию move

    setTimeout(createFood, 1000);

    clearInterval(createObstacle);
    setInterval(createObstacle, 7500);
}

// добавлена генерация рандомного спауна с проверкой на надичие препятствий + еды
function respawn() {
    while (true) {
        var start_coord_x = Math.floor(Math.random() * FIELD_SIZE_X),
            start_coord_y = Math.floor(Math.random() * FIELD_SIZE_Y),
            snake_unit = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];

        if (isObstacle(snake_unit) || haveFood(snake_unit)) continue;

        snake_unit.classList.add('snake-unit');
        snake.push(snake_unit);

        return;
    }
}

// убрал лишний код
// фикс ошибки с обратным движением
// + бесконечные границы
// + проверка на  препятствие
function move() {
    var new_unit,
        snake_coords = snake[snake.length - 1].classList[1].split('-'), //преобразовали строку в массив
        coord_y = parseInt(snake_coords[1]),
        coord_x = parseInt(snake_coords[2]);

    // если новая ячейка undefined, - значит  уперлись в границу -> переопределяем
    checkMove();
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
        if (new_unit == undefined) new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X - 1))[0];
    } else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
        if (new_unit == undefined) new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + 0)[0];
    } else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
        if (new_unit == undefined) new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y - 1) + '-' + (coord_x))[0];
    } else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
        if (new_unit == undefined) new_unit = document.getElementsByClassName('cell-' + 0 + '-' + (coord_x))[0];
    }

    if (isSnakeUnit(new_unit) || new_unit === undefined || isObstacle(new_unit)) {
        finishTheGame();
        return;
    }

    new_unit.classList.add('snake-unit');
    snake.push(new_unit);

    if (!haveFood(new_unit)) {
        var removed = snake.splice(0, 1)[0];
        removed.classList.remove("snake-unit", "food-unit");
    }
}

// проверка препятчтвия по классу объекта
function isSnakeUnit(unit) {
    return snake.includes(unit) ? true : false;
}

// убрал лишний код
function haveFood(unit) {
    if (!unit.classList.contains('food-unit')) return false;

    createFood()

    score++;
    updateScor();

    return true;
}

// убрал лишний код
function createFood() {
    while (true) {
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X),
            food_y = Math.floor(Math.random() * FIELD_SIZE_Y),
            food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];

        if (!food_cell.classList.contains('snake-unit', 'obstacle-unit')) {
            food_cell.classList.add('food-unit');
            return;
        }
    }
}

// проверка препятчтвия по классу объекта
// можно объеденить с function isSnakeUnit(unit)
function isObstacle(elem) {
    return elem.classList.contains('obstacle-unit') ? true : false;
}

// генерация препятствия в случайном месте
// + проверка на минимальное расстояние их генерации
function createObstacle() {
    while (gameIsRunning) {
        var odstacle_x = Math.floor(Math.random() * FIELD_SIZE_X),
            odstacle_y = Math.floor(Math.random() * FIELD_SIZE_Y),
            odstacle_cell = document.getElementsByClassName('cell-' + odstacle_y + '-' + odstacle_x)[0];

        var snake_coords = snake[snake.length - 1].classList[1].split('-'),
            coord_y = parseInt(snake_coords[1]),
            coord_x = parseInt(snake_coords[2]);

        if (Math.abs(odstacle_x - coord_x) <= 2) continue;
        if (Math.abs(odstacle_y - coord_y) <= 2) continue;

        if (!odstacle_cell.classList.contains('snake-unit', 'food-unit')) {

            odstacle_cell.classList.add('obstacle-unit');
            return;
        }
    }
}

// упростил код
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            direction = 'x-'
            break;
        case 38: // Клавиша вверх
            direction = 'y+'
            break;
        case 39: // Клавиша вправо
            direction = 'x+'
            break;
        case 40: // Клавиша вниз
            direction = 'y-'
            break;
    }
}

// добавил более сильную проверку на изменения вектора движений
var moveOld = 'y+';

function checkMove() {
    switch (direction) {
        case "x-":
            if (moveOld == "x+") direction = moveOld;
            moveOld = direction;
            break;
        case "x+":
            if (moveOld == "x-") direction = moveOld;
            moveOld = direction;
            break;
        case "y-":
            if (moveOld == "y+") direction = moveOld;
            moveOld = direction;
            break;
        case "y+":
            if (moveOld == "y-") direction = moveOld;
            moveOld = direction;
            break;
    }
}

// обновление кол-во очков
// + убираем препятсвие на каждое 3ье полученное очко
function updateScor() {
    document.getElementsByClassName("scoreList")[0].innerHTML = "Your score is " + score;

    var obstacles = document.getElementsByClassName("obstacle-unit");

    if (score % 3 == 0 && obstacles.length >= 3) {
        obstacles[Math.floor(Math.random() * (obstacles.length - 1))].classList.remove("obstacle-unit");
    }
}

// все то же самое
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

function refreshGame() {
    location.reload();
}


window.onload = init;

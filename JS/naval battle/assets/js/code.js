"use strict";

window.onload = gameInit;

function Player() {
    this.fieldAttacked = [],
        this.boards = [{
            name: "linkor",
            healthPoints: 4,
            fields: []
    }, {
            name: "cruiser",
            healthPoints: 3,
            fields: []
    }, {
            name: "cruiser",
            healthPoints: 3,
            fields: []
    }, {
            name: "destroyer",
            healthPoints: 2,
            fields: []
    }, {
            name: "destroyer",
            healthPoints: 2,
            fields: []
    }, {
            name: "destroyer",
            healthPoints: 2,
            fields: []
    }, {
            name: "torpedoBoats",
            healthPoints: 1,
            fields: []
    }, {
            name: "torpedoBoats",
            healthPoints: 1,
            fields: []
    }, {
            name: "torpedoBoats",
            healthPoints: 1,
            fields: []
    }, {
            name: "torpedoBoats",
            healthPoints: 1,
            fields: []
    }]
}
var human = new Player(),
    ai = new Player(),
    playerMove = Math.random() < .5 ? true : false;

function gameInit() {

    createBattleField();

    playerInit(human, "human");

    playerInit(ai, "ai");

    if (!playerMove) aiMove();
}

function createBattleField() {

    var fieldForPlay = [document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table")),
        document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table"))];

    fieldForPlay.forEach(function (field, index) {
        field.classList.add("field");

        var rowLegend = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", ""];

        for (var rowInd = 0; rowInd < 11; rowInd++) {
            var fieldRow = field.insertRow();
            for (var colInd = 0; colInd < 11; colInd++) {
                var fieldCell = fieldRow.insertCell(colInd);

                if (rowInd == 0) {
                    fieldCell.innerHTML = rowLegend[colInd];
                    continue;
                }

                if (colInd == 0) {
                    fieldCell.innerHTML = rowInd;
                    continue;
                }

                if (index == 0) fieldCell.classList.add("human");
                if (index == 1) {
                    fieldCell.classList.add("ai");
                    fieldCell.addEventListener("click", move);
                }

                // можно не присваить класс с номером строки/столбца и работать с ecent.path...
                // но при если будет создана вложенность, код усложниьтся
                fieldCell.classList.add("cell", "rc-" + (rowInd - 1) + "-" + (colInd - 1));
            }
        }
    });
}

var unposiblePositions = [];
var positionToFill = [];

function playerInit(player, playerName) {
    unposiblePositions = [];

    var cells = document.getElementsByClassName(playerName + " cell");

    player.boards.forEach(function (board) {
        var boardInstalled = false;
        while (!boardInstalled) {
            positionToFill = [];
            var randomPos = generateRandomPosition(),
                randomDir = generateRandomDirection();

            if (!isPosiblePosToInsert(randomDir, board.healthPoints, randomPos) || positionToFill.length != board.healthPoints) continue;

            board.fields = positionToFill;
            boardInstalled = !boardInstalled;
            positionToFill.forEach(function (pos) {
                if (playerName == "human") cells[pos].innerHTML = "X";
                unposiblePositions.push(pos);

                    [pos < 10 ? pos : pos % 10 == 0 ? pos : pos - 11, // top left
                     pos < 10 ? pos : pos - 10, // top middle
                     pos < 10 ? pos : pos % 10 == 9 ? pos : pos - 9, // top right
                     pos % 10 == 9 ? pos : pos + 1, // middle right
                     pos >= 90 ? pos : pos % 10 == 9 ? pos : pos + 11, // bottom right
                     pos >= 90 ? pos : pos + 10, // bottom middle
                     pos >= 90 ? pos : pos % 10 == 0 ? pos : pos + 9, // bottomleft
                     pos % 10 == 0 ? pos : pos - 1].forEach(function (toInclide) {
                    if (!unposiblePositions.includes(toInclide)) {
                        unposiblePositions.push(toInclide);
                    }
                });
            });
        }
    });

    unposiblePositions = null;
    positionToFill = null;
}

function generateRandomPosition() {
    return Math.random() * 100 | 0;
}

function generateRandomDirection() {
    return Math.random() * 4 | 0;
}

function isPosiblePosToInsert(direction, lenght, index) {
    positionToFill.push(index);

    if (unposiblePositions.includes(index)) return false;

    if (lenght == 1) return true;

    switch (direction) {
        case 0:
            if (index - 10 < 0) return "false";
            return true && isPosiblePosToInsert(direction, --lenght, index - 10);
        case 1:
            if (index % 10 + 1 > 9) return "false";
            return true && isPosiblePosToInsert(direction, --lenght, ++index);
        case 2:
            if (index + 10 >= 100) return "false";
            return true && isPosiblePosToInsert(direction, --lenght, index + 10);
        case 3:
            if (index % 10 - 1 < 0) return "false";
            return true && isPosiblePosToInsert(direction, --lenght, --index);
    }
}

function move(event) {
    //!!! добавить запись, не твой ход
    if (!playerMove) return;

    //!!! добавить запись, что клетка обстреляна
    if (event.target.classList.contains("attacked")) return;

    var rowInd = Number(this.classList[2].split("-")[1]),
        cellInd = Number(this.classList[2].split("-")[2]);

    //!!! добавить запись, что игрок попал мимо
    if (!attackPos(rowInd, cellInd)) console.log("мимо");

    playerMove = false;
    if (!playerMove) aiMove();

    console.log(human.fieldAttacked);
    console.log(ai.fieldAttacked);

}

function aiMove() {
    while (true) {
        var randomPos = generateRandomPosition(),
            rowInd = randomPos / 10 | 0,
            cellInd = randomPos % 10;

        if (human.fieldAttacked.includes(randomPos) || document.getElementsByClassName("human rc-" + rowInd + "-" + cellInd)[0].classList.contains("attacked")) continue;

        attackPos(rowInd, cellInd);

        break;
    }

    playerMove = true;

}

function attackPos(rowInd, cellInd) {
    var boardsForCheck = playerMove ? ai.boards : human.boards,
        position = rowInd * 10 + cellInd,
        boardInd = 0,
        boardFinded = false;

    for (boardInd; boardInd < boardsForCheck.length; boardInd++) {
        if (boardsForCheck[boardInd].fields.includes(position)) {
            boardFinded = true;
            break;
        }
    }

    var cell = undefined;
    if (playerMove) cell = document.getElementsByClassName("ai" + " rc-" + rowInd + "-" + cellInd)[0];
    if (!playerMove) cell = document.getElementsByClassName("human" + " rc-" + rowInd + "-" + cellInd)[0];
    cell.classList.add("attacked");

    if (playerMove) {
        ai.fieldAttacked.push(position);

        if (!boardFinded) return false;
        cell.innerHTML = "X";
        ai.boards[boardInd].healthPoints--;
        if (ai.boards[boardInd].healthPoints == 0) destroyBoard("ai", boardInd);
    }

    if (!playerMove) {
        human.fieldAttacked.push(position);

        if (!boardFinded) return false;
        human.boards[boardInd].healthPoints--;
        if (human.boards[boardInd].healthPoints == 0) destroyBoard("human", boardInd);
    }

    return true;
}

function destroyBoard(player, boardInd) {
    var boardPos = playerMove ? ai.boards[boardInd].fields : human.boards[boardInd].fields;

    var positionToMark = [];
    boardPos.forEach(function (pos) {
        [pos < 10 ? pos : pos % 10 == 0 ? pos : pos - 11, // top left
         pos < 10 ? pos : pos - 10, // top middle
         pos < 10 ? pos : pos % 10 == 9 ? pos : pos - 9, // top right
         pos % 10 == 9 ? pos : pos + 1, // middle right
         pos >= 90 ? pos : pos % 10 == 9 ? pos : pos + 11, // bottom right
         pos >= 90 ? pos : pos + 10, // bottom middle
         pos >= 90 ? pos : pos % 10 == 0 ? pos : pos + 9, // bottomleft
         pos % 10 == 0 ? pos : pos - 1].forEach(function (element) {
            if (!positionToMark.includes(element)) positionToMark.push(element);
        });
    });

    positionToMark.forEach(function (pos) {
        var cell = document.getElementsByClassName(player + " rc-" + (pos / 10 | 0) + "-" + pos % 10)[0];

        if (!cell.classList.contains("attacked")) cell.classList.add("attacked");
    });
}

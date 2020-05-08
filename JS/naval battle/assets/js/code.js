"use strict";

window.onload = gameInit;

var player = {
    fieldAttacked: [],
    boards: [{
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
};

var ai = player;

function gameInit() {

    createBattleField();

    playerInit("player");

    playerInit("ai");
}

function createBattleField() {

    var fieldForPlay = [document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table")),
        document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table"))];

    fieldForPlay.forEach(function (field, index) {
        field.classList.add("field");

        var rowLegend = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", ""];

        for (var rowInd = 0; rowInd < 11; rowInd++) {
            var fieldRow = field.insertRow(rowInd);
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

                if (index == 0) fieldCell.classList.add("player");
                if (index == 1) fieldCell.classList.add("ai");

                fieldCell.classList.add("cell");
                fieldCell.setAttribute("row", rowInd);
                fieldCell.setAttribute("col", colInd);
            }
        }
    });
}

var unposiblePositions = [];
var positionToFill = [];

function playerInit(playerName) {
    unposiblePositions = [];

    var cells = document.getElementsByClassName(playerName + " cell");

    player.boards.forEach(function (board) {
        var boardInstalled = false;
        while (!boardInstalled) {
            positionToFill = [];
            var randomPos = generateRandomPosition(),
                randomDir = generateRandomDirection();

            if (!isPosiblePosition(randomDir, board.healthPoints, randomPos) || positionToFill.length != board.healthPoints) {
                continue;
            }

            board.fields = positionToFill;
            boardInstalled = !boardInstalled;
            positionToFill.forEach(function (pos) {
                cells[pos].innerHTML = "X";
                unposiblePositions.push(pos);

                    [pos < 10 ? pos : pos - 10,
                    pos == 0 ? pos + 1 : pos % 10 == 9 ? pos : pos + 1,
                    pos >= 90 ? pos : pos + 10,
                    pos == 0 ? pos : pos % 10 == 0 ? pos : pos - 1].forEach(function (toInclide) {
                    if (!unposiblePositions.includes(toInclide)) {
                        unposiblePositions.push(toInclide);
                    }
                });
            });
        }
    });
}

function generateRandomPosition() {
    return Math.random() * 100 | 0;
}

function generateRandomDirection() {
    return Math.random() * 4 | 0;
}

function isPosiblePosition(direction, lenght, index) {
    positionToFill.push(index);

    if (unposiblePositions.includes(index)) return false;

    if (lenght == 1) return true;

    switch (direction) {
        case 0:
            if (index - 10 < 0) return "false";
            return true && isPosiblePosition(direction, --lenght, index - 10);
        case 1:
            if (index % 10 + 1 > 9) return "false";
            return true && isPosiblePosition(direction, --lenght, ++index);
        case 2:
            if (index + 10 >= 100) return "false";
            return true && isPosiblePosition(direction, --lenght, index + 10);
        case 3:
            if (index % 10 - 1 < 0) return "false";
            return true && isPosiblePosition(direction, --lenght, --index);
    }
}

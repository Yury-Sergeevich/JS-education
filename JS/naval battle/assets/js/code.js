"use strict";

window.onload = gameInit;

function Player() {
    this.name = "human",
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
ai.name = "ai";


function gameInit() {

    createBattleField();

    playerInit(human, "human");

    playerInit(ai, "ai");

    if (!playerMove) aiEngine.makeMove();
}

function createBattleField() {

    var fieldForPlay = [document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table")),
        document.getElementsByClassName("game-wrapper")[0].appendChild(document.createElement("table"))
    ];

    fieldForPlay.forEach(function (field, index) {
        field.classList.add("field");

        // var rowLegend = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", ""];
        var rowLegend = ["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ""];


        for (var rowInd = 0; rowInd < 11; rowInd++) {
            var fieldRow = field.insertRow();
            for (var colInd = 0; colInd < 11; colInd++) {
                var fieldCell = fieldRow.insertCell(colInd);

                if (rowInd == 0) {
                    fieldCell.innerHTML = rowLegend[colInd];
                    continue;
                }

                if (colInd == 0) {
                    fieldCell.innerHTML = rowLegend[rowInd];
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

    for (var i = 0; i < 100; i++) {
        human.fieldAttacked.push(i);
        ai.fieldAttacked.push(i);
    }
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
                    pos % 10 == 0 ? pos : pos - 1
                ].forEach(function (toInclide) {
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

function generateRandomPosition(max = 100) {
    return Math.random() * max | 0;
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

var aiEngine = new aiEngine();

function move(event) {
    //!!! добавить запись, не твой ход
    if (!playerMove) return;

    //!!! добавить запись, что клетка обстреляна
    if (this.classList.contains("attacked")) return;

    playerMove = false;

    var rowInd = Number(this.classList[2].split("-")[1]),
        cellInd = Number(this.classList[2].split("-")[2]);

    //!!! добавить запись, что игрок попал
    if (attackPos.call(ai, rowInd, cellInd)) playerMove = true;

    if (!playerMove) aiEngine.makeMove();
}

function aiEngine() {

    this.boardToAttack = {
        finded: false,
        startedPos: undefined,
        // 1, 3 - left / right
        // 0, 2 - up / down
        directionPos: [],
        direction: undefined,
        nextPosition: undefined,
        generateNextPos: function (sucsessAtack) {
            while (true) {
                function newPos(direction) {
                    switch (direction) {
                        case 0:
                            if (this.nextPosition - 10 < 0) return false;
                            if (!human.fieldAttacked.includes(this.nextPosition - 10)) return false;

                            this.nextPosition -= 10;
                            break;

                        case 1:
                            if (this.nextPosition % 10 + 1 > 9) return false;
                            if (!human.fieldAttacked.includes(++this.nextPosition)) return false;
                            break;

                        case 2:
                            if (this.nextPosition + 10 >= 100) return false;
                            if (!human.fieldAttacked.includes(this.nextPosition + 10)) return false;
                            this.nextPosition += 10;
                            break;

                        case 3:
                            if (this.nextPosition % 10 - 1 < 0) return false;
                            if (!human.fieldAttacked.includes(--this.nextPosition)) return false;
                            break;
                        default:
                            this.finded = false;
                            this.startedPos = undefined;
                            this.directionPos = [];
                            this.direction = undefined;
                            this.nextPosition = undefined;
                    }
                    return true;
                }
                // gen possible directions and positions
                if (sucsessAtack == undefined) {
                    this.startedPos = arguments[1];
                    this.directionPos = [0, 1, 2, 3];
                    this.nextPosition = this.startedPos;
                    this.generateNextPos(true);
                    return;
                }

                if (!sucsessAtack) {
                    this.directionPos.splice(this.directionPos.indexOf(this.direction), 1);
                    this.nextPosition = this.startedPos;
                    this.direction = this.directionPos[Math.random() * this.direction.lenght | 0];
                }

                if (sucsessAtack) {
                    switch (this.direction) {
                        case 0:
                        case 2:
                            if (this.directionPos.includes(1)) this.directionPos.splice(this.directionPos.indexOf(1), 1);
                            if (this.directionPos.includes(3)) this.directionPos.splice(this.directionPos.indexOf(3), 1);
                            break;
                        case 1:
                        case 3:
                            if (this.directionPos.includes(0)) this.directionPos.splice(this.directionPos.indexOf(0), 1);
                            if (this.directionPos.includes(2)) this.directionPos.splice(this.directionPos.indexOf(2), 1);
                            break;
                        default:
                            this.direction = Math.random() * 4 | 0;
                            break;
                    }
                }
                if (newPos.call(this, this.direction)) {
                    return;
                }
                sucsessAtack = false;
            }
        }
    };

    this.makeMove = function () {
        if (this.boardToAttack.finded) {
            var posInd = human.fieldAttacked.indexOf(this.boardToAttack.nextPosition);
            this.atack(posInd);
            return;
        }
        this.atack();
    }

    this.atack = function (randomInd = generateRandomPosition(human.fieldAttacked.length - 1)) {
        var error = 0;
        while (error < 4) {
            var rowInd = human.fieldAttacked[randomInd] / 10 | 0,
                cellInd = human.fieldAttacked[randomInd] % 10;

            if (attackPos.call(human, rowInd, cellInd)) {
                playerMove = false;

                if (!this.boardToAttack.finded) {
                    this.boardToAttack.finded = true;
                    this.boardToAttack.generateNextPos(undefined, rowInd * 10 + cellInd);
                } else this.boardToAttack.generateNextPos(true);

                this.makeMove();
                return true;
            } else {
                if (this.boardToAttack.finded) this.boardToAttack.generateNextPos(false);
                playerMove = true;
            }
            break;
        }
    }
}

function attackPos(rowInd, cellInd) {
    var position = rowInd * 10 + cellInd,
        boardInd = 0,
        boardFinded = false;

    for (boardInd; boardInd < this.boards.length; boardInd++) {
        if (this.boards[boardInd].fields.includes(position)) {
            boardFinded = true;
            break;
        }
    }

    this.fieldAttacked.splice(this.fieldAttacked.indexOf(position), 1);

    var cell = document.getElementsByClassName(this.name + " rc-" + rowInd + "-" + cellInd)[0];
    cell.classList.add("attacked");

    if (!boardFinded) return false;
    cell.innerHTML = "X";

    this.boards[boardInd].healthPoints--;
    if (this.boards[boardInd].healthPoints == 0) destroyBoard.call(this, boardInd);
    return true;
}

function destroyBoard(boardInd) {
    this.boards[boardInd].fields.forEach((boardPos) => {
        [boardPos < 10 ? boardPos : boardPos % 10 == 0 ? boardPos : boardPos - 11, // top left
            boardPos < 10 ? boardPos : boardPos - 10, // top middle
            boardPos < 10 ? boardPos : boardPos % 10 == 9 ? boardPos : boardPos - 9, // top right
            boardPos % 10 == 9 ? boardPos : boardPos + 1, // middle right
            boardPos >= 90 ? boardPos : boardPos % 10 == 9 ? boardPos : boardPos + 11, // bottom right
            boardPos >= 90 ? boardPos : boardPos + 10, // bottom middle
            boardPos >= 90 ? boardPos : boardPos % 10 == 0 ? boardPos : boardPos + 9, // bottomleft
            boardPos % 10 == 0 ? boardPos : boardPos - 1
        ].forEach((position) => {
            if (this.fieldAttacked.includes(position)) {
                document.getElementsByClassName(this.name + " rc-" + (position / 10 | 0) + "-" + position % 10)[0].classList.add("attacked");
                this.fieldAttacked.splice(this.fieldAttacked.indexOf(position), 1);
            }
        });
    });
}
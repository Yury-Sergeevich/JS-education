window.onload = chessBoardInit;

var counter = 0;

function chessBoardInit() {

    var chessTable = document.createElement("table");
    chessTable.className = "chessTable";
    document.body.appendChild(chessTable);

    var chessCaption = document.createElement("caption");
    chessCaption.innerHTML = "Chess Board";
    chessTable.appendChild(chessCaption);

    for (var rows = -1; rows < 9; rows++) {
        var row = chessTable.insertRow(0);

        for (var colums = -1; colums < 9; colums++) {
            var colum = row.insertCell(0);

            // исключаем лишние ячейки по углам
            if ((rows == -1 || rows == 8) && (colums == -1 || colums == 8)) continue;

            // присваиваем классы для ячеек/легенд
            if (rows == -1) {
                colum.className = "sideBar sideBar--bottom";
                continue;
            }

            if (rows == 8) {
                colum.className = "sideBar sideBar--top";
                continue;
            }

            if (colums == -1) {
                colum.className = "sideBar sideBar--right";

                continue;
            }

            if (colums == 8) {
                colum.className = "sideBar sideBar--left";
                continue;
            }

            // шахматные клетки с класом, который будем использовать для их идентификации
            if ((rows % 2 == 0) && (colums % 2 == 0)) {
                colum.className = "cell cell--white";
                continue;
            }
            if ((rows % 2 == 0) && (colums & 2 != 0)) {
                colum.className = "cell cell--black";
                continue;
            }
            if ((rows % 2 != 0) && (colums % 2 == 0)) {
                colum.className = "cell cell--black";
                continue;
            }
            colum.className = "cell cell--white";
        }
    }
    // заполняем доску легендой
    chessBoardFillLegend(8 * counter);

    // заполняем доску фигурами
    chessBoardFillFigures(64 * counter);

    counter++;
}

function chessBoardFillLegend(num) {
    var sideBarTop = document.getElementsByClassName("sideBar--top");
    sideBarTop[0 + num].innerHTML = "A";
    sideBarTop[1 + num].innerHTML = "B";
    sideBarTop[2 + num].innerHTML = "C";
    sideBarTop[3 + num].innerHTML = "D";
    sideBarTop[4 + num].innerHTML = "E";
    sideBarTop[5 + num].innerHTML = "F";
    sideBarTop[6 + num].innerHTML = "G";
    sideBarTop[7 + num].innerHTML = "H";

    var sideBarRight = document.getElementsByClassName("sideBar--right");
    sideBarRight[0 + num].innerHTML = "1";
    sideBarRight[1 + num].innerHTML = "2";
    sideBarRight[2 + num].innerHTML = "3";
    sideBarRight[3 + num].innerHTML = "4";
    sideBarRight[4 + num].innerHTML = "5";
    sideBarRight[5 + num].innerHTML = "6";
    sideBarRight[6 + num].innerHTML = "7";
    sideBarRight[7 + num].innerHTML = "8";

    var sideBarBottom = document.getElementsByClassName("sideBar--bottom");
    sideBarBottom[0 + num].innerHTML = "A";
    sideBarBottom[1 + num].innerHTML = "B";
    sideBarBottom[2 + num].innerHTML = "C";
    sideBarBottom[3 + num].innerHTML = "D";
    sideBarBottom[4 + num].innerHTML = "E";
    sideBarBottom[5 + num].innerHTML = "F";
    sideBarBottom[6 + num].innerHTML = "G";
    sideBarBottom[7 + num].innerHTML = "H";

    var sideBarLeft = document.getElementsByClassName("sideBar--left");
    sideBarLeft[0 + num].innerHTML = "1";
    sideBarLeft[1 + num].innerHTML = "2";
    sideBarLeft[2 + num].innerHTML = "3";
    sideBarLeft[3 + num].innerHTML = "4";
    sideBarLeft[4 + num].innerHTML = "5";
    sideBarLeft[5 + num].innerHTML = "6";
    sideBarLeft[6 + num].innerHTML = "7";
    sideBarLeft[7 + num].innerHTML = "8";
}

function chessBoardFillFigures(num) {
    var cell = document.getElementsByClassName("cell");

    //  BLACK FIGURES
    cell[0 + num].innerHTML = "&#9820;";
    cell[7 + num].innerHTML = "&#9820;";

    cell[1 + num].innerHTML = "&#9822;";
    cell[6 + num].innerHTML = "&#9822;";

    cell[2 + num].innerHTML = "&#9821;";
    cell[5 + num].innerHTML = "&#9821;";

    cell[3 + num].innerHTML = "&#9819;";
    cell[4 + num].innerHTML = "&#9818;";

    for (var ind = (8 + num); ind < (16 + num); ind++) {
        cell[ind].innerHTML = "&#9823;";
    }

    //  WHITE FIGURES
    cell[56 + num].innerHTML = "&#9814;";
    cell[63 + num].innerHTML = "&#9814;";

    cell[57 + num].innerHTML = "&#9816;";
    cell[62 + num].innerHTML = "&#9816;";

    cell[58 + num].innerHTML = "&#9815;";
    cell[61 + num].innerHTML = "&#9815;";

    cell[59 + num].innerHTML = "&#9813;";
    cell[60 + num].innerHTML = "&#9812;";

    // по какой -то причине вылетате ошибка undefined, возможно не успевает прогрузиться
    //    for (var ind = 48 + num; ind < 56 + num; ind++) {
    //        console.log(ind);
    //        cell[ind + num].innerHTML = "&#9817;";
    //    }

    cell[48 + num].innerHTML = "&#9817;";
    cell[49 + num].innerHTML = "&#9817;";
    cell[50 + num].innerHTML = "&#9817;";
    cell[51 + num].innerHTML = "&#9817;";
    cell[52 + num].innerHTML = "&#9817;";
    cell[53 + num].innerHTML = "&#9817;";
    cell[54 + num].innerHTML = "&#9817;";
    cell[55 + num].innerHTML = "&#9817;";

}

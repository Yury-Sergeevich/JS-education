"use strict";

window.onload = function () {
    sliderInit();
    cartInit();
    offerInit();
};

var gallery = [{
    smallImgWay: "assets/img/small/small-1.jpg",
    bigImgWay: "assets/img/big/big-1.jpg",
    alt: "some ALT"
}, {
    smallImgWay: "assets/img/small/small-2.jpg",
    bigImgWay: "assets/img/big/big-2.jpg",
    alt: "some ALT"
}, {
    smallImgWay: "assets/img/small/small-3.jpg",
    bigImgWay: "assets/img/big/big-3.jpg",
    alt: "some ALT"
}, {
    smallImgWay: "assets/img/small/small-4.jpg",
    bigImgWay: "some way",
    alt: "some ALT"
}, ];

function sliderInit() {
    // подготавливаем работу слайдера
    // вставляем элементы слайдера с функционалом
    // -//- боковые кнопки для листания
    var slider = document.getElementsByClassName("slider"),
        sliderButtons = document.getElementsByClassName("angle");
    gallery.forEach(function (elem) {
        var picture = slider[0].appendChild(document.createElement("img"));
        picture.className = "picture--small";
        picture.src = elem.smallImgWay;
        picture.alt = elem.alt;
        picture.addEventListener("click", changeBigPictureProperties);
    });

    sliderButtons[0].addEventListener("click", function () {
        changeBigPictureProperties("prev");
    });
    sliderButtons[1].addEventListener("click", function () {
        changeBigPictureProperties("next");
    });
}

// код слайдера не оптимален, во время выполнения второго задания оформлен лучше
function changeBigPictureProperties(action) {
    // ищем активный слайд
    var smallPictureHovered = document.getElementsByClassName("picture--small hovered"),
        index = 0;

    // в зависимости от обработчика стрелки галереи/клик на изображении
    // берем текщий индекс -> +-1
    // обрабатываем изображение по клику
    switch (action) {
        case "next":
            // если есть активный слайд -> берем его индекс
            if (smallPictureHovered.length != 0) {
                index = getPictureIndBySrc(smallPictureHovered[0].src);
                smallPictureHovered[0].classList.remove("hovered");
            }

            // проверка  на конечные значение
            if (++index == document.getElementsByClassName("picture--small").length) index = 0;

            changeBigPictureAction(index);
            break;
        case "prev":
            // если есть активный слайд -> берем его индекс
            if (smallPictureHovered.length != 0) {
                index = getPictureIndBySrc(smallPictureHovered[0].src);
                smallPictureHovered[0].classList.remove("hovered");
            }

            // проверка  на конечные значение
            if (--index < 0) index = document.getElementsByClassName("picture--small").length - 1;

            changeBigPictureAction(index);
            break;
        default:
            // проверяем не на то же самое изображение кликнули
            // да - ничего не делаем
            // нет - удаляем у страго класс hovered (если есть блок с таким классом)
            index = getPictureIndBySrc(this.src);

            if (smallPictureHovered.length != 0) {
                if (getPictureIndBySrc(smallPictureHovered[0].src) == index) return;

                smallPictureHovered[0].classList.remove("hovered");
            }

            changeBigPictureAction(index);
            break;
    }
}

function getPictureIndBySrc(src) {
    // с помощью src определяем индекс изображения
    // -1, потому что названия изображений начинаются с 1
    return src.slice(-5, -4) - 1;
}

function changeBigPictureAction(index) {
    // добавляем  на выбранном блоке класс hovered
    document.getElementsByClassName("picture--small")[index].classList.add("hovered");

    // -//- атрибуты
    var bigPictureNew = document.createElement("img");
    bigPictureNew.className = "picture--big";
    bigPictureNew.src = gallery[index].bigImgWay;
    bigPictureNew.alt = gallery[index].alt;
    bigPictureNew.onerror = onError;

    // -//- в родительский элемент дочерний элемент img.picture--big
    var bigPictureWrapper = document.getElementsByClassName("main-photo");
    bigPictureWrapper[0].innerHTML = "";
    bigPictureWrapper[0].appendChild(bigPictureNew);
}


function onError() {
    alert("Your error is: wrong src");
}

"use strict";

var offers = [{
    id: "000",
    photos: ["1.jpg", "2.jpg"],
    name: "Beautifull kitchen in north style",
    price: "100",
    currency: "dollar",
    shortDescriptin: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ea, voluptatibus dolorem, obcaecati ad tempore voluptates"
}, {
    id: "001",
    photos: ["3.jpg", "2.jpg"],
    name: "Beautifull kitchen in west style",
    price: "100",
    currency: "dollar",
    shortDescriptin: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ea, voluptatibus dolorem, obcaecati ad tempore voluptates"
}, {
    id: "002",
    photos: ["2.jpg", "4.jpg"],
    name: "Beautifull kitchen in east style",
    price: "100",
    currency: "dollar",
    shortDescriptin: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ea, voluptatibus dolorem, obcaecati ad tempore voluptates"
}]

var cart = [];
// инициализация корзины: проверка на сохраненые товары с последующей обработкой
function cartInit() {
    var positionsWrapper = document.getElementsByClassName("cart-wrapper")[0].appendChild(document.createElement("div")),
        totalPrice = document.getElementsByClassName("cart-wrapper")[0].appendChild(document.createElement("div"));

    positionsWrapper.classList.add("positions-wrapper");
    totalPrice.classList.add("total-price");

    if (cart.length == 0) {
        positionsWrapper.innerHTML = "<h4>Cart is empty</h4>";
        return;
    }

    refreshCart();
}

// обработка страницы отваров
function offerInit() {
    // для каждого товара создаем блок  отображения с помощью "кончтруктора",
    //присваивая значения и классы его элементам
    offers.forEach(function (offer, index) {
        var offerWrapper = document.getElementsByClassName("offers")[0].appendChild(document.createElement("div")),
            photoGalleryWrapper = offerWrapper.appendChild(document.createElement("div")),
            photoGalleryMainPhoto = photoGalleryWrapper.appendChild(document.createElement("img")),
            photoGallery = photoGalleryWrapper.appendChild(document.createElement("div")),
            offerName = offerWrapper.appendChild(document.createElement("h3")),
            shrtDescription = offerWrapper.appendChild(document.createElement("div")),
            offerEnd = offerWrapper.appendChild(document.createElement("div")),
            price = offerEnd.appendChild(document.createElement("h4")),
            buyButton = offerEnd.appendChild(document.createElement("a"));

        offerWrapper.classList.add("offer-wrapper");

        photoGalleryWrapper.classList.add("photo-gallery-wrapper");
        photoGalleryMainPhoto.className = "main-photo";
        photoGalleryMainPhoto.src = "assets/img/big/big-" + offer.photos[0];
        photoGallery.classList.add("photo-gallery");
        offer.photos.forEach(function (elem) {
            var picture = photoGallery.appendChild(document.createElement("img"));
            picture.className = "photo-gallery-item";
            picture.src = "assets/img/small/small-" + elem;
            picture.addEventListener("click", changeMainPhotoOfGood);
        });

        offerName.innerHTML = offer.name;

        shrtDescription.classList.add("shrt-description");
        var textToInsert = offer.shortDescriptin;
        if (textToInsert.length >= 50) textToInsert = textToInsert.slice(0, 50) + "...";
        shrtDescription.innerHTML = textToInsert;

        offerEnd.classList.add("offer-end");

        price.classList.add("price");
        switch (offer.currency) {
            case "dollar":
                price.innerHTML = offer.price + "&#36;";
                break;
            default:
                price.innerHTML = offer.price + "&#36;";
                break;
        }

        // здесь передаем индекс товара в БД, чтобы после сохранить его в корзине
        // и не тратить системное время на это
        buyButton.classList.add("buy-botton");
        buyButton.addEventListener("click", function () {
            addToCart(index);
        });
        buyButton.innerHTML = "Заказать";
    })
}

// меняем главное фото  товара
function changeMainPhotoOfGood(event) {
    // т.к. названия  товара почти статично, используем его как индекс для проверки актульного фото, обращаясь к нему через родительские элементы target
    // +1, потому что функция достает индекс, а не название фото
    var indOld = getPictureIndBySrc(event.target.parentElement.parentElement.firstChild.src) + 1,
        indNew = getPictureIndBySrc(this.src) + 1;

    if (indNew == indOld) return;
    // после простой проверки обновляем фото
    event.target.parentElement.parentElement.firstChild.src = "assets/img/big/big-" + indNew + ".jpg";
}

// добавляем товар в корзину по индексу, проверяя есть ли уже такие строки в массиве объектов
// возможна доработка на обновление определенных строк корзины, чтобы не нагружать браузер
function addToCart(index) {
    var finded = false;
    cart.forEach(function (cartElem) {
        if (cartElem.id == offers[index].id) {
            cartElem.quantity++;
            finded = true;
        }
    })

    if (!finded) cart.push({
        id: offers[index].id,
        quantity: 1,
        index: index
    });

    refreshCart();
}

// обновление всей корзины целиком. Как писалось  выше,
// возможна доработка на обновление определенных строк для экономии системного времени
function refreshCart() {
    var positionsWrapper = document.getElementsByClassName("positions-wrapper")[0],
        totalPriceContainer = document.getElementsByClassName("total-price")[0],
        totalPrice = 0;
    positionsWrapper.innerHTML = "";

    // создаем под каждый товар строку с информацией о кол-ве/цене/названии товара
    // можно доработать на изменене кол-ва товаров и удаление  их из корзины
    cart.forEach(function (cartElem) {
        var positionItemInCart = positionsWrapper.appendChild(document.createElement("div")),
            positionName = positionItemInCart.appendChild(document.createElement("div")),
            positionPrice = positionItemInCart.appendChild(document.createElement("div")),
            positionQuantity = positionItemInCart.appendChild(document.createElement("div")),
            positionSubTotal = positionItemInCart.appendChild(document.createElement("div")),
            currency;

        switch (offers[cartElem.index].currency) {
            case "dollar":
                currency = "&#36;";
                break;
            default:
                currency = "&#36;";
                break;
        }

        positionItemInCart.classList.add("position-item");

        positionName.classList.add("position-name");
        positionName.innerHTML = offers[cartElem.index].name;

        positionPrice.classList.add("position-price");
        positionPrice.innerHTML = "Cost: " +
            offers[cartElem.index].price + currency;

        positionQuantity.classList.add("position-quantity");
        positionQuantity.innerHTML = "Quantity: " + cartElem.quantity;

        positionSubTotal.classList.add("position-sub-total");
        positionSubTotal.innerHTML = "Sub-Total: " + offers[cartElem.index].price * cartElem.quantity + currency;
        totalPrice += offers[cartElem.index].price * cartElem.quantity;
    })

    totalPriceContainer.innerHTML = "Total " + totalPrice + "&#36;";
}

class CartList {
    constructor() {
        this.goods = [];
        this.getGoods();
        this.goodsIdMap = [];
        this.render();
    }

    addToCart(goodId, modificationList) {

    }

    renderCart() {

    }

    removeFromCart(goodId) {

    }
}


class GoodList { // класс товаров на странице каталога
    constructor() {
        this.goods = []; // this.goods - объекты, что сейчас на странице
        this.getGoods(); // получаем информацию по  товарам с сервера
        this.goodsIdMap = []; // информация для сопоставления ID товаров
        // и их IND в массиве this.goods
        this.render(); // первичная отрисовка товаров
        // в дальнейшем render() будем использовать для отрисовки
        // новых товаров на той же странице
    }

    getGoods() {
        this.goods = [{
                id: '0000001',
                title: 'Notebook',
                price: 2000,
                photos: ['', ''],
                shrtDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
                modifications: [{
                    name: "Color",
                    list: "Red|15;Green|30"
                }, {
                    name: "Size",
                    list: "1|15;2|30"
                }]
            },
            {
                id: '0000002',
                title: 'Mouse',
                price: 20,
                shrtDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
                modifications: [{
                    name: "Color",
                    list: "Red|15;Green|30"
                }]
            },
            {
                id: '0000003',
                photos: ['', '', ''],
                title: 'Keyboard',
                price: 200
            },
            {
                id: '0000004',
                title: 'Gamepad',
                price: 50
            }
        ];
    }

    render() {
        document.querySelector('.products').insertAdjacentHTML('beforeend', this.goods.map(product => {
            this.goodsIdMap.push(product.id);
            product = new Product(product);
            return product.renderProduct();
        }).join(''));
    }
}

class Product { // класс товара
    constructor(product) { // присваем все значения из родительского объекта
        this.id = product.id;
        this.title = product.title;
        this.modifications = product.modifications;
        this.balance = product.balance;
        this.photos = product.photos;
        this.shrtDescription = product.shrtDescription;
        this.price = product.price;
    }

    renderProduct() { // получаем HTML код товара
        let productPhotoBigSrc = "assets/img/no_img.jpg",
            productPhotos = '';

        // отрисовка фотографий товара
        if (Array.isArray(this.photos)) {
            if (this.photos[0] != '') productPhotoBigSrc = `assets/img/big-${this.photos[0]}.jpg`

            // нужно будет добавить функционал смены главного фото по клику на маленькие 
            // через event.path...
            if (this.photos.length > 1) productPhotos = this.photos.map(photoSrc => {
                if (photoSrc != '') return `<img class="product--photos" src="assets/img/small-${photoSrc}" alt="">`;
                if (photoSrc == '') return `<img class="product--photos" src="assets/img/no_img.jpg" alt="">`;
            }).join('');
        }
        if (!Array.isArray(this.photos) && this.photos != '' && this.photos != undefined) productPhotoBigSrc = `assets/img/big-${this.photos}.jpg`;

        // отрисовка описания
        const shrtDescription = this.shrtDescription ?
            `<h4 class="product--shrt_descr">${this.shrtDescription.slice(0, 35)}...</h4>` : "";

        return `<article class="product"  offer="${this.id}">
                    <div class="main_part">
                        <img class="product--photo" src="${productPhotoBigSrc}" alt="">
                        <div class="extra_info">
                            <h4 class="product--price" offer="${this.id}">${this.price} руб.</h4>
                            <div class="photo_gallery">
                                ${productPhotos}
                            </div>
                        </div>
                    </div>
                    <div class="bottom_part">
                        <h3 class="product--title">${this.title}</h3>
                        ${shrtDescription}
                        ${this.getModifications()}
                        <div class="interactions_bar">
                            <a class="button button--round button--buy" offer="${this.id}" onclick="buyButtonClick()">Добавить в корзину</a>
                            <div class="button button--round button--like"></div>
                            <div class="button button--round button--compare"></div>
                        </div>
                    </div>
                </article>`
    }

    getModifications() { // получаем HTML код модификации товара с проверками и т.п.
        if (this.modifications === undefined) return "";
        return `<form class="modifications" offer="${this.id}" onchange="goodModificationOnChange()">` +
            this.modifications.map(modification => {
                const modificationList = modification.list.split(";").map(list => {
                    const [modName, modCost] = list.split("|");
                    return `<option value="${modName}">${modName} / ${modCost} руб.</option>`;
                }).join(",");

                return `<div class="product--modification"><legend>Выберете ${modification.name}</legend>
                        <select size = "1" name = "${modification.name}" >
                        <option selected>-</option>
                        ${modificationList}
                        </select ></div>`
            }).join("") + `</form >`;
    }
}

function buyButtonClick() { // нажатие на кнопку покупки товара
    // получаем ID товара и его модификацию из аттрибутов
    const productId = gettOfferIdByAttributes(Array.from(event.target.attributes));
    // далее получаем модификацию аналогичным способом и
    // добавляем в корзину объект и пушим инфу на сервер
}

function goodModificationOnChange() { // срабатывает при  изменении модификации товара
    const productId = gettOfferIdByAttributes(Array.from(event.target.form.attributes)),
        priceHolder = gettElementByIdAndClass(productId, 'product--price'),
        buyButton = gettElementByIdAndClass(productId, 'button--buy'),
        modificationList = event.target.form.elements;
    let newAttribute = '',
        newPrice = gettProductbyId(productId).price;

    // по какой-то причине вылезает HTML_Collection... Пришлось использовать не совсем
    // изящное решение с forEarch
    // console.log(Array.from(event.target.form.elements).reduce((previous, current, index) => {
    //     return previous + modificationInd + '/' + event.target.form.elements[index].selectedIndex + '|';
    // }));

    // получаем новую цену товара, а также новый аттрибут для кнопки "купить"
    Array.from(modificationList).forEach((modification, index) => {
        if (modificationList[index].selectedIndex == 0) return;
        const modificationInd = gettModificationIdByName(modification.name, productId);
        newPrice += gettModificationCostbyInd(productId, modificationInd, modificationList[index].selectedIndex - 1);
        if (index == modificationList.length - 1) {
            newAttribute += modificationInd + '/' + modificationList[index].selectedIndex;
            return;
        }
        newAttribute += modificationInd + '/' + modificationList[index].selectedIndex + '|';
    });
    priceHolder.innerHTML = `${newPrice} руб.`;
    buyButton.setAttribute("modifications", newAttribute);
}

function gettOfferIdByAttributes(attributes) { // защита от нестандартного порядка аттрибутов
    for (let ind = 0; ind < attributes.length; ind++)
        if (attributes[ind].name == "offer") return attributes[ind].value;
}

function gettElementByIdAndClass(offerId, htmlClassName) { // получаем элемент по классу и ID товара
    const elements = document.getElementsByClassName(htmlClassName);

    for (let ind = 0; ind < elements.length; ind++)
        if (elements[ind].getAttribute("offer") == offerId) return elements[ind];
}

function gettModificationIdByName(modName, goodId) { // получаем индекс модификации, чтобы было проще обратиться
    //  из корзины к товару и не только
    const modification = gettProductbyId(goodId).modifications;

    for (let ind = 0; ind < modification.length; ind++)
        if (modification[ind].name == modName) return ind;
}

function gettProductbyId(goodId) { // получаем индекс товара в массиве всех товаров на листе,
    // понадобиться после добавления сортировки товаров
    return goodList.goods[goodList.goodsIdMap.indexOf(goodId)];
}

function gettModificationCostbyInd(productId, modificationId, selectedModification) { // получаем конечную стоимость модификации
    return Math.abs(gettProductbyId(productId).modifications[modificationId].list.split(";")[selectedModification].split("|")[1]);
}

let goodList = new GoodList;
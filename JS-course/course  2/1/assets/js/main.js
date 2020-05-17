const products = [{
        id: 1,
        title: 'Notebook',
        price: 2000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 20
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 200
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 50
    },
];

const renderProduct = (item) => {
    return `<div class="product--item" offer="${item.id}">
                <h3>${item.title}</h3>
                <h4>Price: ${item.price} руб.</h4>
                <a class = "button button--buy">Купить</a>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => document.querySelector('.products').innerHTML += renderProduct(item));
    Array.from(document.getElementsByClassName("button--buy")).map(item => item.addEventListener("click", () => console.log(item.parentElement.getAttribute("offer"))));
};

renderPage(products);
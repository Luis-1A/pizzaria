let cart = [];
let modalQt = 1;
let modalKey = 0;
let pizzas;

// GET CART BY SESSION STORAGE
localStorage.getItem("pizza_cart") ? (cart = JSON.parse(localStorage.getItem("pizza_cart"))) : (cart = []);

const pizzasData = [
    {
        "id": 1,
        "name": "Mussarela",
        "img": "pizzamusssarela.jpg",
        "price": [14.99, 14.99, 14.99],
        "sizes": ["000g", "000g", "000g"],
        "description": "musssrela e molho de tomate."
    },
    // Adicionar os outros objetos do JSON aqui
    // ...
];

pizzas = pizzasData;
updateCart();

//##LIST PIZZAS
pizzasData.map((item, index) => {
    let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `${item.price[2].toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        // Código do modal
        // ...
    });

    document.querySelector(".pizza-area").append(pizzaItem);
});

// Remover a lógica relacionada ao envio do pedido para o servidor

// ttttttffgghjjnj
const form = document.getElementById('orderForm');
const submitButton = document.getElementById('submit');
const mensagem = document.getElementById('mensagem');
form.addEventListener('input', function() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const contato = document.getElementById('contato').value;
    if (nome && endereco && contato) {
        submitButton.style.display = 'block';
        mensagem.textContent = '';
    } else {
        submitButton.style.display = 'none';
        mensagem.textContent = 'Por favor, preencha todos os campos antes de enviar o pedido.';
    }
});
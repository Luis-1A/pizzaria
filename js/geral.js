let cart = [];
let modalQt = 1;
let modalKey = 0;
let pizzas = [
    {
        "id": 1,
        "name": "Mussarela",
        "img": "pizzamusssarela.jpg",
        "price": [14.99, 14.99, 14.99],
        "sizes": ["000g", "000g", "000g"],
        "description": "musssrela e molho de tomate."
    },
    {
        "id": 2,
        "name": "Alho e Óleo",
        "img": "pizzaalhoeoleo.jpg",
        "price": [24.99, 24.99, 24.99],
        "sizes": ["320g", "530g", "860g"],
        "description": "mussarela, alho e óleo"
    },
    {
        "id": 3,
        "name": "Marguerita",
        "img": "pizzamarguerita.png",
        "price": [24.99, 24.99, 24.99],
        "sizes": ["320g", "530g", "860g"],
        "description": "mussarela, tomate e manjericão"
    },
    // Adicione todas as outras pizzas aqui
];

// Função para listar as pizzas na tela
function listPizzas() {
    pizzas.forEach((item, index) => {
        let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
        pizzaItem.setAttribute("data-key", index);

        pizzaItem.querySelector(".pizza-item--img img").src = item.img;
        pizzaItem.querySelector(".pizza-item--price").innerHTML = `${item.price[2].toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
        pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
        pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

        pizzaItem.querySelector("a").addEventListener("click", (e) => {
            e.preventDefault();
            let key = e.target.closest(".pizza-item").getAttribute("data-key");
            modalQt = 1;
            modalKey = key;

            document.querySelector(".pizzaBig img").src = pizzas[key].img;
            document.querySelector(".pizzaInfo h1").innerHTML = pizzas[key].name;
            document.querySelector(".pizzaInfo--desc").innerHTML = pizzas[key].description;
            document.querySelector(".pizzaInfo--actualPrice").innerHTML = `${pizzas[
                key
            ].price[2].toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            })}`;
            document.querySelector(".pizzaInfo--size.selected").classList.remove("selected");
            document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
                if (sizeIndex == 2) {
                    size.classList.add("selected");
                }
                size.querySelector("span").innerHTML = pizzas[key].sizes[sizeIndex];

                size.addEventListener("click", () => {
                    document.querySelector(".pizzaInfo--size.selected").classList.remove("selected");
                    size.classList.add("selected");
                    modalQt = 1;
                    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
                    document.querySelector(".pizzaInfo--actualPrice").innerHTML = ` ${pizzas[
                        key
                    ].price[sizeIndex].toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}`;
                });
            });

            document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;

            document.querySelector(".pizzaWindowArea").style.opacity = 0;
            document.querySelector(".pizzaWindowArea").style.display = "flex";
            setTimeout(() => {
                document.querySelector(".pizzaWindowArea").style.opacity = 1;
            }, 200);
        });

        document.querySelector(".pizza-area").append(pizzaItem);
    });
}

listPizzas(); // Chama a função para listar as pizzas na tela

// Evento para fechar o modal
function closeModal() {
    document.querySelector(".pizzaWindowArea").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".pizzaWindowArea").style.display = "none";
    }, 600);
    window.scrollTo(0, 0);
}

// Fechar modal com Esc
document.addEventListener("keydown", (event) => {
    const isEscKey = event.key === "Escape";

    if (
        (document.querySelector(".pizzaWindowArea").style.opacity = 1 && isEscKey)
    ) {
        closeModal();
    }
});

// Fechar modal com click no 'cancelar'
document
    .querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton")
    .forEach((item) => {
        item.addEventListener("click", closeModal);
    });

// Controles para aumentar e diminuir quantidade de pizzas no modal
document.querySelector(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (modalQt > 1) {
        let size = parseInt(
            document
                .querySelector(".pizzaInfo--size.selected")
                .getAttribute("data-key")
        );
        let preco = pizzas[modalKey].price[size];
        modalQt--;
        document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
        let updatePreco = preco * modalQt;
        document.querySelector(
            ".pizzaInfo--actualPrice"
        ).innerHTML = `${updatePreco.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
    }
});

document.querySelector(".pizzaInfo--qtmais").addEventListener("click", () => {
    let size = parseInt(
        document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key")
    );
    let preco = pizzas[modalKey].price[size];
    modalQt++;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
    let updatePreco = preco * modalQt;
    document.querySelector(
        ".pizzaInfo--actualPrice"
    ).innerHTML = `${updatePreco.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    })}`;
});

document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
        document
            .querySelector(".pizzaInfo--size.selected")
            .classList.remove("selected"); // reset tamanho selecionado
        size.classList.add("selected");
    });
});

// Validação do formulário antes de enviar
const form = document.getElementById('orderForm');
const submitButton = document.getElementById('submit');
const mensagem = document.getElementById('mensagem');

form.addEventListener('input', function () {
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

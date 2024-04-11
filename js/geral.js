let cart = [];
let modalQt = 1;
let modalKey = 0;
let pizzas;

// GET CART BY SESSION STORAGE
localStorage.getItem("pizza_cart")
  ? (cart = JSON.parse(localStorage.getItem("pizza_cart")))
  : (cart = []);

const fetchData = async () => {
  const response = await fetch("https://raw.githubusercontent.com/feito-pelo/Teste-/daeb2d6be91472e992979c3e06bf6abb4a6c088a/apiData.json");
  const data = await response.json();
  pizzas = data;
  updateCart();
  listPizzas();
};

const listPizzas = () => {
  const pizzaArea = document.querySelector(".pizza-area");
  pizzaArea.innerHTML = ""; // Limpa a área de pizzas antes de listar novamente
  let pizzaCount = 0;

  pizzas.forEach((item, index) => {
    if (pizzaCount >= 25) return; // Limita o número de pizzas a 25
    let pizzaItem = createPizzaItem(item, index);
    pizzaArea.appendChild(pizzaItem);
    pizzaCount++;
  });
};

const createPizzaItem = (item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);
  pizzaItem.setAttribute("data-key", index);

  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `${item.price[2].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (e) => openPizzaModal(e, index));

  return pizzaItem;
};

const openPizzaModal = (e, index) => {
  e.preventDefault();
  modalQt = 1;
  modalKey = index;

  const pizza = pizzas[index];

  document.querySelector(".pizzaBig img").src = pizza.img;
  document.querySelector(".pizzaInfo h1").innerHTML = pizza.name;
  document.querySelector(".pizzaInfo--desc").innerHTML = pizza.description;
  document.querySelector(".pizzaInfo--actualPrice").innerHTML = `${pizza.price[2].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;

  const sizes = document.querySelectorAll(".pizzaInfo--size");

  sizes.forEach((size, sizeIndex) => {
    size.querySelector("span").innerHTML = pizza.sizes[sizeIndex];
    size.addEventListener("click", () => updatePizzaSize(size, sizeIndex));
  });

  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  document.querySelector(".pizzaWindowArea").style.opacity = 0;
  document.querySelector(".pizzaWindowArea").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".pizzaWindowArea").style.opacity = 1;
  }, 200);
};

const updatePizzaSize = (sizeElement, sizeIndex) => {
  document.querySelector(".pizzaInfo--size.selected").classList.remove("selected");
  sizeElement.classList.add("selected");

  modalQt = 1;
  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  document.querySelector(".pizzaInfo--actualPrice").innerHTML = ` ${pizzas[modalKey].price[sizeIndex].toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
};

const closeModal = () => {
  document.querySelector(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".pizzaWindowArea").style.display = "none";
  }, 600);
  window.scrollTo(0, 0);
};

document.addEventListener("keydown", (event) => {
  const isEscKey = event.key === "Escape";
  if (isEscKey && document.querySelector(".pizzaWindowArea").style.opacity === "1") {
    closeModal();
  }
});

document.querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
  item.addEventListener("click", closeModal);
});

const decreaseQuantity = () => {
  if (modalQt > 1) {
    let size = parseInt(document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key"));
    let preco = pizzas[modalKey].price[size];
    modalQt--;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
    let updatePreco = preco * modalQt;
    document.querySelector(".pizzaInfo--actualPrice").innerHTML = `${updatePreco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`;
  }
};

const increaseQuantity = () => {
  let size = parseInt(document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key"));
  let preco = pizzas[modalKey].price[size];
  modalQt++;
  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  let updatePreco = preco * modalQt;
  document.querySelector(".pizzaInfo--actualPrice").innerHTML = `${updatePreco.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
};

document.querySelector(".pizzaInfo--qtmenos").addEventListener("click", decreaseQuantity);
document.querySelector(".pizzaInfo--qtmais").addEventListener("click", increaseQuantity);

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

fetchData();

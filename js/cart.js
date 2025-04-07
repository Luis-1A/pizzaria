// Função para adicionar item ao carrinho
document.querySelector(".pizzaInfo--addButton").addEventListener("click", () => {
    const size = parseInt(document.querySelector(".pizzaInfo--size.selected").getAttribute("data-key"));
    const identifier = `${pizzas[modalKey].id}@${size}`;
    const keyItem = cart.findIndex(item => item.identifier === identifier);

    if (keyItem > -1) {
        cart[keyItem].qtd += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzas[modalKey].id,
            size,
            price: pizzas[modalKey].price[size],
            qtd: modalQt
        });
    }

    document.querySelector(".fa-cart-shopping").classList.add("pulse");
    updateCart();
    closeModal();
    saveCart();
});

// Salvar carrinho no localStorage
const saveCart = () => {
    try {
        localStorage.setItem("pizza_cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
};

// Abrir e fechar o carrinho
document.querySelector(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
        document.querySelector("aside").style.left = "0";
    }
});

document.querySelector(".menu-closer").addEventListener("click", () => {
    document.querySelector("aside").style.left = "100vw";
});

// Atualizar o carrinho
function updateCart() {
    const aside = document.querySelector("aside");
    const cartContainer = document.querySelector(".cart");
    document.querySelector(".menu-openner span").textContent = cart.length;

    if (cart.length > 0) {
        aside.classList.add("show");
        cartContainer.innerHTML = "";

        let pizzasValor = 0;
        const entrega = 0; // Pode ser ajustado dinamicamente
        const currencyOptions = { style: "currency", currency: "BRL" };

        cart.forEach((item, index) => {
            const pizzaItem = pizzas.find(p => p.id === item.id);
            pizzasValor += item.price * item.qtd;

            const pizzaSizeName = ["P", "M", "G"][item.size];
            const pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            const cartItem = document.querySelector(".models .cart--item").cloneNode(true);

            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item-nome").textContent = pizzaName;
            cartItem.querySelector(".cart--item--qt").textContent = item.qtd;

            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                item.qtd > 1 ? item.qtd-- : cart.splice(index, 1);
                updateCart();
            });

            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
                item.qtd++;
                updateCart();
            });

            cartContainer.appendChild(cartItem);
        });

        const subtotal = pizzasValor + entrega;
        const total = subtotal;

        document.querySelector(".pizzasValor span:last-child").textContent = pizzasValor.toLocaleString("pt-BR", currencyOptions);
        document.querySelector(".entrega span:last-child").textContent = entrega.toLocaleString("pt-BR", currencyOptions);
        document.querySelector(".subtotal span:last-child").textContent = subtotal.toLocaleString("pt-BR", currencyOptions);
        document.querySelector(".total span:last-child").textContent = total.toLocaleString("pt-BR", currencyOptions);
    } else {
        localStorage.clear();
        aside.classList.remove("show");
        aside.style.left = "100vw";
    }
    saveCart();
}

// Finalizar pedido
document.querySelector(".cart--finalizar").addEventListener("click", () => {
    const loader = document.querySelector(".loader-content");
    const successModal = document.querySelector(".success.pizzaWindowArea");

    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
        successModal.style.cssText = "opacity: 1; display: flex;";
    }, 2100);
});

// Enviar formulário
document.getElementById("orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        referencia: document.getElementById("referencia").value,
        contato: document.getElementById("contato").value,
        metodoPagamento: document.getElementById("metodoPagamento").value,
        precisaTroco: document.getElementById("troco").value === "sim",
        valorTroco: document.getElementById("valorTroco").value || null
    };

    try {
        localStorage.setItem("orderInfo", JSON.stringify(formData));
    } catch (error) {
        console.error("Erro ao salvar informações do pedido:", error);
    }
});

// Enviar pedido para WhatsApp
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    enviarPedidoParaWhatsApp();
});

function enviarPedidoParaWhatsApp() {
    const form = {
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        referencia: document.getElementById("referencia").value,
        contato: document.getElementById("contato").value,
        metodoPagamento: document.getElementById("metodoPagamento").value
    };

    let totalCompra = cart.reduce((sum, item) => sum + item.price * item.qtd, 0);
    const entrega = 0; // Ajuste conforme necessário
    const totalFinal = totalCompra + entrega;

    let mensagem = `Pedido:\n\nInformações do Cliente:\n- Nome: ${form.nome}\n- Endereço: ${form.endereco}\n- Referência: ${form.referencia}\n- Método de Pagamento: ${form.metodoPagamento}\n\nItens do Carrinho:\n`;
    cart.forEach(item => {
        const pizzaItem = pizzas.find(p => p.id === item.id);
        const sizeName = ["P", "M", "G"][item.size];
        mensagem += `${pizzaItem.name} (${sizeName}), Quantidade: ${item.qtd}\n`;
    });

    mensagem += `\nSubtotal: ${totalCompra.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}\n`;
    mensagem += `Entrega: ${entrega.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}\n`;
    mensagem += `Total: ${totalFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

    const numeroWhatsApp = "+5561981240738";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsApp, "_blank");
}

// Limpar carrinho ao carregar
function limparCarrinhoNoCarregamento() {
    if (localStorage.getItem("pizza_cart")) {
        cart.length = 0;
        localStorage.removeItem("pizza_cart");
        console.log("Carrinho limpo no carregamento.");
    }
}

limparCarrinhoNoCarregamento();
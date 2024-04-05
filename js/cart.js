document
    .querySelector(".pizzaInfo--addButton")
    .addEventListener("click", () => {
        let size = parseInt(
            document
                .querySelector(".pizzaInfo--size.selected")
                .getAttribute("data-key")
        );
        let identifier = pizzas[modalKey].id + "@" + size; //concatena id da pizza e tamanho
        let keyItem = cart.findIndex((item) => item.identifier == identifier); //return
        if (keyItem > -1) {
            cart[keyItem].qtd += modalQt; // aumenta a qtd caso item já esteja no cart
        } else {
            //## Adicionando objeto na variável "cart".
            cart.push({
                identifier,
                id: pizzas[modalKey].id,
                size,
                price: pizzas[modalKey].price[size],
                qtd: modalQt,
            });
        }
        document.querySelector(".fa-cart-shopping").classList.add("pulse");

        updateCart();
        closeModal();
        saveCart();
    });

//Salvar itens do carrinho no localStorage
const saveCart = () => {
    localStorage.setItem("pizza_cart", JSON.stringify(cart));
};

document.querySelector(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
        document.querySelector("aside").style.left = 0;
    }
});

document.querySelector(".menu-closer").addEventListener("click", () => {
    document.querySelector("aside").style.left = "100vw";
});

function updateCart() {
    document.querySelector(".menu-openner span").innerHTML = cart.length;

    if (cart.length > 0) {
        document.querySelector("aside").classList.add("show");
        document.querySelector(".cart").innerHTML = ""; //Limpar carrinho

        let pizzasValor = 0;
        let subtotal = 0;
        let entrega = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzas.find((item) => item.id == cart[i].id);
            pizzasValor += cart[i].price * cart[i].qtd;

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = "G";
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            let cartItem = document
                .querySelector(".models .cart--item")
                .cloneNode(true);

            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qtd;
            cartItem
                .querySelector(".cart--item-qtmenos")
                .addEventListener("click", () => {
                    if (cart[i].qtd > 1) {
                        cart[i].qtd--;
                    } else {
                        cart.splice(i, 1);
                    }
                    updateCart();
                });
            cartItem
                .querySelector(".cart--item-qtmais")
                .addEventListener("click", () => {
                    cart[i].qtd++;
                    updateCart();
                });

            document.querySelector(".cart").append(cartItem);
        }

        subtotal = pizzasValor + entrega;
        total = subtotal;

        document.querySelector(
            ".pizzasValor span:last-child"
        ).innerHTML = `${pizzasValor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
        document.querySelector(
            ".entrega span:last-child"
        ).innerHTML = `${entrega.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
        document.querySelector(
            ".subtotal span:last-child"
        ).innerHTML = `${subtotal.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
        document.querySelector(
            ".total span:last-child"
        ).innerHTML = `${total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}`;
    } else {
        localStorage.clear();
        document.querySelector("aside").classList.remove("show"); //Closet cart
        document.querySelector("aside").style.left = "100vw";
    }
}

document.querySelector(".cart--finalizar").addEventListener("click", () => {
    // Exibir mensagem de sucesso
    document.querySelector(".loader-content").classList.add("display");

    setTimeout(() => {
        document.querySelector(".loader-content").classList.remove("display");

        document.querySelector(".success.pizzaWindowArea").style.opacity = 1;
        document.querySelector(".success.pizzaWindowArea").style.display = "flex";

        // Remover a mensagem de sucesso ao clicar em um botão
        document.querySelector(".success.pizzaWindowArea .close-button").addEventListener("click", () => {
            document.querySelector(".success.pizzaWindowArea").style.opacity = 0;
            setTimeout(() => {
                document.querySelector(".success.pizzaWindowArea").style.display = "none";
                closeModal();
            }, 200);
        });
    }, 2100);
});
document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os valores dos campos
    let nome = document.getElementById('nome').value;
    let endereco = document.getElementById('endereco').value;
    let referencia = document.getElementById('referencia').value;
    let contato = document.getElementById('contato').value;


    let orderInfo = {
        nome: nome,
        endereco: endereco,
        referencia: referencia,
        contato: contato
    };
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

    // Lógica adicional, como enviar os dados para o servidor, etc. falta fazer
});
// Adicione um evento de clique aos campos do formulário para ocultar o carrinho
document.getElementById('nome').addEventListener('focus', () => {
    document.querySelector("aside").classList.remove("show");
});

document.getElementById('endereco').addEventListener('focus', () => {
    document.querySelector("aside").classList.remove("show");
});

document.getElementById('referencia').addEventListener('focus', () => {
    document.querySelector("aside").classList.remove("show");
});

document.getElementById('contato').addEventListener('focus', () => {
    document.querySelector("aside").classList.remove("show");
});




// Função para enviar o pedido para o WhatsApp
function enviarPedidoParaWhatsApp() {
    // Obter os valores dos campos do formulário
    let nome = document.getElementById('nome').value;
    let endereco = document.getElementById('endereco').value;
    let referencia = document.getElementById('referencia').value;
    let contato = document.getElementById('contato').value;

    // Calcular o valor total da compra
    let totalCompra = 0;
    for (let i in cart) {
        totalCompra += cart[i].price * cart[i].qtd;
    }

    // Calcular o subtotal da compra
    let subtotalCompra = totalCompra;

    // Valor da entrega (substitua pelo valor da entrega conforme necessário)
    let valorEntrega = 0.00;

    // Calcular o valor total da compra incluindo a entrega
    let valorFinal = subtotalCompra + valorEntrega;

    // Montar a mensagem com todas as informações
    let mensagem = "Pedido:\n\n";
    mensagem += "Informações do Cliente:\n";
    mensagem += "- Nome: " + nome + "\n";
    mensagem += "- Endereço: " + endereco + "\n";
    mensagem += "- Referência: " + referencia + "\n";
    mensagem += "- Contato: " + contato + "\n\n";

    mensagem += "Itens do Carrinho:\n";
    for (let i in cart) {
        let pizzaItem = pizzas.find((item) => item.id == cart[i].id);
        let pizzaSizeName;
        switch (cart[i].size) {
            case 0:
                pizzaSizeName = "P";
                break;
            case 1:
                pizzaSizeName = "M";
                break;
            case 2:
                pizzaSizeName = "G";
                break;
        }
        let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
        mensagem += `${pizzaName}, quantidade: ${cart[i].qtd}\n`; // Adiciona cada item do carrinho à mensagem
    }

    // Adicionar o subtotal, o valor da entrega e o valor final da compra à mensagem
    mensagem += "\nSubtotal: " + subtotalCompra.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + "\n";
    mensagem += "Valor da Entrega: " + valorEntrega.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + "\n";
    mensagem += "Valor Total da Compra: " + valorFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // Número do WhatsApp (substitua pelo número da sua empresa)
    var numeroWhatsApp = "+556181240738";

    // Codificar o texto da mensagem para que seja válido na URL
    var textoCodificado = encodeURIComponent(mensagem);

    // Criar o link para o WhatsApp com o texto da mensagem
    var linkWhatsApp = "https://wa.me/" + numeroWhatsApp + "?text=" + textoCodificado;

    // Limpar apenas os itens do carrinho (localStorage)
    localStorage.removeItem("pizza_cart");

    // Esperar 7 segundos antes de redirecionar para o WhatsApp
    setTimeout(function() {
        // Abrir o link no WhatsApp após 7 segundos
        window.open(linkWhatsApp);
    }, 7000);
}

// Adicionar um evento de clique ao botão de enviar pedido
document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário
    enviarPedidoParaWhatsApp(); // Chamar a função para enviar o pedido para o WhatsApp
});

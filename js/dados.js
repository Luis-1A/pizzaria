// Configuração do Firebase
var firebaseConfig = {
    apiKey: "SuaApiKey",
    authDomain: "SeuAuthDomain",
    databaseURL: "https://pizzaria-delivery-48e21-default-rtdb.firebaseio.com",
    projectId: "SeuProjectId",
    storageBucket: "SeuStorageBucket",
    messagingSenderId: "SeuMessagingSenderId",
    appId: "SuaAppId"
  };
  // Inicialize o Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Referência para o banco de dados
  var database = firebase.database();
  
  // Função para enviar os dados do carrinho para o banco de dados
  function enviarCarrinhoParaBancoDeDados(dadosDoCarrinho) {
    var carrinhoRef = database.ref('cart.js');
    carrinhoRef.set(dadosDoCarrinho).then(function() {
      console.log("Dados do carrinho enviados com sucesso para o banco de dados!");
    }).catch(function(error) {
      console.error("Erro ao enviar os dados do carrinho para o banco de dados: ", error);
    });
  }
  
  // Função a ser executada quando o botão for clicado
  document.getElementById('submit').addEventListener('click', function() {
    // Obter os dados do carrinho (substitua este exemplo pelos dados reais do carrinho)
    var dadosDoCarrinho = {
      // Insira os dados do carrinho aqui
    };
  
    // Chame a função para enviar os dados do carrinho para o banco de dados
    enviarCarrinhoParaBancoDeDados(dadosDoCarrinho);
  });
  
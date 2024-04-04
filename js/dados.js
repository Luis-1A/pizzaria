// app.js

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
  
  // Exemplo de envio de dados para o banco de dados
  var novoPedidoRef = database.ref('pedidos').push();
  novoPedidoRef.set({
    // Insira os dados do pedido aqui
  }).then(function() {
    console.log("Novo pedido enviado com sucesso para o banco de dados!");
  }).catch(function(error) {
    console.error("Erro ao enviar o novo pedido para o banco de dados: ", error);
  });
  
const axios = require("axios");

// Função auxiliar para criar um produto com informações básicas
function criarProduto(index) {
  return {
    nome: `Produto Eletrônico ${index}`,
    descricao: `Descrição detalhada para o Produto Eletrônico ${index}.`,
    imagem_url: "https://exemplo.com/imagem-produto.jpg",
    valor_inicial: 1000 + index, // valor base ajustado de acordo com o índice
    categoria: "Eletrônicos",
    data_inicio: "2025-04-10T10:00:00",
    data_termino: "2025-04-15T18:00:00",
    lance_atual: 1000 + index, // inicialmente igual ao valor_inicial
    status: "ativo",
    outros_detalhes: "Detalhes adicionais do produto."
  };
}

// Função para enviar um produto ao backend
async function enviarProduto(produto) {
  try {
    const resposta = await axios.post("http://localhost:5000/api/produtos", produto);
    console.log(`Produto ${produto.nome} cadastrado com sucesso.`);
    return resposta.data;
  } catch (error) {
    console.error(`Erro ao cadastrar ${produto.nome}:`, error.message);
  }
}

// Função principal para gerar e enviar 500 produtos
async function gerarProdutos() {
  // Para evitar sobrecarregar o backend, vamos enviar em lotes de 20 produtos por vez.
  const batchSize = 20;
  const totalProdutos = 500;
  
  for (let i = 1; i <= totalProdutos; i += batchSize) {
    const lote = [];
    for (let j = i; j < i + batchSize && j <= totalProdutos; j++) {
      const produto = criarProduto(j);
      lote.push(enviarProduto(produto));
    }
    // Aguarda o envio do lote antes de prosseguir
    await Promise.all(lote);
    console.log(`Lote de produtos ${i} a ${i + batchSize - 1} enviado.`);
    
    // Opcional: aguarda 1 segundo entre os lotes para reduzir a carga no servidor
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("Todos os 500 produtos foram enviados.");
}

gerarProdutos();

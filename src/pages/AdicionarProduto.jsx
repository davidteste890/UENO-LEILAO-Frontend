import React, { useState } from "react";
import axios from "axios";

function AdicionarProduto() {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    imagem_url: "",
    valor_inicial: ""
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparar os dados do produto; converte o valor inicial para número.
    const payload = {
      ...produto,
      valor_inicial: Number(produto.valor_inicial)
    };

    axios
      .post("http://localhost:5000/api/produtos", payload)
      .then((response) => {
        alert("Produto adicionado com sucesso!");
        // Limpar o formulário
        setProduto({
          nome: "",
          descricao: "",
          imagem_url: "",
          valor_inicial: ""
        });
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto:", error);
        alert("Erro ao adicionar produto! Verifique os dados e tente novamente.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome do Produto:</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descrição:</label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL da Imagem:</label>
          <input
            type="text"
            name="imagem_url"
            value={produto.imagem_url}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Valor Inicial:</label>
          <input
            type="number"
            name="valor_inicial"
            value={produto.valor_inicial}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}

export default AdicionarProduto;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProdutoDetalhe() {
  const { id } = useParams(); // obtém o id do produto via URL
  const [produto, setProduto] = useState(null);
  const [lance, setLance] = useState("");

  useEffect(() => {
    // Busca os detalhes do produto a partir da API
    axios
      .get(`http://localhost:5000/api/produtos/${id}`)
      .then((res) => setProduto(res.data))
      .catch((err) =>
        console.error("Erro ao buscar detalhes do produto", err)
      );
  }, [id]);

  // Função para enviar o lance
  const handleLance = () => {
    // Converte o lance para número e envia para a API
    axios
      .post(`http://localhost:5000/api/produtos/${id}/lances`, { lance: Number(lance) })
      .then((res) => {
        alert("Lance efetuado com sucesso!");
        // Atualiza os detalhes do produto após o lance, se a API retornar os dados atualizados
        setProduto(res.data);
        setLance(""); // limpa o input de lance
      })
      .catch((err) => {
        console.error("Erro ao dar lance", err);
        alert("Erro ao dar lance, tente novamente!");
      });
  };

  if (!produto) return <div>Carregando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{produto.nome}</h1>
      <img
        src={produto.imagem_url}
        alt={produto.nome}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-2">{produto.descricao}</p>
      <p className="mt-2">Valor Inicial: R$ {produto.valor_inicial}</p>
      <p className="mt-2">Lance Atual: R$ {produto.lance_atual}</p>
      <div className="mt-4">
        <input
          type="number"
          placeholder="Digite seu lance"
          value={lance}
          onChange={(e) => setLance(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleLance}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Dar Lance
        </button>
      </div>
    </div>
  );
}

export default ProdutoDetalhe;

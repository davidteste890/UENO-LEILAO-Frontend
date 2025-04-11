import { useEffect, useState } from "react";
import DarLanceModal from "../components/DarLanceModal";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const loadProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/produtos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoSelecionado(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Produtos em Leilão</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <div key={produto.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p className="text-green-600 font-bold">R$ {produto.valor_inicial}</p>
            <button
              onClick={() => abrirModal(produto)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Dar Lance
            </button>
          </div>
        ))}
      </div>

      {modalAberto && (
        <DarLanceModal
          produto={produtoSelecionado}
          onClose={fecharModal}
          onLanceEnviado={loadProdutos}
        />
      )}
    </div>
  );
}

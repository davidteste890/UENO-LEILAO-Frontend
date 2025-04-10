import { useEffect, useState } from "react";

function ProdutoCard({ produto }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLance = () => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para dar um lance!");
      return;
    }

    // Ação de dar lance aqui
    console.log("Lance enviado para o produto:", produto.id);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{produto.nome}</h2>
      <p className="mb-2">{produto.descricao}</p>
      <p className="text-green-600 font-semibold mb-3">R$ {produto.preco}</p>

      {isLoggedIn ? (
        <button
          onClick={handleLance}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dar lance
        </button>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Faça login para dar um lance
        </p>
      )}
    </div>
  );
}

export default ProdutoCard;

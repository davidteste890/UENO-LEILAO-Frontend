import { useEffect, useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/produtos")
      .then((res) => res.json())
      .then(setProdutos);
  }, []);

  const darLance = async (produtoId) => {
    const token = localStorage.getItem("token");
    const valor = prompt("Informe o valor do lance:");
    if (!valor) return;
    await fetch(`http://localhost:5000/api/lance/${produtoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ valor }),
    });
    alert("Lance registrado!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Produtos em Leilão</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((produto) => (
          <div key={produto.id} className="border p-4 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-gray-600 mb-2">R$ {produto.preco_inicial}</p>
            <button onClick={() => darLance(produto.id)} className="bg-green-600 text-white px-4 py-2 rounded">
              Dar Lance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


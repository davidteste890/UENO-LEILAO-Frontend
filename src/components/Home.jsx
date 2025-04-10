import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        MUITOS PRODUTOS APREENDIDOS PELO RECEITA FEDERAL, VAI SER LEILOADO EM NOSSO SITE. <br /> <span className="text-green-900">SEJA UM ARREMATANTE!</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map(produto => (
          <div key={produto.id} className="border rounded-xl shadow p-4 bg-white">
            <h2 className="font-bold text-lg">{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p className="text-green-700 font-semibold mt-2">R$ {produto.preco_inicial.toFixed(2)}</p>
            <Link to={`/dar-lance/${produto.id}`} className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Dar Lance
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
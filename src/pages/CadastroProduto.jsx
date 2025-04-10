import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroProduto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    valor_inicial: "",
    imagem_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Produto cadastrado com sucesso!");
      navigate("/");
    } else {
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          placeholder="Nome do Produto"
          value={formData.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="valor_inicial"
          type="number"
          placeholder="Valor Inicial (R$)"
          value={formData.valor_inicial}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="imagem_url"
          type="url"
          placeholder="URL da Imagem"
          value={formData.imagem_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

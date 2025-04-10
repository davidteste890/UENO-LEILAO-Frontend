import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (resposta.ok) {
        navigate("/login");
      } else {
        const data = await resposta.json();
        setErro(data.mensagem || "Erro ao registrar.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
          Criar Conta
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

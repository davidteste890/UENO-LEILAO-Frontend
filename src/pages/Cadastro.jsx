import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", telefone: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:5000/api/cadastrar", form);
      alert(response.data.mensagem);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErro("Email já cadastrado.");
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" type="text" placeholder="Nome" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="telefone" type="text" placeholder="Telefone" onChange={handleChange} className="w-full p-2 border rounded" required />
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;

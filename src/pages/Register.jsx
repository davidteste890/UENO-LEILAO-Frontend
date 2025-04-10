import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" placeholder="Usuário" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} className="w-full border p-2 rounded" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Cadastrar</button>
      </form>
    </div>
  );
}
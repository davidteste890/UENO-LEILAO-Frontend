import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      setUser({ username: data.username });
      navigate("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
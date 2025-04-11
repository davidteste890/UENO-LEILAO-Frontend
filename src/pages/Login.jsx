import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      alert("Login realizado com sucesso!");
      navigate("/perfil");
    } catch (err) {
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" className="w-full p-2 border rounded" onChange={(e) => setSenha(e.target.value)} required />
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;

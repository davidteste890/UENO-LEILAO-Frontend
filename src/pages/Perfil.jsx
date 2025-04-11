import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [lances, setLances] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const carregarPerfil = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar perfil.");
        }

        const data = await response.json();
        setUsuario(data.usuario);
        setLances(data.lances);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, [token, navigate]);

  if (loading) return <div className="text-center mt-10">🔄 Carregando perfil...</div>;
  if (erro) return <div className="text-center text-red-600 mt-10">❌ {erro}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">👤 Meu Perfil</h2>
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.telefone}</p>
      </div>

      <h3 className="text-xl font-semibold text-green-600 mb-2">📈 Meus Lances</h3>
      {lances.length === 0 ? (
        <p className="text-gray-600">Você ainda não fez nenhum lance.</p>
      ) : (
        <ul className="space-y-2">
          {lances.map((lance, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
              💰 R$ {lance.valor} em <strong>{lance.produto}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

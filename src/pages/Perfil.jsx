import { useEffect, useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/perfil", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Carregando perfil...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefone:</strong> {user.telefone}</p>
    </div>
  );
}

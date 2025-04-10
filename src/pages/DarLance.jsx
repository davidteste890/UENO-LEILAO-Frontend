import { useParams } from "react-router-dom";
import { useState } from "react";

export default function DarLance() {
  const { id } = useParams();
  const [valor, setValor] = useState("");

  const enviarLance = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/lance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ produto_id: id, valor })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Lance enviado com sucesso!");
      setValor("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">Dar Lance</h2>
      <form onSubmit={enviarLance} className="space-y-4">
        <input
          type="number"
          placeholder="Valor do lance"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Enviar Lance
        </button>
      </form>
    </div>
  );
}
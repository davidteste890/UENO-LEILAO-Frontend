import { useState } from "react";
import axios from "axios";

export default function DarLance({ produtoId }) {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token"); // JWT

  const handleLance = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/lances",
        {
          produto_id: produtoId,
          valor: parseFloat(valor),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensagem("Lance registrado com sucesso!");
      setValor("");
    } catch (err) {
      setMensagem("Erro ao registrar lance");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLance} className="bg-white p-4 rounded shadow">
      <label className="block mb-2 font-semibold text-green-700">
        Valor do lance:
      </label>
      <input
        type="number"
        step="0.01"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Dar Lance
      </button>
      {mensagem && <p className="mt-2 text-sm text-green-800">{mensagem}</p>}
    </form>
  );
}

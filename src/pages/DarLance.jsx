import React, { useState } from "react";

const DarLanceModal = ({ produto, onClose, onSuccess }) => {
  const [valor, setValor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/lances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          produto_id: produto.id,
          valor: parseFloat(valor),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Lance enviado com sucesso!");
        setValor("");
        setTimeout(() => {
          setMensagem("");
          onSuccess(); // Atualiza a lista de produtos
          onClose();   // Fecha o modal
        }, 2000);
      } else {
        setMensagem(data.message || "Erro ao enviar o lance.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Dar lance em: {produto.nome}</h2>
        <input
          type="number"
          placeholder="Valor do lance"
          className="w-full p-2 border rounded mb-2"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        {mensagem && (
          <p
            className={`mt-2 text-sm font-semibold ${
              mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensagem}
          </p>
        )}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Enviar Lance
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarLanceModal;

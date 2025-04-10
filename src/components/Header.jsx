// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Decodifica o token para pegar o nome (se estiver em JWT padrão)
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setNomeUsuario(payload.sub || 'Usuário');
      } catch (err) {
        console.error('Token inválido');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-green-600 text-white p-4 flex justify-between items-center shadow z-50">
      <h1 className="text-xl font-bold">UENO LEILÃO</h1>
      <div className="flex items-center gap-4">
        {nomeUsuario && <span>Olá, {nomeUsuario}</span>}
        <button
          onClick={logout}
          className="bg-white text-green-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;


import { Link } from 'react-router-dom';
import { FaGavel } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaGavel className="w-6 h-6" />
            UENO LEILÕES
          </Link>
          <p className="text-xs sm:text-sm mt-1 text-white whitespace-normal">
            ARREMATE COM A UENO LEILÕES – Produtos apreendidos pela Receita Federal na Ponte Internacional da Amizade
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/cadastro" className="hover:underline">Cadastro</Link>
          <Link to="/perfil" className="hover:underline">Perfil</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;


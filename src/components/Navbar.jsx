import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold">UENO LEILÃO</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/cadastro" className="hover:underline">Cadastro</Link>
          <Link to="/perfil" className="hover:underline">Perfil</Link>
          <Link to="/produtos" className="hover:underline">Produtos</Link>
        </div>
      </div>
      <p className="mt-2 text-sm text-center text-green-200">🚀 Dê seu lance e conquiste os melhores eletrônicos com o melhor preço!</p>
    </nav>
  );
}

export default Navbar;

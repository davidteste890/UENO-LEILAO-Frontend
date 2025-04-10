import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-green-200 text-green-900 h-screen fixed top-16 left-0 shadow-md z-10">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Categorias</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/categoria/lotes" className="block p-2 rounded hover:bg-green-300">Lotes para lance</Link>
          </li>
          <li>
            <Link to="/categoria/liberados" className="block p-2 rounded hover:bg-green-300">Liberados para lance</Link>
          </li>
          <li>
            <Link to="/categoria/embreve" className="block p-2 rounded hover:bg-green-300">Lances em breve</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar

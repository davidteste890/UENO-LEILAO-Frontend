import Sidebar from './components/Sidebar'
// ... outros imports

function App() {
  const isLoggedIn = localStorage.getItem('token') !== null

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="flex">
          {isLoggedIn && <Sidebar />}
          <div className={`flex-1 ${isLoggedIn ? 'ml-64' : ''} mt-16 p-4`}>
            <Routes>
              <Route path="/" element={<PrivateRoute><Produtos /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
              {/* Rotas das categorias */}
              <Route path="/categoria/lotes" element={<PrivateRoute><Produtos tipo="lotes" /></PrivateRoute>} />
              <Route path="/categoria/liberados" element={<PrivateRoute><Produtos tipo="liberados" /></PrivateRoute>} />
              <Route path="/categoria/embreve" element={<PrivateRoute><Produtos tipo="embreve" /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

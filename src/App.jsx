// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Layout from "./components/Layout";
import { useEffect } from "react";

function App() {
  // Protege a rota do perfil se não tiver token
  const isAutenticado = !!localStorage.getItem("token");

  useEffect(() => {
    // Aqui você pode futuramente verificar o token com o backend se quiser
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        {isAutenticado && <Route path="perfil" element={<Perfil />} />}
      </Route>
    </Routes>
  );
}

export default App;


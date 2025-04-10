import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import ProdutoList from "./pages/ProdutoList";
import LancePage from "./pages/LancePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={
        <PrivateRoute>
          <Perfil />
        </PrivateRoute>
      }/>
      <Route path="/produtos" element={<ProdutoList />} />
      <Route path="/lance/:id" element={
        <PrivateRoute>
          <LancePage />
        </PrivateRoute>
      }/>
    </Routes>
  );
}
export default App;

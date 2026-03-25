import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Anuncie from "../pages/Anuncie";
import CadastroEmpresa from "../pages/CadastroEmpresa";
import Resultados from "../pages/Resultados";
import EmpresaDetalhe from "../pages/EmpresaDetalhe";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anuncie" element={<Anuncie />} />
        <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/empresa/:id" element={<EmpresaDetalhe />} />
      </Routes>
    </BrowserRouter>
  );
}
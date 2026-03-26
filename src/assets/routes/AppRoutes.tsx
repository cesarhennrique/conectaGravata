import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CadastroEmpresa from "../pages/CadastroEmpresa";
import Resultados from "../pages/Resultados";
import EmpresaDetalhe from "../pages/EmpresaDetalhe";
import Prestadores from "../pages/Prestadores";
import Footer from "../components/layout/Footer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/empresa/:id" element={<EmpresaDetalhe />} />
          <Route path="/prestadores" element={<Prestadores />} />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}
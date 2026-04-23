import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CadastroEmpresa from "../pages/CadastroEmpresa";
import Resultados from "../pages/Resultados";
import EmpresaDetalhe from "../pages/EmpresaDetalhe";
import Prestadores from "../pages/Prestadores";
import GuiaRestaurantes from "../pages/GuiaRestaurantes";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ScrollToTop";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminCompanies from "../pages/AdminCompanies";
import AdminCompanyForm from "../pages/AdminCompanyForm";
import AdminCompanyEdit from "../pages/AdminCompanyEdit";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/empresa/:id" element={<EmpresaDetalhe />} />
          <Route path="/prestadores" element={<Prestadores />} />
          <Route
            path="/restaurantes-em-gravata"
            element={<GuiaRestaurantes />}
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empresas"
            element={
              <ProtectedRoute>
                <AdminCompanies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empresas/nova"
            element={
              <ProtectedRoute>
                <AdminCompanyForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empresas/:id/editar"
            element={
              <ProtectedRoute>
                <AdminCompanyEdit />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}

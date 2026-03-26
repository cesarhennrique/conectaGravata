import Navbar from "../components/layout/Navbar";
import ServiceCategoriesPage from "../components/services/ServiceCategoriaPage";


export default function Prestadores() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <ServiceCategoriesPage />
    </main>
  );
}
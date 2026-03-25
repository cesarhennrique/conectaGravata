import CompanyForm from "../components/home/CompanyForm";
import Navbar from "../components/layout/Navbar";


export default function CadastroEmpresa() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <CompanyForm />
    </main>
  );
}
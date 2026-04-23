import { Link, useNavigate } from "react-router-dom";
import { Building2, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "../../../lib/supabase";

type AdminLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-6">
          <Link to="/admin" className="block">
            <h2 className="text-xl font-bold text-slate-900">
              Conecta <span className="text-orange-500">Gravatá</span>
            </h2>
            <p className="mt-1 text-sm text-slate-500">Painel administrativo</p>
          </Link>

          <nav className="mt-8 space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              to="/admin/empresas"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Building2 className="h-4 w-4" />
              Empresas
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </aside>

        <main className="p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
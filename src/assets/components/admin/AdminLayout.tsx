import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, LayoutDashboard, LogOut } from "lucide-react";
import { supabase } from "../../../lib/supabase";

type AdminLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function AdminLayout({ title, subtitle, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/empresas", icon: Building2, label: "Empresas" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="flex flex-col bg-slate-900 p-6">
          <Link to="/admin" className="block">
            <h2 className="text-xl font-bold text-white">
              Conecta <span className="text-orange-400">Gravatá</span>
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Painel administrativo
            </p>
          </Link>

          <nav className="mt-10 flex-1 space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </aside>

        <main className="flex flex-col">
          <header className="border-b border-slate-200 bg-white px-8 py-5 shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </header>

          <div className="flex-1 p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

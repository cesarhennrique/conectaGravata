import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useState } from "react";

type AdminLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [dark, setDark] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview" },
    { to: "/admin/empresas", icon: Building2, label: "Empresas" },
  ];

  return (
    <div className={`min-h-screen ${dark ? "bg-zinc-950 text-white" : "bg-[#f4f4f5] text-slate-900"}`}>
      {/* Top bar */}
      <header className={`sticky top-0 z-10 flex h-16 items-center justify-between border-b px-6 ${dark ? "border-zinc-800 bg-zinc-900" : "border-slate-200 bg-white"}`}>
        {/* Logo + nav */}
        <div className="flex items-center gap-8">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-sm">CG</div>
            <span className={`text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>Conecta Gravatá</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : dark
                      ? "text-zinc-400 hover:text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-sm md:flex ${dark ? "border-zinc-700 text-zinc-400" : "border-slate-200 text-slate-400"}`}>
            <Search className="h-3.5 w-3.5" />
            Buscar...
          </button>

          <button
            onClick={() => setDark(!dark)}
            className={`rounded-full p-2 ${dark ? "bg-zinc-800 text-zinc-300" : "bg-slate-100 text-slate-500"}`}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button className={`relative rounded-full p-2 ${dark ? "bg-zinc-800 text-zinc-300" : "bg-slate-100 text-slate-500"}`}>
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-500" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Admin
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className={`hidden w-16 flex-col items-center gap-4 border-r py-6 md:flex ${dark ? "border-zinc-800 bg-zinc-900" : "border-slate-200 bg-white"}`}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                    : dark
                    ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}

          <div className="mt-auto flex flex-col gap-4">
            <button
              title="Configurações"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-400 hover:bg-slate-100"}`}
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              title="Sair"
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-400 hover:bg-slate-100"}`}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mb-6">
            <h1 className={`text-2xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

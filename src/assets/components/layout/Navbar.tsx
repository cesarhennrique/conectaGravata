import { Link } from "react-router-dom";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Conecta Gravatá"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Início
          </Link>

          <a
            href="#categorias"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Categorias
          </a>

          <a
            href="#destaques"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Destaques
          </a>

          <Link
            to="/anuncie"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Anuncie
          </Link>
        </nav>

        {/* Ações desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
            <Search className="h-5 w-5" />
          </button>

          <Link
            to="/anuncie"
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Cadastrar empresa
          </Link>
        </div>

        {/* Botão mobile */}
        <button className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
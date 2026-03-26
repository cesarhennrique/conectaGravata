import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearchClick() {
    setMenuOpen(false);
    navigate("/resultados?local=Gravatá");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
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
              href="/#categorias"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Categorias
            </a>

            <a
              href="/#destaques"
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
            <button
              onClick={handleSearchClick}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/cadastro-empresa"
              className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Cadastrar empresa
            </Link>
          </div>

          {/* Botão mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Drawer mobile */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-[340px] bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <img
            src="/logo.png"
            alt="Conecta Gravatá"
            className="h-10 w-auto"
          />

          <button
            onClick={closeMenu}
            className="rounded-xl border border-slate-200 p-2 text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Search className="h-4 w-4" />
            Buscar negócios
          </button>

          <Link
            to="/cadastro-empresa"
            onClick={closeMenu}
            className="rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Cadastrar empresa
          </Link>
        </div>

        <nav className="mt-8 flex flex-col gap-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Início
          </Link>

          <a
            href="/#categorias"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Categorias
          </a>

          <a
            href="/#destaques"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Destaques
          </a>

          <Link
            to="/anuncie"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Anuncie
          </Link>
        </nav>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Quer mais visibilidade em Gravatá?
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Anuncie sua empresa no portal e apareça para moradores e turistas.
          </p>

          <Link
            to="/anuncie"
            onClick={closeMenu}
            className="mt-4 block rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ver planos
          </Link>
        </div>
      </aside>
    </>
  );
}
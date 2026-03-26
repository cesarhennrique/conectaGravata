import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSearchClick() {
    closeMenu();
    navigate("/resultados?local=Gravatá");
  }

  function goToSection(sectionId: string) {
    closeMenu();

    // Se não estiver na home, navega primeiro
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    // Se já estiver na home, faz scroll
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          
          {/* LOGO */}
          <Link to="/" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Conecta Gravatá"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Início
            </Link>

            <button
              onClick={() => goToSection("categorias")}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Categorias
            </button>

            <button
              onClick={() => goToSection("destaques")}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Destaques
            </button>

            <Link
              to="/prestadores"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Prestadores
            </Link>
          </nav>

          {/* AÇÕES DESKTOP */}
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

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* MENU MOBILE */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-[340px] bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <img src="/logo.png" alt="Conecta Gravatá" className="h-10" />

          <button
            onClick={closeMenu}
            className="rounded-xl border border-slate-200 p-2 text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* AÇÕES */}
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

        {/* MENU */}
        <nav className="mt-8 flex flex-col gap-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Início
          </Link>

          <button
            onClick={() => goToSection("categorias")}
            className="text-left rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Categorias
          </button>

          <button
            onClick={() => goToSection("destaques")}
            className="text-left rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Destaques
          </button>

          <Link
            to="/prestadores"
            onClick={closeMenu}
            className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Prestadores
          </Link>
        </nav>
      </aside>
    </>
  );
}
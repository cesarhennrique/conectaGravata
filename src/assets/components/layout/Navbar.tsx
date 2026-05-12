import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, User, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function goToSection(sectionId: string) {
    closeMenu();
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  const isHome = location.pathname === "/";
  const isHeroPage = isHome || location.pathname === "/resultados" || location.pathname === "/prestadores";
  const transparent = isHeroPage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent
            ? "bg-transparent border-transparent"
            : "bg-white border-b border-slate-100 shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">

          {/* LOGO */}
          <Link to="/" onClick={closeMenu} className="shrink-0">
            <img
              src={transparent ? "/logonavbar.png" : "/logovermelha.png"}
              alt="Conecta Gravatá"
              className="h-9 w-auto transition-all duration-300 md:h-11"
              width="120"
              height="44"
              decoding="async"
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-7 md:flex">
            {[
              { label: "Início", to: "/" },
              { label: "Categorias", section: "categorias" },
              { label: "Destaques", section: "destaques" },
              { label: "Prestadores", to: "/prestadores" },
              { label: "Notícias", section: "noticias" },
            ].map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm font-medium transition hover:text-brand-500 ${transparent ? "text-white" : "text-slate-700"}`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => goToSection(item.section!)}
                  className={`text-sm font-medium transition hover:text-brand-500 cursor-pointer ${transparent ? "text-white" : "text-slate-700"}`}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* AÇÕES DESKTOP */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Ícone de usuário (acesso admin) */}
            <Link
              to="/admin"
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                transparent
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title="Acesso administrativo"
            >
              <User className="h-4 w-4" />
            </Link>

            {/* Botão Add Empresa */}
            <Link
              to="/cadastro-empresa"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-600"
            >
              <Plus className="h-4 w-4" />
              Cadastrar Empresa
            </Link>
          </div>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`rounded-xl border p-2 md:hidden transition ${
              transparent ? "border-white/40 text-white" : "border-slate-200 text-slate-700"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-60 bg-slate-900/40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* MENU MOBILE DRAWER */}
      <aside
        className={`fixed right-0 top-0 z-70 h-full w-[82%] max-w-85 bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <img src="/logovermelha.png" alt="Conecta Gravatá" className="h-10" />
          <button onClick={closeMenu} className="rounded-xl border border-slate-200 p-2 text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/cadastro-empresa"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Empresa
          </Link>
          <Link
            to="/admin"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <User className="h-4 w-4" />
            Acesso Admin
          </Link>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {[
            { label: "Início", to: "/" },
            { label: "Categorias", section: "categorias" },
            { label: "Destaques", section: "destaques" },
            { label: "Prestadores", to: "/prestadores" },
            { label: "Notícias", section: "noticias" },
          ].map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className="rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => goToSection(item.section!)}
                className="text-left rounded-2xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </aside>
    </>
  );
}

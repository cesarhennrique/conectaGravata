import { Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
            CG
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 md:text-lg">
              Conecta Gravatá
            </h1>
            <p className="text-xs text-slate-500">Diretório premium local</p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Início
          </a>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Categorias
          </a>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Destaques
          </a>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Anuncie
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
            <Search className="h-5 w-5" />
          </button>

          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
            Cadastrar empresa
          </button>
        </div>

        <button className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const quickCategories = [
  "restaurante",
  "pousada",
  "cafeteria",
  "serviços",
  "beleza",
];


export default function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!search.trim()) return;

    navigate(`/resultados?q=${search}&local=Gravatá`);
  }

  function handleQuickCategory(item: string) {
    navigate(`/resultados?q=${item}&local=Gravatá`);
  }

  return (
    <section className="relative overflow-hidden bg-white">
      {/* FUNDO MOBILE */}
      <div className="absolute inset-0 lg:hidden">
  <img
    src="/hero-gravata.png"
    alt="Vista de Gravatá"
    className="h-full w-full object-cover object-center opacity-50"
  />

  <div className="absolute inset-0 bg-gradient-to-b from-white/ via-white/10 to-[#f8fafc]" />
  <div className="absolute inset-0 bg-orange-30/20" />
</div>

      {/* IMAGEM DESKTOP */}
      <div className="absolute inset-y-0 right-0 hidden w-[68%] lg:block">
        <img
          src="/hero-gravata.png"
          alt="Vista de Gravatá"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/75 via-[20%] to-transparent" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="flex min-h-[560px] items-center lg:min-h-[700px]">
          <div className="max-w-3xl text-center lg:text-left">
            <span className="inline-flex rounded-full border border-orange-200 bg-white/90 px-4 py-1.5 text-sm font-medium text-orange-600 shadow-sm backdrop-blur-sm">
              Diretório premium de Gravatá
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-[-0.05em] text-slate-900 md:text-6xl lg:text-7xl">
              Descubra o melhor de Gravatá com mais praticidade
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Encontre restaurantes, pousadas, lojas e prestadores de serviço em
              uma experiência moderna, rápida e pensada para quem mora ou visita
              a cidade.
            </p>

            {/* BUSCA */}
            <div className="mt-8 w-full max-w-2xl rounded-[30px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="flex items-center gap-3 rounded-[24px] px-3 py-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Search className="h-5 w-5" />
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  placeholder="O que você procura em Gravatá?"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 md:text-base"
                />

                <button
                  onClick={handleSearch}
                  className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* CHIPS */}
            <div className="mt-6 flex flex-wrap gap-3 max-lg:justify-center">
              {quickCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickCategory(item)}
                  className="rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
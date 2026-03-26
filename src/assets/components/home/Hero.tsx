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
          className="h-full w-full object-cover object-center"
        />

        {/* overlay principal */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/65 to-white" />

        {/* leve cor da marca */}
        <div className="absolute inset-0 bg-orange-50/40" />
      </div>

      {/* IMAGEM DESKTOP */}
      <div className="absolute inset-y-0 right-0 hidden w-[68%] lg:block">
        <img
          src="/hero-gravata.png"
          alt="Vista de Gravatá"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[white] via-[#f8fafc]/50 via-[18%] to-transparent" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="flex min-h-[520px] items-center lg:min-h-[620px]">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="mt-5 text-4xl font-extrabold leading-[0.95] tracking-[-0.05em] text-slate-900 drop-shadow-sm md:text-6xl lg:text-7xl">
              Descubra o melhor de Gravatá
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Encontre restaurantes, pousadas, lojas e serviços de forma rápida,
              elegante e pensada para celular.
            </p>

            <div className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-[24px] border border-slate-200 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <Search className="h-5 w-5 text-slate-400" />

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
                className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Buscar
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 max-lg:justify-center">
              {quickCategories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleQuickCategory(item)}
                  className="rounded-full border border-slate-200 bg-white/95 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-slate-100"
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

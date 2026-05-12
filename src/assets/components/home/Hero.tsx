import { Search, MapPin, LayoutGrid, UtensilsCrossed, ShoppingBag, Hotel, Landmark, SlidersHorizontal, Heart, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chips = [
  { label: "Restaurante", icon: UtensilsCrossed, value: "restaurante" },
  { label: "Lojas",       icon: ShoppingBag,    value: "loja"        },
  { label: "Pousadas",    icon: Hotel,           value: "pousada"     },
  { label: "Turismo",     icon: Landmark,        value: "turismo"     },
];

const extraMobileCategories = ["Cafeteria", "Beleza", "Serviços", "Saúde", "Moda", "Automotivo"];

const categoryOptions = [
  "Restaurante","Pousada","Cafeteria","Loja","Beleza",
  "Saúde","Serviços","Moda","Automotivo","Academia","Educação","Turismo",
];

export default function Hero() {
  const [keyword, setKeyword]   = useState("");
  const [category, setCategory] = useState("");
  const [showMoreCats, setShowMoreCats] = useState(false);
  const navigate = useNavigate();

  function handleSearch() {
    const q = keyword.trim() || category.toLowerCase();
    navigate(q ? `/resultados?q=${q}&local=Gravatá` : "/resultados?local=Gravatá");
  }

  return (
    <section className="relative flex min-h-[80vh] flex-col justify-center pb-10 pt-20 md:min-h-screen md:items-center md:pb-32 md:pt-24">
      {/* FUNDO */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/hero-gravata-mobile.webp" media="(max-width:1023px)" type="image/webp" />
          <source srcSet="/hero-gravata.webp" type="image/webp" />
          <img
            src="/hero-gravata.png"
            alt="Vista de Gravatá"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            width="1400"
            height="900"
          />
        </picture>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/40 to-transparent md:hidden" />
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="relative z-10 flex w-full flex-col px-5 md:hidden">
        {/* Título */}
        <p className="text-sm font-medium text-white/80">Bem-vindo a</p>
        <div className="mt-1 flex items-center gap-3">
          <h1 className="text-5xl font-extrabold text-white">Gravatá</h1>
          <Heart className="h-7 w-7 fill-brand-500 text-brand-500" />
        </div>
        <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
          Descubra o melhor da nossa cidade: gastronomia, lazer, hospedagem e muito mais!
        </p>

        {/* Search simplificado */}
        <div className="mt-5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-xl">
            <Search className="h-4 w-4 shrink-0 text-brand-500" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              placeholder="O que você procura?"
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => navigate("/resultados")}
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-500 shadow-xl transition hover:bg-brand-600"
          >
            <SlidersHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Cards de categoria */}
        <div className="mt-5">
          <div className="grid grid-cols-5 gap-2">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.value}
                  onClick={() => navigate(`/resultados?categoria=${chip.value}`)}
                  className="flex cursor-pointer flex-col items-center gap-1.5"
                >
                  <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-white shadow-lg transition hover:bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <span className="text-center text-[10px] font-semibold leading-tight text-white">
                    {chip.label}
                  </span>
                </button>
              );
            })}

            {/* Ver mais */}
            <button
              onClick={() => setShowMoreCats(!showMoreCats)}
              className="flex cursor-pointer flex-col items-center gap-1.5"
            >
              <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-white shadow-lg transition hover:bg-brand-50">
                {showMoreCats
                  ? <ChevronUp className="h-6 w-6 text-brand-500" />
                  : <LayoutGrid className="h-6 w-6 text-brand-500" />
                }
              </div>
              <span className="text-center text-[10px] font-semibold text-white">
                {showMoreCats ? "Menos" : "Ver mais"}
              </span>
            </button>
          </div>

          {/* Categorias extras expandidas */}
          {showMoreCats && (
            <div className="mt-2 grid grid-cols-5 gap-2">
              {extraMobileCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/resultados?categoria=${cat.toLowerCase()}`)}
                  className="flex cursor-pointer flex-col items-center gap-1.5"
                >
                  <div className="flex h-12 w-full items-center justify-center rounded-2xl bg-white/90 shadow transition hover:bg-brand-50">
                    <span className="text-xs font-bold text-brand-500">{cat.slice(0,3)}</span>
                  </div>
                  <span className="text-center text-[10px] font-semibold text-white">{cat}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="relative z-10 hidden w-full px-5 text-center md:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
          Descubra e conecte-se com os melhores negócios de Gravatá
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white md:mt-4 md:text-6xl lg:text-[5rem]">
          Encontre o Melhor de <br />
          <span className="text-brand-500">GRAVATÁ - PE</span>
        </h1>

        <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-full bg-white shadow-2xl">
          <div className="flex items-center">
            <div className="flex flex-1 items-center gap-2 px-5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                placeholder="O que você procura?"
                className="w-full bg-transparent py-4 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="hidden h-8 w-px shrink-0 bg-slate-200 md:block" />
            <div className="hidden items-center gap-2 px-5 md:flex">
              <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
              <span className="whitespace-nowrap text-sm text-slate-500">Gravatá, PE</span>
            </div>
            <div className="hidden h-8 w-px shrink-0 bg-slate-200 md:block" />
            <div className="hidden items-center gap-2 px-5 md:flex">
              <LayoutGrid className="h-4 w-4 shrink-0 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent py-4 text-sm text-slate-500 outline-none cursor-pointer"
              >
                <option value="">Selecionar Categoria</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="m-1.5 flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 cursor-pointer shrink-0"
            >
              Buscar <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-medium text-white/60">Descubra Gravatá:</span>
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.value}
                onClick={() => navigate(`/resultados?q=${chip.value}&local=Gravatá`)}
                className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-brand-500 hover:border-brand-500 cursor-pointer"
              >
                <Icon className="h-3.5 w-3.5" />
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

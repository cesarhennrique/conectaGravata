import { Search, MapPin, LayoutGrid, UtensilsCrossed, ShoppingBag, Hotel, Landmark, SlidersHorizontal, Heart, ChevronUp, X, Clock, CreditCard, Coffee, Scissors, Stethoscope, Shirt, Car } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chips = [
  { label: "Restaurante", icon: UtensilsCrossed, value: "restaurante" },
  { label: "Lojas",       icon: ShoppingBag,    value: "loja"        },
  { label: "Pousadas",    icon: Hotel,           value: "pousada"     },
  { label: "Turismo",     icon: Landmark,        value: "turismo"     },
];

const allCategories = [
  "Restaurante","Loja","Pousada","Cafeteria","Beleza",
  "Saúde","Serviços","Moda","Automotivo","Academia","Educação","Turismo",
];

const extraMobileCategories = [
  { label: "Cafeteria",  icon: Coffee,       value: "cafeteria"  },
  { label: "Beleza",     icon: Scissors,     value: "beleza"     },
  { label: "Serviços",   icon: LayoutGrid,   value: "serviços"   },
  { label: "Saúde",      icon: Stethoscope,  value: "saúde"      },
  { label: "Moda",       icon: Shirt,        value: "moda"       },
  { label: "Automotivo", icon: Car,          value: "automotivo" },
];

const categoryOptions = [
  "Restaurante","Pousada","Cafeteria","Loja","Beleza",
  "Saúde","Serviços","Moda","Automotivo","Academia","Educação","Turismo",
];

export default function Hero() {
  const [keyword, setKeyword]       = useState("");
  const [category, setCategory]     = useState("");
  const [showMoreCats, setShowMoreCats] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCat, setFilterCat]   = useState("");
  const [filterOpen2, setFilterOpen2] = useState(false);
  const [filterCard, setFilterCard] = useState(false);
  const navigate = useNavigate();

  function applyFilters() {
    const params = new URLSearchParams();
    if (filterCat) params.set("categoria", filterCat);
    if (filterOpen2) params.set("aberto", "true");
    if (filterCard) params.set("cartao", "true");
    navigate(`/resultados?${params.toString()}`);
    setFilterOpen(false);
  }

  function handleSearch() {
    const q = keyword.trim() || category.toLowerCase();
    navigate(q ? `/resultados?q=${q}&local=Gravatá` : "/resultados?local=Gravatá");
  }

  return (
    <>
    {/* Overlay do drawer */}
    {filterOpen && (
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={() => setFilterOpen(false)}
      />
    )}

    {/* Drawer de filtros */}
    <div className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white px-5 pt-5 pb-8 shadow-2xl transition-transform duration-300 md:hidden ${filterOpen ? "translate-y-0" : "translate-y-full"}`}>
      {/* Handle + header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200 absolute left-1/2 -translate-x-1/2 top-3" />
        <h3 className="text-base font-extrabold text-slate-900">Filtros</h3>
        <button onClick={() => setFilterOpen(false)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Categorias */}
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Categoria</p>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(filterCat === cat.toLowerCase() ? "" : cat.toLowerCase())}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filterCat === cat.toLowerCase()
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">Preferências</p>
      <div className="flex gap-3">
        <button
          onClick={() => setFilterOpen2(!filterOpen2)}
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            filterOpen2 ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <Clock className="h-3.5 w-3.5" /> Aberto agora
        </button>
        <button
          onClick={() => setFilterCard(!filterCard)}
          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
            filterCard ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          <CreditCard className="h-3.5 w-3.5" /> Aceita cartão
        </button>
      </div>

      {/* Botão aplicar */}
      <button
        onClick={applyFilters}
        className="mt-6 w-full cursor-pointer rounded-2xl bg-brand-500 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600"
      >
        Ver resultados
      </button>
    </div>

    <section className="relative flex min-h-[80vh] flex-col justify-center pb-28 pt-20 md:min-h-screen md:items-center md:pb-32 md:pt-24">
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
            onClick={() => setFilterOpen(true)}
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
                  onClick={() => navigate(`/resultados?q=${chip.value}&local=Gravatá`)}
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
              {extraMobileCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => navigate(`/resultados?q=${cat.value}&local=Gravatá`)}
                    className="flex cursor-pointer flex-col items-center gap-1.5"
                  >
                    <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-white shadow-lg transition hover:bg-brand-50">
                      <Icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <span className="text-center text-[10px] font-semibold text-white">{cat.label}</span>
                  </button>
                );
              })}
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
    </>
  );
}

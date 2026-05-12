import { Search, MapPin, LayoutGrid, UtensilsCrossed, ShoppingBag, Hotel, Landmark, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const chips = [
  { label: "Restaurante", icon: UtensilsCrossed, value: "restaurante" },
  { label: "Lojas",       icon: ShoppingBag,    value: "loja"        },
  { label: "Pousadas",    icon: Hotel,           value: "pousada"     },
  { label: "Turismo",     icon: Landmark,        value: "turismo"     },
];

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
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-20 md:min-h-screen md:pb-32 md:pt-24">
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
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bacl/30 to-transparent md:hidden" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full px-5 text-center">

        {/* Subtítulo — oculto no mobile para não poluir */}
        <p className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:block md:text-sm">
          Descubra e conecte-se com os melhores negócios de Gravatá
        </p>

        {/* Título — menor no mobile */}
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white md:mt-4 md:text-6xl lg:text-[5rem]">
          Encontre o Melhor de <br />{" "}
          <span className="text-brand-500">GRAVATÁ - PE</span>
        </h1>

        {/* BARRA DE BUSCA */}
        <div className="mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-full bg-white shadow-2xl">
          <div className="flex items-center">

            {/* Keyword */}
            <div className="flex flex-1 items-center gap-2 px-4 py-0 md:px-5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                placeholder="O que você procura?"
                className="w-full bg-transparent py-3.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 md:py-4"
              />
            </div>

            {/* Divider + Localização — apenas desktop */}
            <div className="hidden h-8 w-px shrink-0 bg-slate-200 md:block" />
            <div className="hidden items-center gap-2 px-5 md:flex">
              <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
              <span className="whitespace-nowrap text-sm text-slate-500">Gravatá, PE</span>
            </div>

            {/* Divider + Categoria — apenas desktop */}
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

            {/* Botão */}
            <button
              onClick={handleSearch}
              className="m-1.5 flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600 cursor-pointer shrink-0 md:px-7 md:py-3.5"
            >
              Buscar <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CHIPS — desktop */}
        <div className="mt-5 hidden flex-wrap items-center justify-center gap-2 md:flex md:gap-3">
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

        {/* FILTROS MOBILE */}
        <div className="mt-4 flex flex-col items-center gap-2 md:hidden">
          {/* Linha 1: categorias principais + ver mais */}
          <div className="flex flex-wrap justify-center gap-2">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <button
                  key={chip.value}
                  onClick={() => navigate(`/resultados?categoria=${chip.value}`)}
                  className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-brand-500 hover:border-brand-500 cursor-pointer"
                >
                  <Icon className="h-3 w-3" />
                  {chip.label}
                </button>
              );
            })}
            {showMoreCats && ["Cafeteria","Beleza","Serviços","Saúde","Moda","Turismo"].map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/resultados?categoria=${cat.toLowerCase()}`)}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-brand-500 hover:border-brand-500 cursor-pointer"
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setShowMoreCats(!showMoreCats)}
              className="flex items-center gap-1 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 cursor-pointer"
            >
              {showMoreCats ? <><ChevronUp className="h-3 w-3" />Menos</> : <><ChevronDown className="h-3 w-3" />Ver mais</>}
            </button>
          </div>

          {/* Linha 2: toggle Aberto agora */}
          <button
            onClick={() => navigate("/resultados?aberto=true")}
            className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-brand-500 hover:border-brand-500 cursor-pointer"
          >
            <Clock className="h-3 w-3" />
            Aberto agora
          </button>
        </div>
      </div>
    </section>
  );
}

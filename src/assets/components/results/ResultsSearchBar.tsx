import { Search, MapPin, LayoutGrid } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const categoryOptions = [
  "Restaurante","Pousada","Cafeteria","Loja","Beleza",
  "Saúde","Serviços","Moda","Automotivo","Academia","Educação","Turismo",
];

export default function ResultsSearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("q") || "");
  }, [searchParams]);

  function handleSearch() {
    const params = new URLSearchParams();
    const q = query.trim() || category;
    if (q) params.set("q", q);
    params.set("local", "Gravatá");
    navigate(`/resultados?${params.toString()}`);
  }

  const title = searchParams.get("q")
    ? `Categoria: ${searchParams.get("q")!.charAt(0).toUpperCase() + searchParams.get("q")!.slice(1)}`
    : "Explorar Empresas";

  return (
    <div className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Fundo */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/hero-gravata.webp" type="image/webp" />
          <img src="/hero-gravata.png" alt="" className="h-full w-full object-cover opacity-30" />
        </picture>
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        {/* Título */}
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">{title}</h1>

        {/* Breadcrumb */}
        <p className="mt-2 text-sm text-slate-400">
          Início{" "}
          <span className="mx-1.5 text-slate-500">›</span>
          Empresas{" "}
          <span className="mx-1.5 text-slate-500">›</span>
          <span className="text-brand-400">{searchParams.get("q") || "Todas"}</span>
        </p>

        {/* Barra de busca */}
        <div className="mx-auto mt-8 overflow-hidden rounded-full bg-white shadow-2xl">
          <div className="flex items-center">
            <div className="flex flex-1 items-center gap-2 px-5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                <option value="">Todas categorias</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c.toLowerCase()}>{c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              className="m-1.5 flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 cursor-pointer shrink-0"
            >
              Buscar <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

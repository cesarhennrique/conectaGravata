import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from "../../shared/categories";

const categories = CATEGORIES.map((c) => c.toLowerCase());

export default function FiltersSidebar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get("categoria") || "";
  const openNow = searchParams.get("aberto") === "true";
  const acceptCard = searchParams.get("cartao") === "true";
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [catOpen, setCatOpen] = useState(true);
  const [showMoreCat, setShowMoreCat] = useState(false);

  function updateParam(key: string, value: string | boolean) {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === false) params.delete(key);
    else params.set(key, String(value));
    navigate(`/resultados?${params.toString()}`);
  }

  function handleKeyword(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (keyword.trim()) params.set("q", keyword.trim());
    else params.delete("q");
    navigate(`/resultados?${params.toString()}`);
  }

  const visibleCats = showMoreCat ? categories : categories.slice(0, 6);

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Filtros</h2>
          <div className="mt-1 h-0.5 w-8 rounded-full bg-brand-500" />
        </div>

        <div className="divide-y divide-slate-100">
          {/* Keyword */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Palavra-chave</h3>
              <ChevronUp className="h-4 w-4 text-brand-500" />
            </div>
            <form onSubmit={handleKeyword} className="mt-3 flex items-center overflow-hidden rounded-xl border border-slate-200">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Buscar..."
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="flex h-9 w-9 cursor-pointer items-center justify-center text-slate-400 transition hover:text-brand-500">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Categoria */}
          <div className="px-5 py-4">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex w-full cursor-pointer items-center justify-between"
            >
              <h3 className="text-sm font-semibold text-slate-900">Categoria</h3>
              {catOpen ? <ChevronUp className="h-4 w-4 text-brand-500" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>

            {catOpen && (
              <div className="mt-3 space-y-2">
                {visibleCats.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <label key={cat} className="flex cursor-pointer items-center gap-2.5">
                      <div
                        onClick={() => updateParam("categoria", active ? "" : cat)}
                        className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition ${
                          active ? "border-brand-500 bg-brand-500" : "border-slate-300 hover:border-brand-400"
                        }`}
                      >
                        {active && (
                          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => updateParam("categoria", active ? "" : cat)}
                        className={`text-sm capitalize transition ${active ? "font-semibold text-brand-600" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        {cat}
                      </span>
                    </label>
                  );
                })}

                {categories.length > 6 && (
                  <button
                    onClick={() => setShowMoreCat(!showMoreCat)}
                    className="mt-1 cursor-pointer text-xs font-semibold text-brand-500 transition hover:text-brand-600"
                  >
                    {showMoreCat ? "− Menos" : "+ Mais"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sugestões */}
          <div className="px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">Sugestões</h3>
            <div className="mt-3 space-y-2.5">
              <label className="flex cursor-pointer items-center gap-2.5">
                <div
                  onClick={() => updateParam("aberto", !openNow)}
                  className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition ${
                    openNow ? "border-brand-500 bg-brand-500" : "border-slate-300 hover:border-brand-400"
                  }`}
                >
                  {openNow && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-600">Aberto agora</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2.5">
                <div
                  onClick={() => updateParam("cartao", !acceptCard)}
                  className={`flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border transition ${
                    acceptCard ? "border-brand-500 bg-brand-500" : "border-slate-300 hover:border-brand-400"
                  }`}
                >
                  {acceptCard && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-600">Aceita cartão</span>
              </label>
            </div>
          </div>

          {/* Limpar */}
          <div className="px-5 py-4">
            <button
              onClick={() => navigate("/resultados")}
              className="w-full cursor-pointer rounded-xl border border-brand-200 py-2.5 text-sm font-semibold text-brand-500 transition hover:bg-brand-50"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

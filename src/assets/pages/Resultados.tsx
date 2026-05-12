import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ResultsSearchBar from "../components/results/ResultsSearchBar";
import FiltersSidebar from "../components/results/FiltersSidebar";
import ResultCard from "../components/results/ResultCard";
import { supabase } from "../../lib/supabase";
import { mapSupabaseBusiness, type PublicBusiness } from "../shared/businessMapper";
import { isPublicBusinessOpenNow } from "../shared/publicBusinessHours";
import { LayoutGrid, List, Trash2 } from "lucide-react";

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const planOrder: Record<"premium" | "pro" | "basic", number> = { premium: 0, pro: 1, basic: 2 };

export default function Resultados() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewGrid, setViewGrid] = useState(true);

  const query           = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("categoria") || "";
  const selectedPrice   = searchParams.get("preco") || "";
  const openNow         = searchParams.get("aberto") === "true";
  const acceptCard      = searchParams.get("cartao") === "true";

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .neq("status", "inactive")
        .order("created_at", { ascending: false });

      if (!error) setBusinesses((data || []).map(mapSupabaseBusiness));
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const nq = normalize(query.trim());
    return businesses
      .filter((b) => {
        const mq = !nq || normalize(b.name).includes(nq) || normalize(b.category).includes(nq) || normalize(b.location).includes(nq) || normalize(b.description).includes(nq);
        const mc = !selectedCategory || normalize(b.category).includes(normalize(selectedCategory));
        const mp = !selectedPrice || b.priceLevel === selectedPrice;
        const mo = !openNow || isPublicBusinessOpenNow(b);
        return mq && mc && mp && mo;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return planOrder[a.plan] - planOrder[b.plan];
      });
  }, [businesses, query, selectedCategory, selectedPrice, openNow, acceptCard]);

  // Tags de filtros ativos
  const activeTags: { label: string; removeKey: string }[] = [];
  if (query) activeTags.push({ label: query, removeKey: "q" });
  if (selectedCategory) activeTags.push({ label: selectedCategory, removeKey: "categoria" });
  if (openNow) activeTags.push({ label: "Aberto agora", removeKey: "aberto" });
  if (acceptCard) activeTags.push({ label: "Aceita cartão", removeKey: "cartao" });

  function removeTag(key: string) {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    navigate(`/resultados?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <ResultsSearchBar />

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl gap-6">
          <FiltersSidebar />

          <div className="min-w-0 flex-1">

            {/* Barra de resultado + ordenação */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-medium text-slate-600">
                {loading ? "Carregando..." : (
                  <>Mostrando <span className="font-bold text-slate-900">{filtered.length}</span> resultado{filtered.length !== 1 ? "s" : ""}</>
                )}
              </p>
              <div className="flex items-center gap-3">
                <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm outline-none cursor-pointer">
                  <option>Adicionados recentemente</option>
                  <option>Nome A-Z</option>
                  <option>Destaque primeiro</option>
                </select>
                <button
                  onClick={() => setViewGrid(false)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition ${!viewGrid ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewGrid(true)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border transition ${viewGrid ? "border-brand-500 bg-brand-500 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tags de filtros ativos */}
            {activeTags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <span className="text-sm font-medium text-slate-500">Filtros:</span>
                {activeTags.map((tag) => (
                  <span
                    key={tag.removeKey}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag.label}
                    <button
                      onClick={() => removeTag(tag.removeKey)}
                      className="ml-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => navigate("/resultados")}
                  className="ml-auto flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-brand-500 transition hover:text-brand-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Limpar todos
                </button>
              </div>
            )}

            {/* Cards */}
            <div className="mt-6">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                  <p className="text-sm text-slate-500">Carregando empresas...</p>
                </div>
              ) : filtered.length > 0 ? (
                <div className={viewGrid
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
                  : "flex flex-col gap-4"
                }>
                  {filtered.map((b) => (
                    <ResultCard
                      key={b.id}
                      id={b.id}
                      name={b.name}
                      category={b.category}
                      location={b.location}
                      image={b.image}
                      description={b.description}
                      plan={b.plan}
                      whatsapp={b.whatsapp}
                      isOpenNow={isPublicBusinessOpenNow(b)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">Nenhum resultado encontrado</h2>
                  <p className="mt-2 text-sm text-slate-500">Tente ajustar os filtros ou pesquisar por outro termo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

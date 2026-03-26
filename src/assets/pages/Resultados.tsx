import Navbar from "../components/layout/Navbar";
import ResultsSearchBar from "../components/results/ResultsSearchBar";
import FiltersSidebar from "../components/results/FiltersSidebar";
import ResultCard from "../components/results/ResultCard";
import MapPreview from "../components/results/MapPreview";
import { useSearchParams } from "react-router-dom";
import { businesses } from "../../data/businesses";



export default function Resultados() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const local = searchParams.get("local") || "Gravatá - PE";
  const selectedCategory = searchParams.get("categoria") || "";
  const selectedPrice = searchParams.get("preco") || "";
  const openNow = searchParams.get("aberto") === "true";
  const acceptCard = searchParams.get("cartao") === "true";
  const familyFriendly = searchParams.get("familia") === "true";

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBusinesses = businesses
    .filter((business) => {
      const matchesQuery =
        !normalizedQuery ||
        business.name.toLowerCase().includes(normalizedQuery) ||
        business.category.toLowerCase().includes(normalizedQuery) ||
        business.location.toLowerCase().includes(normalizedQuery) ||
        business.description.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        !selectedCategory ||
        business.category
          .toLowerCase()
          .includes(selectedCategory.toLowerCase());

      const matchesPrice =
        !selectedPrice || business.priceLevel === selectedPrice;

      const matchesOpen = !openNow || business.openNow;
      const matchesCard = !acceptCard || business.card;
      const matchesFamily = !familyFriendly || business.familyFriendly;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPrice &&
        matchesOpen &&
        matchesCard &&
        matchesFamily
      );
    })
    .sort((a, b) => {
      const planOrder = {
        premium: 0,
        pro: 1,
        basic: 2,
      };

      return (
        planOrder[a.plan as keyof typeof planOrder] -
        planOrder[b.plan as keyof typeof planOrder]
      );
    });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <ResultsSearchBar />

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl gap-6">
          <FiltersSidebar />

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {query ? `${query} em ${local}` : `Resultados em ${local}`}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {filteredBusinesses.length} resultado
                  {filteredBusinesses.length !== 1 ? "s" : ""} encontrado
                  {filteredBusinesses.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Ordenar: Relevância
              </button>
            </div>

            {filteredBusinesses.length > 0 ? (
              <div className="space-y-5">
                {filteredBusinesses.map((business) => (
                  <ResultCard key={business.id} {...business} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Nenhum resultado encontrado
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Tente ajustar a busca ou remover alguns filtros para ver mais
                  opções.
                </p>
              </div>
            )}
          </div>

          <MapPreview />
        </div>
      </section>
    </main>
  );
}

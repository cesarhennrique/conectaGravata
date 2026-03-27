import Navbar from "../components/layout/Navbar";
import ResultsSearchBar from "../components/results/ResultsSearchBar";
import FiltersSidebar from "../components/results/FiltersSidebar";
import ResultCard from "../components/results/ResultCard";
import { useSearchParams } from "react-router-dom";
import { businesses } from "../../data/businesses";
import { isBusinessOpenNow } from "../shared/businessHours";

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const planOrder: Record<"premium" | "pro" | "basic", number> = {
  premium: 0,
  pro: 1,
  basic: 2,
};

export default function Resultados() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const local = searchParams.get("local") || "Gravatá - PE";
  const selectedCategory = searchParams.get("categoria") || "";
  const selectedPrice = searchParams.get("preco") || "";
  const openNow = searchParams.get("aberto") === "true";
  const acceptCard = searchParams.get("cartao") === "true";
  const familyFriendly = searchParams.get("familia") === "true";

  const normalizedQuery = normalize(query.trim());

  const filteredBusinesses = businesses
    .filter((business) => {
      const matchesQuery =
        !normalizedQuery ||
        normalize(business.name).includes(normalizedQuery) ||
        normalize(business.category).includes(normalizedQuery) ||
        normalize(business.location).includes(normalizedQuery) ||
        normalize(business.description).includes(normalizedQuery);

      const matchesCategory =
        !selectedCategory ||
        normalize(business.category).includes(normalize(selectedCategory));

      const matchesPrice =
        !selectedPrice || business.priceLevel === selectedPrice;

      const matchesOpen = !openNow || isBusinessOpenNow(business);
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
    .sort((a, b) => planOrder[a.plan] - planOrder[b.plan]);

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

              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Ordenar: Relevância
              </button>
            </div>

            {filteredBusinesses.length > 0 ? (
              <div className="space-y-5">
                {filteredBusinesses.map((business) => (
                  <ResultCard
                    key={business.id}
                    id={business.id}
                    name={business.name}
                    category={business.category}
                    location={business.location}
                    image={business.image}
                    description={business.description}
                    plan={business.plan}
                    whatsapp={business.whatsapp}
                    isOpenNow={isBusinessOpenNow(business)}
                  />
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
        </div>
      </section>
    </main>
  );
}

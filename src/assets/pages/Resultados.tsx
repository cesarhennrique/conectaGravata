import Navbar from "../components/layout/Navbar";
import ResultsSearchBar from "../components/results/ResultsSearchBar";
import FiltersSidebar from "../components/results/FiltersSidebar";
import ResultCard from "../components/results/ResultCard";
import MapPreview from "../components/results/MapPreview";
import { useSearchParams } from "react-router-dom";

const businesses = [
  {
    id: 1,
    name: "Bistrô da Serra",
    category: "Restaurante",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    description:
      "Ambiente sofisticado, boa gastronomia e uma experiência ideal para moradores e turistas em Gravatá.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: true,
  },
  {
    id: 2,
    name: "Villa Gravatá",
    category: "Pousada",
    location: "Alpes Suíços, Gravatá",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Hospedagem charmosa com estrutura aconchegante, excelente localização e clima acolhedor.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: true,
  },
  {
    id: 3,
    name: "Café do Mirante",
    category: "Cafeteria",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Perfeito para uma pausa, reuniões e momentos especiais com café de qualidade e ambiente agradável.",
    priceLevel: "R$$",
    openNow: true,
    card: true,
    familyFriendly: false,
  },
  {
    id: 4,
    name: "Elétrica Gravatá",
    category: "Serviços",
    location: "Prado, Gravatá",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Serviços elétricos residenciais e comerciais com atendimento rápido em Gravatá.",
    priceLevel: "R$$",
    openNow: false,
    card: false,
    familyFriendly: false,
  },
  {
    id: 5,
    name: "Studio Belle",
    category: "Beleza",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Salão de beleza com serviços de cabelo, maquiagem e estética para diferentes ocasiões.",
    priceLevel: "R$$",
    openNow: true,
    card: true,
    familyFriendly: false,
  },
  {
    id: 6,
    name: "Moda Serra",
    category: "Moda",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
    description:
      "Loja com roupas e acessórios para quem busca estilo e variedade em Gravatá.",
    priceLevel: "R$",
    openNow: true,
    card: true,
    familyFriendly: false,
  },
];

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

  const filteredBusinesses = businesses.filter((business) => {
    const matchesQuery =
      !normalizedQuery ||
      business.name.toLowerCase().includes(normalizedQuery) ||
      business.category.toLowerCase().includes(normalizedQuery) ||
      business.location.toLowerCase().includes(normalizedQuery) ||
      business.description.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !selectedCategory || business.category === selectedCategory;

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
                  Tente ajustar a busca ou remover alguns filtros para ver mais opções.
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
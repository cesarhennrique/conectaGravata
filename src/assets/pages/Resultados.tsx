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
  },
];

export default function Resultados() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "Resultados";
  const local = searchParams.get("local") || "Gravatá - PE";

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
                  {query} em {local}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Explore empresas e serviços locais com rapidez.
                </p>
              </div>

              <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Ordenar: Relevância
              </button>
            </div>

            <div className="space-y-5">
              {businesses.map((business) => (
                <ResultCard key={business.id} {...business} />
              ))}
            </div>
          </div>

          <MapPreview />
        </div>
      </section>
    </main>
  );
}
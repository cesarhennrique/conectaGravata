import { MapPin } from "lucide-react";

const businesses = [
  {
    id: 1,
    name: "Bistrô da Serra",
    category: "Restaurante",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    plan: "premium",
  },
  {
    id: 2,
    name: "Villa Gravatá",
    category: "Pousada",
    location: "Alpes Suíços",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    plan: "premium",
  },
  {
    id: 3,
    name: "Café do Mirante",
    category: "Cafeteria",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    plan: "premium",
  },
  {
    id: 4,
    name: "Studio Belle",
    category: "Beleza",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    plan: "premium",
  },
  {
    id: 5,
    name: "Moda Serra",
    category: "Moda",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
    plan: "premium",
  },
  {
    id: 6,
    name: "Vida Clínica",
    category: "Saúde",
    location: "Centro",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    plan: "premium",
  },
];

export default function FeaturedBusinesses() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
              Destaques do portal
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Empresas em destaque
            </h2>

            <p className="mt-2 text-slate-600">
              Negócios com maior visibilidade no Conecta Gravatá
            </p>
          </div>

          <button className="rounded-2xl border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            Ver todos
          </button>
        </div>

        {/* GRID */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* BADGE */}
                {business.plan === "premium" && (
                  <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Destaque
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <p className="text-xs font-medium text-slate-500">
                  {business.category}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {business.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {business.location}
                  </div>

                  
                </div>

                {/* CTA */}
                <button
                  className={`mt-4 w-full rounded-xl py-2 text-sm font-semibold transition ${
                    business.plan === "premium"
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-slate-900 text-white hover:opacity-90"
                  }`}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

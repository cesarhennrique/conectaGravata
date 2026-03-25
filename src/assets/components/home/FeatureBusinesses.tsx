import BusinessCard from "./BusinessCard";

type Business = {
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  plan: "basic" | "pro" | "premium";
};

const businesses: Business[] = [
  {
    name: "Bistrô da Serra",
    category: "Restaurante",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    plan: "premium",
  },
  {
    name: "Villa Gravatá",
    category: "Pousada",
    location: "Alpes Suíços, Gravatá",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    plan: "pro",
  },
  {
    name: "Café do Mirante",
    category: "Cafeteria",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    plan: "basic",
  },
];

export default function FeaturedBusinesses() {
  return (
    <section id="destaques" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Empresas em destaque
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Conheça negócios que estão ganhando mais visibilidade no Conecta
              Gravatá e oferecendo experiências especiais para moradores e
              turistas.
            </p>
          </div>

          <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ">
            Ver todas
          </button>
        </div>

        <div className="mt-10 grid gap-15 md:grid-cols-2">
          {businesses.map((business) => (
            <BusinessCard
              key={business.name}
              name={business.name}
              category={business.category}
              location={business.location}
              image={business.image}
              rating={business.rating}
              plan={business.plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

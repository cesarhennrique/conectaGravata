import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { businesses } from "../../../data/businesses";

const featuredBusinesses = businesses
  .filter((business) => business.plan === "premium" || business.plan === "pro")
  .slice(0, 8);

export default function FeaturedBusinesses() {
  return (
    <section id="destaques" className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredBusinesses.map((business) => (
            <div
              key={business.id}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {business.plan === "premium" && (
                  <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Destaque
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-xs font-medium text-slate-500">
                  {business.category}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {business.name}
                </h3>

                <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {business.location}
                </div>

                <Link
                  to={`/empresa/${business.id}`}
                  className={`mt-4 block w-full rounded-xl py-2 text-center text-sm font-semibold text-white transition ${
                    business.plan === "premium"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-slate-900 hover:opacity-90"
                  }`}
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
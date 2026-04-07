import { MapPin, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { businesses } from "../../../data/businesses";

const featuredBusinesses = businesses
  .filter((business) => business.plan === "premium" )
  .slice(0, 8);

export default function FeaturedBusinesses() {
  const navigate = useNavigate();

  return (
    <section
      id="destaques"
      className="bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)] px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
              Destaques em Gravatá
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Empresas com mais visibilidade em Gravatá
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Negócios locais com presença fortalecida no portal para serem
              encontrados com mais rapidez por moradores e turistas.
            </p>
          </div>

          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredBusinesses.map((business) => {
            const isPremium = business.plan === "premium";

            return (
              <article
                key={business.id}
                className={`group overflow-hidden rounded-[28px] border bg-white shadow-sm transition duration-300  ${
                  isPremium
                    ? "border-orange-300 shadow-[0_10px_40px_rgba(249,115,22,0.15)]"
                    : "border-slate-200"
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="h-full w-full object-cover transition duration-500 "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-transparent" />

                  {isPremium && (
                    <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      Destaque
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
                    {business.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {business.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                    {business.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      to={`/empresa/${business.id}`}
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
                        isPremium
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-slate-900 hover:opacity-90"
                      }`}
                    >
                      Ver detalhes
                    </Link>

                    <button
                      onClick={() => {
                        const mensagem = `
Olá! Encontrei sua empresa no Conecta Gravatá.

*Empresa:* ${business.name}
*Local:* ${business.location}

Gostaria de mais informações.
                        `.trim();

                        const url = `https://wa.me/${
                          business.whatsapp
                        }?text=${encodeURIComponent(mensagem)}`;

                        window.open(url, "_blank");
                      }}
                      className="rounded-2xl border bg-green-300 border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-green-400 cursor-pointer"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

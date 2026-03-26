import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  Wrench,
  Paintbrush,
  Flower2,
  BrushCleaning,
  Hammer,
  Snowflake,
  Car,
} from "lucide-react";

const serviceCategories = [
  {
    title: "Eletricistas",
    query: "eletricista",
    icon: Zap,
  },
  {
    title: "Encanadores",
    query: "encanador",
    icon: Wrench,
  },
  {
    title: "Pintores",
    query: "pintor",
    icon: Paintbrush,
  },
  {
    title: "Jardinagem",
    query: "jardinagem",
    icon: Flower2,
  },
  {
    title: "Limpeza",
    query: "limpeza",
    icon: BrushCleaning,
  },
  {
    title: "Montagem e manutenção",
    query: "manutenção",
    icon: Hammer,
  },
  {
    title: "Refrigeração",
    query: "refrigeração",
    icon: Snowflake,
  },
  {
    title: "Detalhamento automotivo",
    query: "detalhamento automotivo",
    icon: Car,
  },
];

const inspirationBlocks = [
  {
    title: "Cuide melhor da sua casa",
    description:
      "Encontre profissionais para pequenos reparos, manutenção e melhorias no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    query: "manutenção",
    cta: "Encontrar profissionais",
  },
  {
    title: "Serviços rápidos e locais",
    description:
      "Precisa resolver algo com urgência? Descubra prestadores próximos em Gravatá.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    query: "serviços",
    cta: "Ver opções",
  },
  {
    title: "Melhore seu espaço",
    description:
      "Pintura, jardinagem, limpeza e outros serviços para deixar seu ambiente ainda melhor.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
    query: "pintor",
    cta: "Explorar serviços",
  },
];

export default function ServiceCategoriesPage() {
  const navigate = useNavigate();

  function goToResults(query: string) {
    navigate(`/resultados?q=${query}&local=Gravatá`);
  }

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Topo */}
        <div className="max-w-3xl">
          <span className="rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
            Prestadores de serviço
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Encontre prestadores de serviço em Gravatá
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Descubra profissionais locais para manutenção, reparos, limpeza,
            jardinagem e outros serviços do dia a dia.
          </p>
        </div>

        {/* Categorias rápidas */}
        <div className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Categorias de serviços
            </h2>

            <button
              onClick={() => goToResults("serviços")}
              className="hidden rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 md:inline-flex"
            >
              Ver todos
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">
            {serviceCategories.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.title}
                  onClick={() => goToResults(service.query)}
                  className="group rounded-[24px] border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-orange-100 group-hover:text-orange-500">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-sm font-semibold leading-5 text-slate-900">
                    {service.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blocos inspiracionais */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Serviços para o dia a dia
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {inspirationBlocks.map((block) => (
              <article
                key={block.title}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {block.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {block.description}
                  </p>

                  <button
                    onClick={() => goToResults(block.query)}
                    className="mt-5 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    {block.cta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Precisa de ajuda para encontrar um profissional?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                Explore as categorias e encontre prestadores locais para resolver
                seu problema com mais rapidez em Gravatá.
              </p>
            </div>

            <Link
              to="/resultados?q=serviços&local=Gravatá"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explorar prestadores
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
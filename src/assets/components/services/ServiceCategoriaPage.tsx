import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Zap, Wrench, Paintbrush, Flower2, Hammer, Snowflake, Car, Sparkles } from "lucide-react";

const serviceCategories = [
  { title: "Eletricistas",              query: "eletricista",           icon: Zap },
  { title: "Encanadores",               query: "encanador",             icon: Wrench },
  { title: "Pintores",                  query: "pintor",                icon: Paintbrush },
  { title: "Jardinagem",                query: "jardinagem",            icon: Flower2 },
  { title: "Limpeza",                   query: "limpeza",               icon: Sparkles },
  { title: "Manutenção",                query: "manutenção",            icon: Hammer },
  { title: "Refrigeração",              query: "refrigeração",          icon: Snowflake },
  { title: "Automotivo",                query: "detalhamento automotivo", icon: Car },
];

const inspirationBlocks = [
  {
    title: "Cuide melhor da sua casa",
    description: "Encontre profissionais para pequenos reparos, manutenção e melhorias no dia a dia.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    query: "manutenção",
    cta: "Encontrar profissionais",
    tag: "Casa & Reparos",
  },
  {
    title: "Serviços rápidos e locais",
    description: "Precisa resolver algo com urgência? Descubra prestadores próximos em Gravatá.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    query: "serviços",
    cta: "Ver opções",
    tag: "Urgência",
  },
  {
    title: "Melhore seu espaço",
    description: "Pintura, jardinagem, limpeza e outros serviços para deixar seu ambiente ainda melhor.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
    query: "pintor",
    cta: "Explorar serviços",
    tag: "Ambiente",
  },
];

export default function ServiceCategoriesPage() {
  const navigate = useNavigate();

  function goToResults(query: string) {
    navigate(`/resultados?q=${encodeURIComponent(query)}&local=Gravatá`);
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="relative flex min-h-[320px] items-center overflow-hidden bg-slate-900 md:min-h-[380px]">
        <div className="absolute inset-0">
          <picture>
            <source srcSet="/hero-gravata.webp" type="image/webp" />
            <img src="/hero-gravata.png" alt="" className="h-full w-full object-cover opacity-30" />
          </picture>
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-20 text-center md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 md:text-sm">
            Prestadores de Serviço
          </p>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-white md:text-5xl">
            Encontre Profissionais em <span className="text-brand-500">Gravatá</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            Eletricistas, encanadores, pintores e muito mais — profissionais locais para resolver o seu dia.
          </p>
          <p className="mt-5 text-sm text-slate-500">
            Início <span className="mx-1.5 text-slate-600">›</span>
            <span className="text-brand-400">Prestadores</span>
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">

          {/* Categorias */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">Categorias</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Tipos de serviço</h2>
            </div>
            <button
              onClick={() => goToResults("serviços")}
              className="hidden cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-500 hover:text-white md:flex"
            >
              Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {serviceCategories.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.title}
                  onClick={() => goToResults(service.query)}
                  className="group flex cursor-pointer flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white px-3 pb-4 pt-4 shadow-xl shadow-black/10 transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <span className="text-center text-sm font-bold leading-tight text-slate-800 transition group-hover:text-brand-500">
                    {service.title}
                  </span>
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 transition group-hover:bg-brand-100">
                    <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Blocos inspiracionais */}
          <div className="mt-16">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">Inspiração</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Serviços para o dia a dia</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
                Do lar ao trabalho, encontre profissionais confiáveis de Gravatá para cada necessidade.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {inspirationBlocks.map((block) => (
                <article
                  key={block.title}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => goToResults(block.query)}
                >
                  {/* Imagem */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={block.image}
                      alt={block.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow">
                      {block.tag}
                    </span>
                  </div>

                  {/* Corpo */}
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-brand-500">
                      {block.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {block.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                      {block.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-16 overflow-hidden rounded-2xl bg-slate-900">
            <div className="relative px-8 py-12 md:px-12">
              {/* fundo sutil */}
              <div className="absolute inset-0 opacity-10">
                <img src="/hero-gravata.webp" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">Precisa de ajuda?</p>
                  <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                    Encontre o profissional certo para você
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Explore todas as categorias e descubra prestadores locais de Gravatá disponíveis agora.
                  </p>
                </div>
                <Link
                  to="/resultados?q=serviços&local=Gravatá"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow transition hover:bg-brand-600"
                >
                  Explorar prestadores <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

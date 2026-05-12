import { ArrowUpRight, Calendar } from "lucide-react";

const news = [
  {
    id: 1,
    category: "Turismo",
    title: "Gravatá recebe mais de 50 mil visitantes no São João 2025",
    date: "10 Jun 2025",
    gradient: "from-brand-600/80 to-brand-900/90",
    bg: "bg-brand-400",
  },
  {
    id: 2,
    category: "Gastronomia",
    title: "Festival de Comida Típica movimenta o centro da cidade em julho",
    date: "28 Mai 2025",
    gradient: "from-amber-600/80 to-red-900/90",
    bg: "bg-amber-400",
  },
  {
    id: 3,
    category: "Negócios",
    title: "Novos estabelecimentos abrem as portas no bairro Centro em 2025",
    date: "15 Mai 2025",
    gradient: "from-blue-600/80 to-slate-900/90",
    bg: "bg-blue-400",
  },
  {
    id: 4,
    category: "Eventos",
    title: "Feira de Artesanato volta ao Parque das Pinheiras com edição especial",
    date: "05 Mai 2025",
    gradient: "from-purple-600/80 to-slate-900/90",
    bg: "bg-purple-400",
  },
];

export default function NewsSection() {
  return (
    <section id="noticias" className="bg-slate-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
              Acontece em Gravatá
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Notícias da cidade
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              Fique por dentro do que acontece em Gravatá: eventos, turismo e novidades locais.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 cursor-pointer">
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <article
              key={item.id}
              className="group relative flex h-72 cursor-pointer flex-col justify-end overflow-hidden rounded-3xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Background color + gradient overlay */}
              <div className={`absolute inset-0 ${item.bg}`} />
              <div className={`absolute inset-0 bg-linear-to-t ${item.gradient}`} />

              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px"}} />

              {/* Content */}
              <div className="relative z-10 p-5">
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-3 text-base font-bold leading-snug text-white line-clamp-2">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-slate-900">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

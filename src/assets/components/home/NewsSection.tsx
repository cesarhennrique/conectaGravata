import { User, ArrowUpRight } from "lucide-react";

const news = [
  {
    id: 1,
    category: "Turismo",
    categoryHighlight: false,
    title: "Gravatá recebe mais de 50 mil visitantes no São João 2025",
    author: "Redação Conecta",
    image: "/hero-gravata-mobile.webp",
  },
  {
    id: 2,
    category: "Gastronomia",
    categoryHighlight: true,
    title: "Festival de Comida Típica movimenta o centro da cidade em julho",
    author: "Redação Conecta",
    image: "/hero-gravata.webp",
  },
  {
    id: 3,
    category: "Negócios",
    categoryHighlight: false,
    title: "Novos estabelecimentos abrem as portas no bairro Centro em 2025",
    author: "Redação Conecta",
    image: "/hero-gravata-mobile.webp",
  },
];

export default function NewsSection() {
  return (
    <section id="noticias" className="bg-white px-5 py-16 md:py-24 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            Dicas e Inspiração
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Últimas notícias de Gravatá
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Fique por dentro do que acontece em Gravatá: eventos, turismo e novidades locais.
          </p>
        </div>

        {/* Grid 3 colunas — igual ao Listygo */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Imagem com overlay escuro no hover */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay base */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge categoria — no meio/baixo da imagem */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white shadow ${
                      item.categoryHighlight
                        ? "bg-brand-500"
                        : "border border-white/40 bg-black/40 backdrop-blur-sm"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Corpo */}
              <div className="bg-white p-5">
                {/* Título com sublinhado animado da esquerda para direita */}
                <h3 className="relative inline text-base font-bold leading-snug text-slate-900">
                  <span
                    className="
                      bg-[linear-gradient(#F23D4C,#F23D4C)] bg-no-repeat bg-bottom-left
                      bg-size-[0%_2px] pb-0.5
                      transition-[background-size] duration-500 ease-out
                      group-hover:bg-size-[100%_2px]
                    "
                  >
                    {item.title}
                  </span>
                </h3>

                {/* Autor */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    por <span className="font-semibold text-slate-700">{item.author}</span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Botão ver todas */}
        <div className="mt-10 text-center">
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-500 hover:text-white">
            Ver todas as notícias
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

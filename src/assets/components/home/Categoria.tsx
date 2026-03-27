import {
  UtensilsCrossed,
  Hotel,
  Coffee,
  Wrench,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Shirt,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "restaurante",
    label: "Bares e Restaurantes",
    description: "Descubra opções para almoço, jantar e experiências especiais.",
    icon: UtensilsCrossed,
  },
  {
    name: "pousada",
    label: "Pousadas",
    description: "Hospedagens acolhedoras para descansar e aproveitar Gravatá.",
    icon: Hotel,
  },
  {
    name: "cafeteria",
    label: "Cafeterias",
    description: "Cafés, encontros e pausas em lugares cheios de charme.",
    icon: Coffee,
  },
  {
    name: "serviços",
    label: "Serviços",
    description: "Profissionais locais para manutenção, reparos e suporte rápido.",
    icon: Wrench,
  },
  {
    name: "beleza",
    label: "Beleza",
    description: "Salões, estética e cuidados pessoais para o dia a dia.",
    icon: Scissors,
  },
  {
    name: "loja",
    label: "Lojas",
    description: "Presentes, utilidades e variedades para moradores e turistas.",
    icon: ShoppingBag,
  },
  {
    name: "saúde",
    label: "Saúde",
    description: "Clínicas, consultórios e serviços voltados ao bem-estar.",
    icon: Stethoscope,
  },
  {
    name: "moda",
    label: "Moda",
    description: "Roupas, acessórios e tendências em negócios locais.",
    icon: Shirt,
  },
];

export default function Categoria() {
  const navigate = useNavigate();

  function handleCategoryClick(category: string) {
    navigate(`/resultados?q=${category}&local=Gravatá`);
  }

  return (
    <section
      id="categorias"
      className="bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)] px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
              Explore o portal
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Encontre negócios por categoria
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Descubra empresas, experiências e serviços locais em uma navegação
              simples, visual e pensada para facilitar sua busca em Gravatá.
            </p>
          </div>

          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
  key={category.name}
  onClick={() => handleCategoryClick(category.name)}
  className="group cursor-pointer overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg md:p-5"
>
  <div className="flex items-start justify-between gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-100 group-hover:text-orange-600">
      <Icon className="h-5 w-5" />
    </div>

    <div className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 md:block">
      Explorar
    </div>
  </div>

  <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 md:text-xl">
    {category.label}
  </h3>

  <p className="mt-2 hidden text-sm leading-7 text-slate-600 md:block">
    {category.description}
  </p>

  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700">
    Ver categoria
    <ArrowUpRight className="h-4 w-4" />
  </div>
</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
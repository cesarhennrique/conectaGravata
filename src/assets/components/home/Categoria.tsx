import {
  UtensilsCrossed,
  Hotel,
  Coffee,
  Wrench,
  Scissors,
  ShoppingBag,
  Stethoscope,
  Shirt,
} from "lucide-react";

const categories = [
  {
    name: "Restaurantes",
    description: "Almoço, jantar e experiências.",
    icon: UtensilsCrossed,
  },
  {
    name: "Pousadas",
    description: "Hospedagens e descanso.",
    icon: Hotel,
  },
  {
    name: "Cafeterias",
    description: "Café, encontro e pausa.",
    icon: Coffee,
  },
  {
    name: "Serviços",
    description: "Profissionais e manutenção.",
    icon: Wrench,
  },
  {
    name: "Beleza",
    description: "Estética e cuidados pessoais.",
    icon: Scissors,
  },
  {
    name: "Lojas",
    description: "Moda, presentes e variedades.",
    icon: ShoppingBag,
  },
  {
    name: "Saúde",
    description: "Clínicas e bem-estar.",
    icon: Stethoscope,
  },
  {
    name: "Moda",
    description: "Roupas e acessórios.",
    icon: Shirt,
  },
];

export default function Categoria() {
  return (
    <section id="categorias" className="bg-slate-50 px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Encontre negócios por categoria
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
            Descubra empresas, experiências e serviços locais de forma simples e rápida.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.name}
                className="group rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:p-5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-orange-100 group-hover:text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 md:text-lg">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600 md:text-sm">
                  {category.description}
                </p>

                <button className="mt-4 text-xs font-semibold text-slate-900 transition group-hover:text-orange-600 md:text-sm">
                  Explorar →
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
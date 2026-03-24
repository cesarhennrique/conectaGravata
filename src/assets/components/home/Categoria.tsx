import {
  Utensils,
  Hotel,
  Coffee,
  Wrench,
  Scissors,
} from "lucide-react";

const categories = [
  { name: "Restaurantes", icon: Utensils },
  { name: "Pousadas", icon: Hotel },
  { name: "Cafés", icon: Coffee },
  { name: "Serviços", icon: Wrench },
  { name: "Beleza", icon: Scissors },
];

export default function Categories() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        
        <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Explore por categorias
        </h2>

        <p className="mt-2 text-slate-600">
          Encontre rapidamente o que você precisa em Gravatá.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <Icon className="mb-3 h-6 w-6 text-slate-700" />
                <span className="text-sm font-medium text-slate-800">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import {
  UtensilsCrossed, Hotel, Coffee, Wrench, Scissors, ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "restaurante", label: "Restaurantes", icon: UtensilsCrossed },
  { name: "loja",        label: "Lojas",        icon: ShoppingBag    },
  { name: "pousada",     label: "Pousadas",     icon: Hotel          },
  { name: "cafeteria",   label: "Cafeterias",   icon: Coffee         },
  { name: "beleza",      label: "Beleza",       icon: Scissors       },
  { name: "serviços",    label: "Serviços",     icon: Wrench         },
];

export default function Categoria() {
  const navigate = useNavigate();

  return (
    <section id="categorias" className="relative bg-white pb-16 md:pb-20">
      {/* Cards sobrepostos — absolute no topo da seção, -translate-y-1/2 sobe metade sobre o hero */}
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate(`/resultados?q=${cat.name}&local=Gravatá`)}
                  className="group flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-white px-3 pt-4 pb-4 shadow-xl shadow-black/10 border border-slate-100 transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <span className="text-sm font-bold text-slate-800 text-center leading-tight group-hover:text-brand-500 transition">
                    {cat.label}
                  </span>
                  <span className="text-xs text-slate-400">(—)</span>
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 transition group-hover:bg-brand-100">
                    <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.5} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Espaço + botão Ver todos */}
      <div className="flex flex-col items-center pt-56 sm:pt-44 md:pt-32">
        <button
          onClick={() => navigate("/resultados?local=Gravatá")}
          className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white hover:border-brand-500 cursor-pointer"
        >
          Ver todas as categorias
        </button>
      </div>
    </section>
  );
}

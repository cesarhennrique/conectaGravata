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
    <section id="categorias" className="relative bg-white pb-10 md:pb-20">

      {/* ── MOBILE ── */}
      <div className="relative z-20 px-4 pt-8 md:hidden">
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/resultados?q=${cat.name}&local=Gravatá`)}
                className="group flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl bg-white px-2 pt-3 pb-3 shadow-xl shadow-black/10 border border-slate-100 transition duration-200 active:scale-95"
              >
                <span className="text-xs font-bold text-slate-800 text-center leading-tight group-hover:text-brand-500 transition">
                  {cat.label}
                </span>
                <span className="text-[10px] text-slate-400">(—)</span>
                <div className="mt-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 transition group-hover:bg-brand-100">
                  <Icon className="h-4 w-4 text-brand-500" strokeWidth={1.5} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Botão ver todos — mobile */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="rounded-full border border-slate-200 bg-white px-7 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white hover:border-brand-500 cursor-pointer"
          >
            Ver todas as categorias
          </button>
        </div>
      </div>

      {/* ── DESKTOP: absolute -translate-y-1/2 centraliza os 6 cards na borda ── */}
      <div className="absolute top-0 left-0 right-0 hidden -translate-y-1/2 px-8 md:block">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-6 gap-3">
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

      {/* Espaço para o conteúdo desktop abaixo dos cards */}
      <div className="hidden md:block md:pt-32">
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-brand-500 hover:text-white hover:border-brand-500 cursor-pointer"
          >
            Ver todas as categorias
          </button>
        </div>
      </div>
    </section>
  );
}

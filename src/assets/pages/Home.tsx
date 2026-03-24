import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Categories from "../components/home/Categoria";

const quickCategories = [
  "Restaurantes",
  "Pousadas",
  "Cafés",
  "Serviços",
  "Beleza",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-14 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.08),transparent_28%),linear-gradient(to_bottom,#f8fafc,#fffdf9)]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex rounded-full bg-slate-200 px-4 py-1 text-sm font-medium text-slate-700">
              Diretório premium de Gravatá
            </span>

            <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-6xl lg:text-7xl">
              Descubra o melhor de Gravatá
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Encontre restaurantes, pousadas, lojas e serviços de forma rápida,
              elegante e pensada para celular.
            </p>

            <div className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="O que você procura em Gravatá?"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 md:text-base"
              />
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Buscar
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 max-lg:justify-center">
              {quickCategories.map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

        
        </div>
      </section>

      <Categories />
    </main>
  );
}

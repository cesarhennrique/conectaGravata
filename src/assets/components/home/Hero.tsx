import { Search } from "lucide-react";

const quickCategories = [
  "Restaurantes",
  "Pousadas",
  "Cafés",
  "Serviços",
  "Beleza",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)]">
      
      {/* IMAGEM FULL WIDTH */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[65%] hidden lg:block">
        <img
          src="/hero-gravata.png"
          alt="Vista de Gravatá"
          className="h-full w-full object-cover object-right"
        />

        {/* fade suave */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/25 via-[28%] to-transparent" />
      </div>

      {/* CONTEÚDO (LIMITADO) */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-20">
        <div className="flex min-h-[520px] items-center lg:min-h-[620px]">
          <div className="max-w-2xl text-center lg:text-left">
            
            

            <h1 className="mt-5 text-5xl font-extrabold leading-[0.95] tracking-[-0.05em] text-slate-900 md:text-6xl lg:text-7xl">
              Descubra o melhor de Gravatá
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Encontre restaurantes, pousadas, lojas e serviços de forma rápida,
              elegante e pensada para celular.
            </p>

            {/* BUSCA */}
            <div className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="O que você procura em Gravatá?"
                className="w-full bg-transparent outline-none"
              />
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Buscar
              </button>
            </div>

            {/* CHIPS */}
            <div className="mt-6 flex flex-wrap gap-3 max-lg:justify-center">
              {quickCategories.map((item) => (
                <button
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm hover:bg-slate-100"
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="px-6 pb-8 lg:hidden">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[24px]">
          <img
            src="/hero-gravata.jpg"
            alt="Vista de Gravatá"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
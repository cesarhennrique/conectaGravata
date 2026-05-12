import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function CtaBanner() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#111] py-20 md:py-28">
      {/* Fundo desaturado */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/hero-gravata.webp" type="image/webp" />
          <img src="/hero-gravata.png" alt="" className="h-full w-full object-cover object-center grayscale opacity-25" loading="lazy" decoding="async" />
        </picture>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">

          {/* COLUNA ESQUERDA — texto */}
          <div
            className={`max-w-lg transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            {/* Linha decorativa */}
            <svg width="48" height="8" viewBox="0 0 48 8" fill="none" className="mb-5" aria-hidden="true">
              <path d="M2 4 C10 1, 28 7, 46 4" stroke="#F23D4C" strokeWidth="3" strokeLinecap="round"/>
            </svg>

            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Vamos colocar seu negócio no{" "}
              <span className="text-brand-500">mapa de Gravatá.</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-400">
              Milhares de moradores e turistas buscam por restaurantes, pousadas e serviços em Gravatá todos os dias. Mostre sua empresa para quem já está procurando.
            </p>

            <button
              onClick={() => navigate("/cadastro-empresa")}
              className="mt-8 inline-flex cursor-pointer items-center gap-3 rounded-full bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition duration-300 hover:bg-brand-600 hover:shadow-brand-600/40 hover:gap-4"
            >
              Cadastrar minha empresa
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* COLUNA DIREITA — polaroids */}
          <div
            className={`relative h-72 w-full max-w-sm shrink-0 md:h-80 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            {/* Polaroid 1 — inclinado para a esquerda */}
            <div className="absolute left-0 top-4 w-48 -rotate-6 overflow-hidden rounded-lg bg-white p-2 shadow-2xl shadow-black/50 transition duration-500 hover:rotate-0 hover:scale-105 hover:z-20">
              <img
                src="/hero-gravata-mobile.webp"
                alt="Negócios em Gravatá"
                className="h-36 w-full rounded object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Gravatá, PE
              </p>
            </div>

            {/* Polaroid 2 — inclinado para a direita */}
            <div className="absolute right-0 top-10 w-48 rotate-6 overflow-hidden rounded-lg bg-white p-2 shadow-2xl shadow-black/50 transition duration-500 hover:rotate-0 hover:scale-105 hover:z-20">
              <img
                src="/hero-gravata.webp"
                alt="Cidade de Gravatá"
                className="h-36 w-full rounded object-cover object-[center_30%]"
                loading="lazy"
                decoding="async"
              />
              <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Conecta Gravatá
              </p>
            </div>

            {/* Badge circular girando */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-spin-slow">
              <svg viewBox="0 0 100 100" width="90" height="90" aria-hidden="true">
                <defs>
                  <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="40" fill="#F23D4C" />
                <text fontSize="9.5" fontWeight="700" fill="white" letterSpacing="2.2">
                  <textPath href="#circle">DESCUBRA · CONECTE · CRESÇA ·&nbsp;</textPath>
                </text>
              </svg>
            </div>

            {/* Squiggle decorativo */}
            <svg
              className="absolute -bottom-4 right-4 text-brand-500"
              width="80" height="30" viewBox="0 0 80 30" fill="none" aria-hidden="true"
            >
              <path d="M2 20 C15 5, 25 28, 40 15 C55 2, 65 25, 78 12" stroke="#F23D4C" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </section>
  );
}

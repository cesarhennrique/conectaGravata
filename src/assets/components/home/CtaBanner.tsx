import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/hero-gravata.webp" type="image/webp" />
          <img
            src="/hero-gravata.png"
            alt=""
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          Para empreendedores
        </span>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Coloque seu negócio no<br />
          <span className="text-brand-400">mapa de Gravatá</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300">
          Milhares de moradores e turistas buscam por serviços locais todos os dias. Mostre sua empresa para quem está procurando.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/cadastro-empresa")}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-brand-600 cursor-pointer"
          >
            Cadastrar minha empresa
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 cursor-pointer"
          >
            Explorar o portal
          </button>
        </div>
      </div>
    </section>
  );
}

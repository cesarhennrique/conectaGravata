import { useEffect, useState, useRef, useCallback } from "react";
import { MapPin, Phone, MessageCircle, ArrowUpRight, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { mapSupabaseBusiness, type PublicBusiness } from "../../shared/businessMapper";

const CARDS_PER_PAGE = 4;

export default function FeaturedBusinesses() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("status", "active")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(12);
      if (!error) setBusinesses((data || []).map(mapSupabaseBusiness));
      setLoading(false);
    }
    load();
  }, []);

  const totalPages = Math.ceil(businesses.length / CARDS_PER_PAGE);

  const goTo = useCallback((p: number) => {
    setPage(p);
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }, []);

  const prev = () => goTo((page - 1 + totalPages) % totalPages);
  const next = () => goTo((page + 1) % totalPages);

  const visible = businesses.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  function openWhatsApp(b: PublicBusiness) {
    if (!b.whatsapp) return;
    const msg = `Olá! Encontrei sua empresa no Conecta Gravatá.\n\n*Empresa:* ${b.name}\n*Local:* ${b.location}\n\nGostaria de mais informações.`;
    window.open(`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <section id="destaques" className="bg-white px-5 py-16 md:py-24 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
            Empresas em Destaque
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Os Melhores Negócios de Gravatá
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Empresas locais com presença fortalecida no portal, prontas para atender moradores e turistas.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Carregando destaques...</div>

        ) : businesses.length === 0 ? (
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-12 text-center">
            <h3 className="text-lg font-bold text-slate-800">Nenhuma empresa em destaque ainda</h3>
            <p className="mt-2 text-sm text-slate-500">Marque empresas como destaque no painel admin.</p>
          </div>

        ) : (
          <>
            {/* Cards */}
            <div
              ref={trackRef}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {visible.map((b) => (
                <article
                  key={b.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Imagem */}
                  <div className="relative h-48 shrink-0 overflow-hidden">
                    <img
                      src={b.image}
                      alt={b.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Badge categoria */}
                    <div className="absolute left-3 top-3">
                      <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-brand-500 text-brand-500" />
                        {b.category}
                      </span>
                    </div>

                    {/* Badge Destaque */}
                    <span className="absolute right-3 top-3 rounded-full bg-green-500 px-2.5 py-1 text-xs font-bold text-white shadow">
                      Destaque
                    </span>

                    {/* Coração */}
                    <button className="absolute bottom-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-400 shadow transition hover:text-brand-500">
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Corpo */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-brand-500">
                      {b.name}
                    </h3>

                    {b.description && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
                        {b.description}
                      </p>
                    )}

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="truncate">{b.location}</span>
                      </div>
                      {b.whatsapp && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                          <span>{b.whatsapp}</span>
                        </div>
                      )}
                    </div>

                    <div className="my-4 border-t border-slate-100" />

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">Gravatá, PE</span>
                      <div className="flex items-center gap-2">
                        {b.whatsapp && (
                          <button
                            onClick={() => openWhatsApp(b)}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-brand-500 hover:text-brand-500"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <Link
                          to={`/empresa/${b.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600"
                          title="Ver detalhes"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Controles do carrossel */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-5">
                {/* Dots */}
                <div className="flex items-center gap-2.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`cursor-pointer rounded-full transition-all duration-300 ${
                        i === page
                          ? "h-3 w-3 bg-brand-500"
                          : "h-2.5 w-2.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Página ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Setas + ver todos */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-500 hover:text-brand-500"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => navigate("/resultados?local=Gravatá")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  >
                    Ver todas as empresas
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={next}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-500 hover:text-brand-500"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Se só tem uma página, mostra só o botão ver todos */}
            {totalPages <= 1 && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => navigate("/resultados?local=Gravatá")}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                >
                  Ver todas as empresas
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

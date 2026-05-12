import { useEffect, useState } from "react";
import { MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  mapSupabaseBusiness,
  type PublicBusiness,
} from "../../shared/businessMapper";

export default function FeaturedBusinesses() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedBusinesses() {
      setLoading(true);
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("status", "active")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        setBusinesses([]);
        setLoading(false);
        return;
      }
      setBusinesses((data || []).map(mapSupabaseBusiness));
      setLoading(false);
    }
    loadFeaturedBusinesses();
  }, []);

  function openWhatsApp(business: PublicBusiness) {
    if (!business.whatsapp) return;
    const msg = `Olá! Encontrei sua empresa no Conecta Gravatá.\n\n*Empresa:* ${business.name}\n*Local:* ${business.location}\n\nGostaria de mais informações.`;
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <section
      id="destaques"
      className="bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)] px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
              Destaques do portal
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Empresas com mais visibilidade em Gravatá
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              Negócios locais com presença fortalecida no portal para serem
              encontrados com mais rapidez por moradores e turistas.
            </p>
          </div>

          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">Carregando destaques...</p>
          </div>

        /* Empty */
        ) : businesses.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Nenhuma empresa em destaque ainda</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Assim que você marcar empresas como destaque no admin, elas vão aparecer aqui automaticamente.
            </p>
          </div>

        /* Grid */
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {businesses.map((business) => (
              <article
                key={business.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-sm shadow-orange-100/50 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
              >
                {/* Image */}
                <div className="relative h-48 shrink-0 overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/5 to-transparent" />

                  {/* Destaque badge */}
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
                    ★ Destaque
                  </span>

                  {/* Categoria badge */}
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
                    {business.category}
                  </span>
                </div>

                {/* Content — flex-1 garante que o botão sempre fica embaixo */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold leading-snug text-slate-900">
                    {business.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{business.location}</span>
                  </div>

                  {business.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {business.description}
                    </p>
                  )}

                  {/* Botões sempre no rodapé do card */}
                  <div className="mt-auto flex gap-2 pt-5">
                    <Link
                      to={`/empresa/${business.id}`}
                      className="flex flex-1 items-center justify-center rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      Ver detalhes
                    </Link>

                    {business.whatsapp && (
                      <button
                        onClick={() => openWhatsApp(business)}
                        title="Abrir WhatsApp"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-green-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

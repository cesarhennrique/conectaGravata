import { MapPin, Phone, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type ResultCardProps = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  plan: "premium" | "pro" | "basic";
  whatsapp: string;
  isOpenNow: boolean;
};

export default function ResultCard({
  id, name, category, location, image, description, plan, whatsapp, isOpenNow,
}: ResultCardProps) {
  const isPremium = plan === "premium";

  function handleWhatsApp() {
    if (!whatsapp) return;
    const msg = `Olá! Encontrei sua empresa no Conecta Gravatá.\n\n*Empresa:* ${name}\n*Local:* ${location}\n\nGostaria de mais informações.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Imagem */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Badges topo esquerdo */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow">
              ★ Destaque
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Badge open/closed topo direito */}
        <span className={`absolute right-3 top-3 rounded-sm px-2.5 py-1 text-xs font-bold text-white shadow ${isOpenNow ? "bg-green-500" : "bg-red-500"}`}>
          {isOpenNow ? "Aberto" : "Fechado"}
        </span>

        {/* Coração */}
        <button className="absolute bottom-3 right-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-slate-400 shadow transition hover:text-brand-500">
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Corpo */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-slate-900 transition group-hover:text-brand-500">
          {name}
        </h3>

        {description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
            <span className="truncate">{location}</span>
          </div>
          {whatsapp && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone className="h-3.5 w-3.5 shrink-0 text-brand-500" />
              <span>{whatsapp}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Rodapé */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800">Gravatá, PE</span>
          <div className="flex items-center gap-2">
            {whatsapp && (
              <button
                onClick={handleWhatsApp}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-green-500 hover:text-green-500"
                title="WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
            )}
            <Link
              to={`/empresa/${id}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600"
              title="Ver detalhes"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

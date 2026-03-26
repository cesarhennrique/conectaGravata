import { MapPin } from "lucide-react";
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
};

export default function ResultCard({
  id,
  name,
  category,
  location,
  image,
  description,
  plan,
  whatsapp,
}: ResultCardProps) {
  const isPremium = plan === "premium";

  function handleWhatsAppClick() {
    const mensagem = `
Olá! Encontrei sua empresa no Conecta Gravatá.

*Empresa:* ${name}
*Local:* ${location}

Gostaria de mais informações.
    `.trim();

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  }

  return (
    <article
      className={`rounded-3xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
        isPremium
          ? "border-orange-300 ring-1 ring-orange-100"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative h-48 w-full overflow-hidden rounded-2xl md:h-40 md:w-60">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />

          {isPremium && (
            <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Destaque
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{category}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{name}</h3>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Link
              to={`/empresa/${id}`}
              className={`rounded-2xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                isPremium
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-slate-900 hover:opacity-90"
              }`}
            >
              Ver detalhes
            </Link>

            <button
              onClick={handleWhatsAppClick}
              className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
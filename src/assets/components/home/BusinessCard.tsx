import { MapPin, Star, MessageCircle } from "lucide-react";

type Props = {
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  plan?: "basic" | "pro" | "premium";
};

export default function BusinessCard({
  name,
  category,
  location,
  image,
  rating,
  plan = "basic",
}: Props) {
  const isPremium = plan === "premium";
  const isPro = plan === "pro";

  return (
    <article
      className={`
        group overflow-hidden rounded-[26px] border bg-white transition duration-300
        hover:-translate-y-1 hover:shadow-xl

        ${isPremium ? "md:col-span-2 border-orange-200 shadow-md" : ""}
        ${isPro ? "border-slate-300" : "border-slate-200"}
      `}
    >
      {/* IMAGEM */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* BADGE */}
        {isPremium && (
          <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Destaque
          </span>
        )}

        {isPro && !isPremium && (
          <span className="absolute left-4 top-4 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Pro
          </span>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-slate-500">{category}</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <Star className="h-4 w-4 fill-current" />
            {rating}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="h-4 w-4" />
          {location}
        </div>

        {/* DIFERENCIAL PREMIUM */}
        {isPremium && (
          <p className="mt-3 text-sm text-slate-600">
            Experiência diferenciada com atendimento premium e destaque no portal.
          </p>
        )}

        {/* BOTÕES */}
        <div className="mt-5 flex items-center gap-2">
          <button
            className={`
              flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white
              ${isPremium ? "bg-orange-500 hover:bg-orange-600" : "bg-slate-900"}
            `}
          >
            Ver detalhes
          </button>

          <button className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50">
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
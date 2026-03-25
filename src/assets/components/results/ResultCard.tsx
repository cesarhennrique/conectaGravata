import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

type ResultCardProps = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  description: string;
};

export default function ResultCard({
  id,
  name,
  category,
  location,
  image,
  rating,
  description,
}: ResultCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="h-48 w-full overflow-hidden rounded-2xl md:h-40 md:w-60">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{category}</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{name}</h3>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-600">
                <Star className="h-4 w-4 fill-current" />
                {rating.toFixed(1)}
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
              className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Ver detalhes
            </Link>

            <a  href={`https://wa.me/5581999999999?text=Olá! Vi sua empresa no Conecta Gravatá e quero mais informações.`}>
              <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
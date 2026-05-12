import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const photos = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop",
  "/hero-gravata-mobile.webp",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&auto=format&fit=crop",
];

export default function MobileExploreCard() {
  const navigate = useNavigate();

  return (
    <div className="mx-4 -mt-4 overflow-hidden rounded-3xl bg-slate-900 md:hidden">
      <div className="relative flex items-center justify-between p-5">
        {/* Texto */}
        <div className="flex-1 pr-4">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-400">Explore Gravatá</p>
          <h3 className="mt-1.5 text-lg font-extrabold leading-snug text-white">
            Roteiros incríveis para viver o melhor da cidade!
          </h3>
          <button
            onClick={() => navigate("/resultados?local=Gravatá")}
            className="mt-4 flex cursor-pointer items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-brand-600"
          >
            Ver roteiros <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Polaroids */}
        <div className="relative h-28 w-28 shrink-0">
          <div className="absolute right-8 top-0 h-20 w-16 -rotate-6 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg">
            <img src={photos[0]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-2 top-3 h-20 w-16 rotate-3 overflow-hidden rounded-lg border-2 border-white bg-white shadow-xl">
            <img src={photos[1]} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="absolute right-6 top-8 h-20 w-16 -rotate-2 overflow-hidden rounded-lg border-2 border-white bg-white shadow-lg">
            <img src={photos[2]} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

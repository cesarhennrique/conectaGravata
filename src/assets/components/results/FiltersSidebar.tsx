/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams, useNavigate } from "react-router-dom";

const categories = [
  "Restaurante",
  "Pousada",
  "Cafeteria",
  "Serviços",
  "Beleza",
  "Moda",
];

const prices = ["R$", "R$$", "R$$$", "R$$$$"];

export default function FiltersSidebar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get("categoria") || "";
  const selectedPrice = searchParams.get("preco") || "";
  const openNow = searchParams.get("aberto") === "true";
  const acceptCard = searchParams.get("cartao") === "true";
  const familyFriendly = searchParams.get("familia") === "true";

  function updateParam(key: string, value: string | boolean) {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    navigate(`/resultados?${params.toString()}`);
  }

  return (
    <aside className="hidden w-full max-w-[260px] shrink-0 lg:block">
      <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Filtros</h2>

          <button
            onClick={() => navigate("/resultados")}
            className="text-xs font-medium text-orange-500 transition hover:text-orange-600"
          >
            Limpar
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Categoria</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() =>
                    updateParam(
                      "categoria",
                      active ? "" : category
                    )
                  }
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Faixa de preço</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {prices.map((price) => {
              const active = selectedPrice === price;

              return (
                <button
                  key={price}
                  onClick={() => updateParam("preco", active ? "" : price)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {price}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Sugestões</h3>

          <div className="mt-3 space-y-3 text-sm text-slate-600">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={openNow}
                onChange={(e) => updateParam("aberto", e.target.checked)}
                className="rounded border-slate-300"
              />
              Aberto agora
            </label>

      
          </div>
        </div>
      </div>
    </aside>
  );
}
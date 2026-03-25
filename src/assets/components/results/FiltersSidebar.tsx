const categories = [
  "Restaurantes",
  "Cafeterias",
  "Pousadas",
  "Serviços",
  "Beleza",
];

export default function FiltersSidebar() {
  return (
    <aside className="hidden w-full max-w-[260px] shrink-0 lg:block">
      <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Filtros</h2>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Categoria</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Faixa de preço</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {["R$", "R$$", "R$$$", "R$$$$"].map((price) => (
              <button
                key={price}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-900">Sugestões</h3>

          <div className="mt-3 space-y-3 text-sm text-slate-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300" />
              Aberto agora
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300" />
              Aceita cartão
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300" />
              Bom para famílias
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
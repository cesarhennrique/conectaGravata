export default function MapPreview() {
  return (
    <aside className="hidden w-full max-w-[360px] shrink-0 xl:block">
      <div className="sticky top-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Mapa da região</h2>
          <button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
            Atualizar
          </button>
        </div>

        <div className="relative h-[720px] bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop"
            alt="Mapa"
            className="h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-white/20" />

          <div className="absolute left-8 top-20 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-lg">
            1
          </div>
          <div className="absolute right-10 top-40 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-lg">
            2
          </div>
          <div className="absolute bottom-28 left-20 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-lg">
            3
          </div>
        </div>
      </div>
    </aside>
  );
}
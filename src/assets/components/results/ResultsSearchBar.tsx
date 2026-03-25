import { Search, MapPin } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ResultsSearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(
    searchParams.get("local") || "Gravatá - PE"
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchParams.get("q") || "");
    setLocation(searchParams.get("local") || "Gravatá - PE");
  }, [searchParams]);

  function handleSearch() {
    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query);
    if (location.trim()) params.set("local", location);

    navigate(`/resultados?${params.toString()}`);
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:px-6">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm outline-none md:text-base"
            placeholder="O que você procura?"
          />
        </div>

        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <MapPin className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm outline-none md:text-base"
            placeholder="Localização"
          />
        </div>

        <button
          onClick={handleSearch}
          className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Buscar
        </button>
      </div>
    </section>
  );
}
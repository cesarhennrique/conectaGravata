import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export type HoursSlot = {
  days: string;
  open: string;
  close: string;
  closed: boolean;
};

type Props = {
  value: string;
  onChange: (json: string) => void;
};

const DAY_PRESETS = [
  "Seg–Sex",
  "Seg–Sáb",
  "Sáb",
  "Dom",
  "Sáb–Dom",
  "Seg–Dom",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Feriados",
];

function parse(value: string): HoursSlot[] {
  if (!value) return [{ days: "Seg–Sex", open: "08:00", close: "18:00", closed: false }];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // legacy plain text — convert to single slot
    return [{ days: "Horário", open: "08:00", close: "18:00", closed: false }];
  }
  return [];
}

export default function HoursEditor({ value, onChange }: Props) {
  const [slots, setSlots] = useState<HoursSlot[]>(() => parse(value));

  useEffect(() => {
    onChange(JSON.stringify(slots));
  }, [slots]);

  function update(index: number, patch: Partial<HoursSlot>) {
    setSlots((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function addSlot() {
    setSlots((prev) => [...prev, { days: "Sáb", open: "08:00", close: "13:00", closed: false }]);
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {slots.map((slot, i) => (
        <div
          key={i}
          className={`flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 transition ${
            slot.closed ? "border-slate-100 bg-slate-50" : "border-slate-200 bg-white"
          }`}
        >
          {/* Dias */}
          <div className="flex-1 min-w-[120px]">
            <select
              value={slot.days}
              onChange={(e) => update(i, { days: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
            >
              {DAY_PRESETS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
              <option value={slot.days}>{slot.days}</option>
            </select>
          </div>

          {/* Fechado toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-500 select-none">
            <input
              type="checkbox"
              checked={slot.closed}
              onChange={(e) => update(i, { closed: e.target.checked })}
              className="h-3.5 w-3.5 accent-red-500"
            />
            Fechado
          </label>

          {/* Horários */}
          {!slot.closed && (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={slot.open}
                  onChange={(e) => update(i, { open: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
                />
                <span className="text-xs text-slate-400">às</span>
                <input
                  type="time"
                  value={slot.close}
                  onChange={(e) => update(i, { close: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400"
                />
              </div>
            </>
          )}

          {/* Remove */}
          {slots.length > 1 && (
            <button
              type="button"
              onClick={() => removeSlot(i)}
              className="ml-auto rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addSlot}
        className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-brand-300 hover:text-brand-500"
      >
        <Plus className="h-4 w-4" />
        Adicionar outro período
      </button>

      {/* Preview */}
      <div className="rounded-xl bg-slate-50 px-4 py-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Prévia</p>
        <div className="space-y-1">
          {slots.map((s, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{s.days}</span>
              <span className={s.closed ? "text-red-500" : "text-slate-600"}>
                {s.closed ? "Fechado" : `${s.open} – ${s.close}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

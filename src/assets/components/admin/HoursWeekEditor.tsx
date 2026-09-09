import { useState } from "react";
import { Copy } from "lucide-react";
import {
  DAY_ORDER,
  DAY_LABELS,
  type DayKey,
  type DaySchedule,
  type WeekSchedule,
  parseHoursText,
  serializeSchedule,
  emptyWeekSchedule,
} from "../../shared/publicBusinessHours";

type Props = {
  value: string;
  onChange: (json: string) => void;
};

const WEEKDAYS: DayKey[] = ["tue", "wed", "thu", "fri"];

export default function HoursWeekEditor({ value, onChange }: Props) {
  const [schedule, setSchedule] = useState<WeekSchedule>(
    () => parseHoursText(value) ?? emptyWeekSchedule()
  );

  function updateDay(day: DayKey, patch: Partial<DaySchedule>) {
    setSchedule((prev) => {
      const next = { ...prev, [day]: { ...prev[day], ...patch } };
      onChange(serializeSchedule(next));
      return next;
    });
  }

  function copyMondayToWeekdays() {
    setSchedule((prev) => {
      const monday = prev.mon;
      const next = { ...prev };
      for (const day of WEEKDAYS) next[day] = { ...monday };
      onChange(serializeSchedule(next));
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {DAY_ORDER.map((day) => {
        const d = schedule[day];
        return (
          <div
            key={day}
            className={`flex flex-col gap-3 rounded-xl border px-4 py-3 transition sm:flex-row sm:items-center sm:gap-4 ${
              d.open ? "border-slate-200 bg-white" : "border-slate-100 bg-slate-50"
            }`}
          >
            <span className="w-32 shrink-0 text-sm font-medium text-slate-700">
              {DAY_LABELS[day]}
            </span>

            <label className="flex items-center gap-2 text-sm text-slate-500 select-none">
              <input
                type="checkbox"
                checked={d.open}
                onChange={(e) => updateDay(day, { open: e.target.checked })}
                className="h-3.5 w-3.5 accent-brand-500"
              />
              Aberto
            </label>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">De</span>
              <input
                type="time"
                value={d.from}
                disabled={!d.open}
                onChange={(e) => updateDay(day, { from: e.target.value })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
              />
              <span className="text-xs text-slate-400">Até</span>
              <input
                type="time"
                value={d.to}
                disabled={!d.open}
                onChange={(e) => updateDay(day, { to: e.target.value })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-brand-400 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={copyMondayToWeekdays}
        className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-brand-300 hover:text-brand-500"
      >
        <Copy className="h-4 w-4" />
        Copiar horário de segunda para os dias úteis (terça a sexta)
      </button>
    </div>
  );
}

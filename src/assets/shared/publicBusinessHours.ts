import type { PublicBusiness } from "./businessMapper";

// ─────────────────────────────────────────────────────────────────────────
// Fonte oficial de tipos e regras de horário de funcionamento.
// Persistido no banco na coluna `hours_text` (texto), sempre como JSON.
//
// Formato novo (canônico, usado a partir desta versão):
//   {
//     "mon": { "open": true, "from": "08:00", "to": "18:00" },
//     "tue": { "open": true, "from": "08:00", "to": "18:00" },
//     ...
//   }
//
// Formatos legados ainda suportados na LEITURA (registros antigos):
//   - Array de períodos: [{ days: "Seg–Sex", open: "08:00", close: "18:00", closed: false }, ...]
//   - Texto livre (string simples, não-JSON) — exibido como está, sem estrutura.
// ─────────────────────────────────────────────────────────────────────────

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type DaySchedule = {
  open: boolean;
  from: string; // "HH:mm"
  to: string; // "HH:mm"
};

export type WeekSchedule = Record<DayKey, DaySchedule>;

export const DAY_ORDER: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const DAY_LABELS: Record<DayKey, string> = {
  mon: "Segunda-feira",
  tue: "Terça-feira",
  wed: "Quarta-feira",
  thu: "Quinta-feira",
  fri: "Sexta-feira",
  sat: "Sábado",
  sun: "Domingo",
};

export const DAY_LABELS_SHORT: Record<DayKey, string> = {
  mon: "Seg",
  tue: "Ter",
  wed: "Qua",
  thu: "Qui",
  fri: "Sex",
  sat: "Sáb",
  sun: "Dom",
};

function emptyDay(): DaySchedule {
  return { open: false, from: "", to: "" };
}

export function emptyWeekSchedule(): WeekSchedule {
  return DAY_ORDER.reduce((acc, day) => {
    acc[day] = emptyDay();
    return acc;
  }, {} as WeekSchedule);
}

// Mapeamento dos rótulos de dia usados no formato legado (array de períodos)
// para as chaves do novo formato.
const LEGACY_DAY_MAP: Record<string, DayKey[]> = {
  "segunda": ["mon"],
  "terça": ["tue"],
  "terca": ["tue"],
  "quarta": ["wed"],
  "quinta": ["thu"],
  "sexta": ["fri"],
  "sábado": ["sat"],
  "sabado": ["sat"],
  "sáb": ["sat"],
  "sab": ["sat"],
  "domingo": ["sun"],
  "dom": ["sun"],
  "seg–sex": ["mon", "tue", "wed", "thu", "fri"],
  "seg-sex": ["mon", "tue", "wed", "thu", "fri"],
  "seg–sáb": ["mon", "tue", "wed", "thu", "fri", "sat"],
  "seg-sab": ["mon", "tue", "wed", "thu", "fri", "sat"],
  "sáb–dom": ["sat", "sun"],
  "sab-dom": ["sat", "sun"],
  "seg–dom": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  "seg-dom": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  "feriados": [],
};

function isWeekScheduleObject(value: unknown): value is Record<string, Partial<DaySchedule>> {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    DAY_ORDER.some((day) => day in (value as object))
  );
}

/**
 * Faz o parse de `hours_text` (qualquer formato já salvo no banco) para a
 * estrutura canônica por dia da semana. Retorna `null` quando o conteúdo é
 * texto livre não estruturado (formato legado mais antigo) — nesse caso não
 * há como preencher o editor por dia, mas o texto ainda pode ser exibido
 * publicamente via `formatHoursSlots`.
 */
export function parseHoursText(raw: string | null | undefined): WeekSchedule | null {
  if (!raw?.trim()) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null; // texto livre legado
  }

  if (isWeekScheduleObject(parsed)) {
    const schedule = emptyWeekSchedule();
    for (const day of DAY_ORDER) {
      const value = (parsed as Record<string, Partial<DaySchedule>>)[day];
      if (value) {
        schedule[day] = {
          open: !!value.open,
          from: value.from ?? "",
          to: value.to ?? "",
        };
      }
    }
    return schedule;
  }

  if (Array.isArray(parsed)) {
    const schedule = emptyWeekSchedule();
    for (const slot of parsed) {
      if (!slot || typeof slot !== "object") continue;
      const key = String((slot as { days?: string }).days ?? "").toLowerCase().trim();
      const days = LEGACY_DAY_MAP[key] ?? [];
      const closed = !!(slot as { closed?: boolean }).closed;
      const open = (slot as { open?: string }).open ?? "";
      const close = (slot as { close?: string }).close ?? "";
      for (const day of days) {
        schedule[day] = { open: !closed, from: open, to: close };
      }
    }
    return schedule;
  }

  return null;
}

/** Serializa a estrutura por dia para o formato canônico salvo em `hours_text`. */
export function serializeSchedule(schedule: WeekSchedule): string {
  return JSON.stringify(schedule);
}

export type ScheduleValidationError = { day: DayKey; message: string };

/**
 * Valida a estrutura antes de salvar: um dia marcado como aberto precisa ter
 * horário inicial e final preenchidos, e eles não podem ser iguais. Horário
 * final menor que o inicial é permitido (funcionamento após a meia-noite).
 */
export function validateSchedule(schedule: WeekSchedule): ScheduleValidationError[] {
  const errors: ScheduleValidationError[] = [];
  for (const day of DAY_ORDER) {
    const d = schedule[day];
    if (!d.open) continue;
    if (!d.from || !d.to) {
      errors.push({ day, message: `${DAY_LABELS[day]}: informe o horário de abertura e de fechamento.` });
      continue;
    }
    if (d.from === d.to) {
      errors.push({ day, message: `${DAY_LABELS[day]}: o horário final deve ser diferente do inicial.` });
    }
  }
  return errors;
}

function toMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + (minute || 0);
}

function sameDaySchedule(a: DaySchedule, b: DaySchedule): boolean {
  return a.open === b.open && a.from === b.from && a.to === b.to;
}

/** Data/hora atual no fuso de Gravatá-PE (America/Recife), não o fuso do navegador. */
function getRecifeNowParts(): { dayKey: DayKey; minutes: number } {
  const now = new Date();

  const weekdayText = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Recife",
  })
    .format(now)
    .toLowerCase();

  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "America/Recife",
    }).format(now)
  );

  const minute = Number(
    new Intl.DateTimeFormat("en-GB", {
      minute: "2-digit",
      timeZone: "America/Recife",
    }).format(now)
  );

  const weekdayMap: Record<string, DayKey> = {
    sun: "sun",
    mon: "mon",
    tue: "tue",
    wed: "wed",
    thu: "thu",
    fri: "fri",
    sat: "sat",
  };

  return {
    dayKey: weekdayMap[weekdayText] ?? "mon",
    minutes: hour * 60 + minute,
  };
}

/**
 * Verifica se o horário de um dia está "aberto" no minuto informado,
 * considerando que um período pode atravessar a meia-noite (ex: 18:00–02:00).
 * Também checa se o período do dia anterior "vazou" para o dia atual.
 */
function isOpenAtMinute(schedule: WeekSchedule, dayKey: DayKey, minutes: number): boolean {
  const today = schedule[dayKey];
  if (today.open && today.from && today.to) {
    const openMin = toMinutes(today.from);
    const closeMin = toMinutes(today.to);
    if (closeMin > openMin) {
      if (minutes >= openMin && minutes < closeMin) return true;
    } else if (closeMin < openMin) {
      // vira a madrugada: a partir da abertura até a meia-noite já conta como aberto
      if (minutes >= openMin) return true;
    }
  }

  const prevDay = DAY_ORDER[(DAY_ORDER.indexOf(dayKey) + DAY_ORDER.length - 1) % DAY_ORDER.length];
  const yesterday = schedule[prevDay];
  if (yesterday.open && yesterday.from && yesterday.to) {
    const openMin = toMinutes(yesterday.from);
    const closeMin = toMinutes(yesterday.to);
    if (closeMin < openMin && minutes < closeMin) return true; // ainda dentro do período que começou ontem
  }

  return false;
}

/**
 * Retorna se a empresa está aberta agora, sempre com base no horário de
 * Gravatá-PE (America/Recife). Empresas sem horário estruturado (texto livre
 * legado ou sem `hours_text`) são consideradas abertas por padrão, mantendo
 * o comportamento anterior.
 */
export function isPublicBusinessOpenNow(business: Pick<PublicBusiness, "hours">): boolean {
  const schedule = parseHoursText(business.hours);
  if (!schedule) return true;

  const { dayKey, minutes } = getRecifeNowParts();
  return isOpenAtMinute(schedule, dayKey, minutes);
}

/**
 * Formata os horários para exibição pública, agrupando dias consecutivos
 * com o mesmo horário (ex: "Seg – Sex: 08:00 – 18:00").
 */
export function formatHoursSlots(raw: string | undefined): { days: string; time: string; closed: boolean }[] {
  const schedule = parseHoursText(raw);

  if (!schedule) {
    return raw ? [{ days: "Horário", time: raw, closed: false }] : [];
  }

  const groups: { days: string; time: string; closed: boolean }[] = [];
  let i = 0;
  while (i < DAY_ORDER.length) {
    const day = DAY_ORDER[i];
    const d = schedule[day];
    let j = i;
    while (j + 1 < DAY_ORDER.length && sameDaySchedule(schedule[DAY_ORDER[j + 1]], d)) {
      j++;
    }
    const startLabel = DAY_LABELS_SHORT[day];
    const endLabel = DAY_LABELS_SHORT[DAY_ORDER[j]];
    const daysLabel = i === j ? startLabel : `${startLabel} – ${endLabel}`;
    const time = d.open && d.from && d.to ? `${d.from} – ${d.to}` : "Fechado";
    groups.push({ days: daysLabel, time, closed: !d.open });
    i = j + 1;
  }
  return groups;
}

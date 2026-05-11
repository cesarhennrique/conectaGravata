import type { PublicBusiness } from "./businessMapper";

type HoursSlot = { days: string; open: string; close: string; closed: boolean };

function parseHours(raw: string | undefined): HoursSlot[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as HoursSlot[];
  } catch {
    // legacy plain text
  }
  return null;
}

export function isPublicBusinessOpenNow(business: PublicBusiness): boolean {
  const slots = parseHours(business.hours);
  if (!slots) return true;

  const now = new Date();
  const day = now.getDay(); // 0=Dom, 1=Seg...6=Sab
  const hhmm = now.getHours() * 60 + now.getMinutes();

  const DAY_MAP: Record<string, number[]> = {
    "segunda": [1], "terça": [2], "quarta": [3], "quinta": [4], "sexta": [5],
    "sáb": [6], "sab": [6], "dom": [0],
    "seg–sex": [1, 2, 3, 4, 5],
    "seg-sex": [1, 2, 3, 4, 5],
    "seg–sáb": [1, 2, 3, 4, 5, 6],
    "seg-sab": [1, 2, 3, 4, 5, 6],
    "sáb–dom": [6, 0], "sab-dom": [6, 0],
    "seg–dom": [0, 1, 2, 3, 4, 5, 6],
    "seg-dom": [0, 1, 2, 3, 4, 5, 6],
    "feriados": [],
  };

  for (const slot of slots) {
    const key = slot.days.toLowerCase();
    const days = DAY_MAP[key] ?? [];
    if (!days.includes(day)) continue;
    if (slot.closed) return false;
    const [oh, om] = slot.open.split(":").map(Number);
    const [ch, cm] = slot.close.split(":").map(Number);
    const openMin = oh * 60 + om;
    const closeMin = ch * 60 + cm;
    return hhmm >= openMin && hhmm < closeMin;
  }

  return true;
}

export function formatHoursSlots(raw: string | undefined): { days: string; time: string; closed: boolean }[] {
  const slots = parseHours(raw);
  if (!slots) return raw ? [{ days: "Horário", time: raw, closed: false }] : [];
  return slots.map((s) => ({
    days: s.days,
    time: s.closed ? "Fechado" : `${s.open} – ${s.close}`,
    closed: s.closed,
  }));
}

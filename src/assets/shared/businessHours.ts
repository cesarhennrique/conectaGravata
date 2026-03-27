import type { Business, DayKey } from "../../data/businesses";

function toMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function getRecifeNowParts() {
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
    dayKey: weekdayMap[weekdayText],
    currentMinutes: hour * 60 + minute,
  };
}

export function isBusinessOpenNow(business: Business) {
  if (!business.schedule) {
    return business.openNow;
  }

  const { dayKey, currentMinutes } = getRecifeNowParts();
  const todaySchedule = business.schedule[dayKey];

  if (!todaySchedule) {
    return false;
  }

  const openMinutes = toMinutes(todaySchedule.open);
  const closeMinutes = toMinutes(todaySchedule.close);

  if (closeMinutes >= openMinutes) {
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }

  return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
}
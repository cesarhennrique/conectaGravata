import type { PublicBusiness } from "./businessMapper";

export function isPublicBusinessOpenNow(business: PublicBusiness) {
  if (!business.hours) return true;

  const text = business.hours.toLowerCase();

  if (text.includes("24 horas")) return true;

  return true;
}
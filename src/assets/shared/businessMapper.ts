export type PublicBusiness = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  gallery: string[];
  description: string;
  priceLevel: string;
  plan: "premium" | "pro" | "basic";
  whatsapp: string;
  instagram?: string;
  hours?: string;
  featured: boolean;
  status: string;
  dueDate?: string | null;
};

function parseImageUrl(raw: string | null): { image: string; gallery: string[] } {
  const fallback = "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=1200&auto=format&fit=crop";
  if (!raw?.trim()) return { image: fallback, gallery: [] };
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return { image: parsed[0], gallery: parsed };
    }
  } catch {
    // not JSON, treat as plain URL
  }
  return { image: raw.trim(), gallery: [raw.trim()] };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSupabaseBusiness(row: any): PublicBusiness {
  const { image, gallery } = parseImageUrl(row.image_url);
  return {
    id: row.id,
    name: row.name ?? "",
    category: row.category ?? "",
    location: row.location ?? "",
    image,
    gallery,
    description: row.description ?? "",
    priceLevel: row.price_level ?? "R$",
    plan: row.plan ?? "basic",
    whatsapp: row.whatsapp ?? "",
    instagram: row.instagram ?? "",
    hours: row.hours_text ?? "",
    featured: row.featured ?? false,
    status: row.status ?? "active",
    dueDate: row.due_date ?? null,
  };
}
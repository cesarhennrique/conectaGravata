export type BusinessStatus = "active" | "pending" | "inactive" | "expired";

type StatusInput = {
  status: string;
  due_date: string | null;
};

/**
 * Verifica se uma data de vencimento (YYYY-MM-DD) já passou em relação a hoje.
 */
export function isExpired(dueDate: string | null | undefined): boolean {
  if (!dueDate) return false;
  const today = new Date();
  const cur = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return new Date(`${dueDate}T00:00:00`) < cur;
}

/**
 * Retorna o status efetivo de uma empresa, considerando o status salvo
 * e se a data de vencimento já expirou (uma empresa "active" com due_date
 * vencido deve ser exibida como "expired").
 */
export function getEffectiveStatus(business: StatusInput): BusinessStatus {
  if (business.status === "active" && isExpired(business.due_date)) {
    return "expired";
  }
  return (business.status as BusinessStatus) ?? "active";
}

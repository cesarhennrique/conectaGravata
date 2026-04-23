import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

type DashboardRow = {
  id: number;
  plan: string;
  status: string;
  due_date: string | null;
  featured: boolean;
};

function isExpired(dueDate: string | null) {
  if (!dueDate) return false;

  const today = new Date();
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const due = new Date(`${dueDate}T00:00:00`);

  return due < currentDate;
}

export default function AdminDashboard() {
  const [rows, setRows] = useState<DashboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("businesses")
        .select("id, plan, status, due_date, featured");

      if (error) {
        setErrorMessage("Erro ao carregar métricas do painel.");
        setLoading(false);
        return;
      }

      setRows(data || []);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  const metrics = useMemo(() => {
    const total = rows.length;
    const premium = rows.filter((row) => row.plan === "premium").length;
    const pro = rows.filter((row) => row.plan === "pro").length;
    const basic = rows.filter((row) => row.plan === "basic").length;

    const active = rows.filter((row) => row.status === "active").length;
    const inactive = rows.filter((row) => row.status === "inactive").length;
    const pending = rows.filter((row) => row.status === "pending").length;

    const featured = rows.filter((row) => row.featured).length;
    const expired = rows.filter(
      (row) => row.status === "expired" || isExpired(row.due_date)
    ).length;

    return {
      total,
      premium,
      pro,
      basic,
      active,
      inactive,
      pending,
      featured,
      expired,
    };
  }, [rows]);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">Carregando métricas...</p>
        </div>
      ) : errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total de empresas
              </p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {metrics.total}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Premium</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {metrics.premium}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Pro</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {metrics.pro}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Basic</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                {metrics.basic}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Ativas</p>
              <p className="mt-3 text-3xl font-bold text-emerald-600">
                {metrics.active}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Pendentes</p>
              <p className="mt-3 text-3xl font-bold text-amber-600">
                {metrics.pending}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Vencidas</p>
              <p className="mt-3 text-3xl font-bold text-red-600">
                {metrics.expired}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Em destaque</p>
              <p className="mt-3 text-3xl font-bold text-orange-500">
                {metrics.featured}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Resumo operacional
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-500">Inativas</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {metrics.inactive}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-500">
                  Empresas com plano pago
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {metrics.premium + metrics.pro}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-500">
                  Empresas básicas
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {metrics.basic}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
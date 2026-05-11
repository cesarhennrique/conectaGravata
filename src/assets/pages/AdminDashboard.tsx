import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";
import {
  Building2,
  Crown,
  Zap,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  ArrowRight,
  Filter,
} from "lucide-react";

type DashboardRow = {
  id: number;
  name: string;
  category: string;
  plan: string;
  status: string;
  due_date: string | null;
  featured: boolean;
};

function isExpired(dueDate: string | null) {
  if (!dueDate) return false;
  const today = new Date();
  const cur = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return new Date(`${dueDate}T00:00:00`) < cur;
}

const PLAN_PRICE: Record<string, number> = { premium: 197, pro: 97, basic: 0 };

const PLAN_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  premium: { label: "Premium", color: "text-amber-600", bg: "bg-amber-50" },
  pro: { label: "Pro", color: "text-violet-600", bg: "bg-violet-50" },
  basic: { label: "Basic", color: "text-slate-600", bg: "bg-slate-100" },
};

const STATUS_LABELS: Record<string, { label: string; dot: string }> = {
  active: { label: "Ativa", dot: "bg-emerald-500" },
  pending: { label: "Pendente", dot: "bg-amber-400" },
  inactive: { label: "Inativa", dot: "bg-slate-400" },
  expired: { label: "Vencida", dot: "bg-red-500" },
};

const CATEGORIES = [
  "Todos",
  "Alimentação",
  "Saúde",
  "Educação",
  "Serviços",
  "Comércio",
  "Turismo",
  "Outros",
];

export default function AdminDashboard() {
  const [rows, setRows] = useState<DashboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCat, setFilterCat] = useState("Todos");
  const [filterPlan, setFilterPlan] = useState("Todos");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("businesses")
        .select("id, name, category, plan, status, due_date, featured");
      if (err) { setError("Erro ao carregar dados."); setLoading(false); return; }
      setRows(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const m = useMemo(() => {
    const total = rows.length;
    const premium = rows.filter((r) => r.plan === "premium").length;
    const pro = rows.filter((r) => r.plan === "pro").length;
    const basic = rows.filter((r) => r.plan === "basic").length;
    const active = rows.filter((r) => r.status === "active").length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const inactive = rows.filter((r) => r.status === "inactive").length;
    const expired = rows.filter((r) => r.status === "expired" || isExpired(r.due_date)).length;
    const featured = rows.filter((r) => r.featured).length;
    const mrr = rows.reduce((acc, r) => acc + (PLAN_PRICE[r.plan] ?? 0), 0);
    const paidPct = total > 0 ? Math.round(((premium + pro) / total) * 100) : 0;
    return { total, premium, pro, basic, active, pending, inactive, expired, featured, mrr, paidPct };
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const catOk = filterCat === "Todos" || r.category === filterCat;
      const planOk = filterPlan === "Todos" || r.plan === filterPlan;
      return catOk && planOk;
    });
  }, [rows, filterCat, filterPlan]);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <AdminLayout title="Overview">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">{greeting}, Admin 👋</h2>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe as métricas e gerencie as empresas do portal.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-500">Carregando dados...</p>
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      ) : (
        <>
          {/* Top row: big metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Total de empresas</p>
                  <p className="mt-2 text-4xl font-bold text-slate-900">{m.total}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="h-3 w-3" /> cadastradas no portal
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 p-3">
                  <Building2 className="h-5 w-5 text-slate-600" />
                </div>
              </div>
            </div>

            {/* MRR */}
            <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-sm shadow-orange-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange-100">Receita Mensal (MRR)</p>
                  <p className="mt-2 text-4xl font-bold">
                    R${m.mrr.toLocaleString("pt-BR")}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-orange-100">
                    <TrendingUp className="h-3 w-3" /> {m.paidPct}% com plano pago
                  </p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Active */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Ativas</p>
                  <p className="mt-2 text-4xl font-bold text-emerald-600">{m.active}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <CheckCircle2 className="h-3 w-3" /> empresas ativas
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Pending + Expired */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Atenção</p>
                  <p className="mt-2 text-4xl font-bold text-red-500">{m.pending + m.expired}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <TrendingDown className="h-3 w-3 text-red-400" />
                    {m.pending} pendentes · {m.expired} vencidas
                  </p>
                </div>
                <div className="rounded-xl bg-red-50 p-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle: planos + status */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Planos */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Distribuição por plano</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">{m.total} total</span>
              </div>
              <div className="space-y-4">
                {[
                  { key: "premium", icon: Crown, count: m.premium, color: "bg-amber-500", label: "Premium", price: "R$197/mês" },
                  { key: "pro", icon: Zap, count: m.pro, color: "bg-violet-500", label: "Pro", price: "R$97/mês" },
                  { key: "basic", icon: Package, count: m.basic, color: "bg-slate-300", label: "Basic", price: "Gratuito" },
                ].map(({ key, icon: Icon, count, color, label, price }) => {
                  const pct = m.total > 0 ? Math.round((count / m.total) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-700">{label}</span>
                          <span className="text-xs text-slate-400">{price}</span>
                        </div>
                        <span className="font-semibold text-slate-900">{count} <span className="text-xs text-slate-400">({pct}%)</span></span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Status operacional</p>
                <Star className="h-4 w-4 text-amber-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Ativas", value: m.active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Pendentes", value: m.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Vencidas", value: m.expired, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
                  { label: "Em destaque", value: m.featured, icon: Star, color: "text-orange-500", bg: "bg-orange-50" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className={`rounded-xl p-4 ${bg}`}>
                    <div className={`flex items-center gap-2 ${color}`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
                    </div>
                    <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company list with filters */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-slate-800">Empresas cadastradas</p>
                <p className="text-xs text-slate-400">{filteredRows.length} resultado(s)</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Filter categoria */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <Filter className="h-3.5 w-3.5 text-slate-400" />
                  <select
                    value={filterCat}
                    onChange={(e) => setFilterCat(e.target.value)}
                    className="bg-transparent text-sm text-slate-600 outline-none"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Filter plano */}
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
                  <Filter className="h-3.5 w-3.5 text-slate-400" />
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="bg-transparent text-sm text-slate-600 outline-none"
                  >
                    {["Todos", "premium", "pro", "basic"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <Link
                  to="/admin/empresas/nova"
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <Plus className="h-4 w-4" />
                  Nova empresa
                </Link>
              </div>
            </div>

            {filteredRows.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                Nenhuma empresa encontrada com esses filtros.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left">
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Empresa</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Categoria</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Plano</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Status</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Vencimento</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.slice(0, 10).map((company) => {
                      const plan = PLAN_LABELS[company.plan] ?? { label: company.plan, color: "text-slate-600", bg: "bg-slate-100" };
                      const statusKey = (company.status === "active" && isExpired(company.due_date)) ? "expired" : company.status;
                      const status = STATUS_LABELS[statusKey] ?? { label: company.status, dot: "bg-slate-400" };
                      return (
                        <tr key={company.id} className="border-b border-slate-50 transition hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold text-orange-600">
                                {company.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-slate-900">{company.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{company.category}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${plan.bg} ${plan.color}`}>
                              {plan.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-slate-600">
                              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{company.due_date ?? "—"}</td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/admin/empresas/${company.id}/editar`}
                              className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600"
                            >
                              Ver <ArrowRight className="h-3 w-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredRows.length > 10 && (
                  <div className="border-t border-slate-100 p-4 text-center">
                    <Link to="/admin/empresas" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                      Ver todas as {filteredRows.length} empresas →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}

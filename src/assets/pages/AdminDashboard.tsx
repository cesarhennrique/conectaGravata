import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";
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
  AlertTriangle,
  BarChart3,
} from "lucide-react";

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
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const due = new Date(`${dueDate}T00:00:00`);
  return due < currentDate;
}

type StatCardProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
};

function StatCard({ label, value, icon: Icon, gradient, iconBg }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-sm ${gradient}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="mt-2 text-4xl font-bold">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
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
    const premium = rows.filter((r) => r.plan === "premium").length;
    const pro = rows.filter((r) => r.plan === "pro").length;
    const basic = rows.filter((r) => r.plan === "basic").length;
    const active = rows.filter((r) => r.status === "active").length;
    const inactive = rows.filter((r) => r.status === "inactive").length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const featured = rows.filter((r) => r.featured).length;
    const expired = rows.filter((r) => r.status === "expired" || isExpired(r.due_date)).length;
    const paidRate = total > 0 ? Math.round(((premium + pro) / total) * 100) : 0;
    return { total, premium, pro, basic, active, inactive, pending, featured, expired, paidRate };
  }, [rows]);

  if (loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Visão geral do portal">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-600">Carregando métricas...</p>
        </div>
      </AdminLayout>
    );
  }

  if (errorMessage) {
    return (
      <AdminLayout title="Dashboard" subtitle="Visão geral do portal">
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <p className="text-sm font-medium text-red-700">{errorMessage}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral do portal">
      {/* Planos */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-slate-400" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Empresas por plano</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total de empresas"
            value={metrics.total}
            icon={Building2}
            gradient="bg-gradient-to-br from-slate-800 to-slate-700 text-white"
            iconBg="bg-white/10"
          />
          <StatCard
            label="Premium"
            value={metrics.premium}
            icon={Crown}
            gradient="bg-gradient-to-br from-amber-500 to-orange-500 text-white"
            iconBg="bg-white/20"
          />
          <StatCard
            label="Pro"
            value={metrics.pro}
            icon={Zap}
            gradient="bg-gradient-to-br from-violet-600 to-purple-600 text-white"
            iconBg="bg-white/20"
          />
          <StatCard
            label="Basic"
            value={metrics.basic}
            icon={Package}
            gradient="bg-gradient-to-br from-slate-200 to-slate-100 text-slate-800"
            iconBg="bg-slate-300/50"
          />
        </div>
      </section>

      {/* Status */}
      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-slate-400" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">Status das empresas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Ativas"
            value={metrics.active}
            icon={CheckCircle2}
            gradient="bg-gradient-to-br from-emerald-500 to-green-500 text-white"
            iconBg="bg-white/20"
          />
          <StatCard
            label="Pendentes"
            value={metrics.pending}
            icon={Clock}
            gradient="bg-gradient-to-br from-amber-400 to-yellow-400 text-white"
            iconBg="bg-white/20"
          />
          <StatCard
            label="Vencidas"
            value={metrics.expired}
            icon={XCircle}
            gradient="bg-gradient-to-br from-red-500 to-rose-500 text-white"
            iconBg="bg-white/20"
          />
          <StatCard
            label="Em destaque"
            value={metrics.featured}
            icon={Star}
            gradient="bg-gradient-to-br from-orange-400 to-pink-500 text-white"
            iconBg="bg-white/20"
          />
        </div>
      </section>

      {/* Resumo */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Inativas</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{metrics.inactive}</p>
          <p className="mt-1 text-xs text-slate-400">empresas sem atividade</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Planos pagos</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{metrics.premium + metrics.pro}</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-orange-400 to-amber-500 transition-all"
              style={{ width: `${metrics.paidRate}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">{metrics.paidRate}% do total</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Empresas basic</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{metrics.basic}</p>
          <p className="mt-1 text-xs text-slate-400">cadastros gratuitos</p>
        </div>
      </section>
    </AdminLayout>
  );
}

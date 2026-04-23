import AdminLayout from "../components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total de empresas</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">--</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Planos Premium</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">--</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Ativas</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">--</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Vencidas</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">--</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Próximo passo</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          No próximo bloco, vamos conectar a tabela de empresas do Supabase e
          montar a listagem real do painel, com botão para criar, editar e excluir.
        </p>
      </div>
    </AdminLayout>
  );
}
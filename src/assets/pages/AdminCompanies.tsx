import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

type BusinessRow = {
  id: number;
  name: string;
  category: string;
  location: string;
  plan: string;
  status: string;
  due_date: string | null;
};

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<BusinessRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadCompanies() {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("businesses")
      .select("id, name, category, location, plan, status, due_date")
      .order("id", { ascending: false });

    if (error) {
      setErrorMessage("Erro ao carregar empresas.");
      setLoading(false);
      return;
    }

    setCompanies(data || []);
    setLoading(false);
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta empresa?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("businesses").delete().eq("id", id);

    if (error) {
      alert("Erro ao excluir empresa.");
      return;
    }

    loadCompanies();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCompanies();
  }, []);

  return (
    <AdminLayout title="Empresas">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          Gerencie as empresas e prestadores cadastrados no portal.
        </p>

        <Link
          to="/admin/empresas/nova"
          className="inline-flex rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Nova empresa
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-sm text-slate-600">Carregando empresas...</div>
        ) : errorMessage ? (
          <div className="p-6 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        ) : companies.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">
            Nenhuma empresa cadastrada ainda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="px-6 py-4 font-medium">Empresa</th>
                  <th className="px-6 py-4 font-medium">Categoria</th>
                  <th className="px-6 py-4 font-medium">Local</th>
                  <th className="px-6 py-4 font-medium">Plano</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Vencimento</th>
                  <th className="px-6 py-4 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="border-b border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {company.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {company.category}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {company.location}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {company.plan}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {company.status}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {company.due_date || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/admin/empresas/${company.id}/editar`}
                          className="text-sm font-medium text-slate-700 transition hover:text-orange-600"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDelete(company.id)}
                          className="text-sm font-medium text-red-600 transition hover:text-red-700"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
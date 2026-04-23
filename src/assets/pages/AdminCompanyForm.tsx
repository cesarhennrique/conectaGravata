import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminCompanyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    image_url: "",
    whatsapp: "",
    instagram: "",
    plan: "basic",
    price_level: "R$",
    status: "active",
    featured: false,
    due_date: "",
    hours_text: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const payload = {
      ...formData,
      due_date: formData.due_date || null,
      instagram: formData.instagram || null,
      image_url: formData.image_url || null,
      whatsapp: formData.whatsapp || null,
      hours_text: formData.hours_text || null,
    };

    const { error } = await supabase.from("businesses").insert([payload]);

    setLoading(false);

    if (error) {
      setErrorMessage("Erro ao salvar empresa.");
      return;
    }

    navigate("/admin/empresas");
  }

  return (
    <AdminLayout title="Nova empresa">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nome da empresa
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Bistrô da Serra"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Categoria
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex: Restaurante"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Localização
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Centro, Gravatá"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Descreva a empresa"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              URL da imagem principal
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              WhatsApp
            </label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="5581999999999"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@empresa"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Plano
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Faixa de preço
            </label>
            <select
              name="price_level"
              value={formData.price_level}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="R$">R$</option>
              <option value="R$$">R$$</option>
              <option value="R$$$">R$$$</option>
              <option value="R$$$$">R$$$$</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            >
              <option value="active">Ativa</option>
              <option value="inactive">Inativa</option>
              <option value="pending">Pendente</option>
              <option value="expired">Vencida</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Data de vencimento
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Horário de funcionamento
            </label>
            <input
              type="text"
              name="hours_text"
              value={formData.hours_text}
              onChange={handleChange}
              placeholder="Ex: Seg a Sáb • 8h às 18h"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-orange-500"
              />
              Empresa em destaque
            </label>
          </div>

          {errorMessage && (
            <div className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar empresa"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/empresas")}
              className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
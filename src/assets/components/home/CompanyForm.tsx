import { type FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CompanyForm() {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plano") || "";

  const [formData, setFormData] = useState({
    companyName: "",
    category: "",
    plan: selectedPlan,
    responsibleName: "",
    whatsapp: "",
    instagram: "",
    address: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numeroDestino = "5581996791909";

    const mensagem = `
Olá! Quero anunciar minha empresa no Conecta Gravatá.

*Plano escolhido:* ${formData.plan || "Não informado"}
*Nome da empresa:* ${formData.companyName}
*Categoria:* ${formData.category}
*Responsável:* ${formData.responsibleName}
*WhatsApp:* ${formData.whatsapp}
*Instagram:* ${formData.instagram}
*Endereço:* ${formData.address}
*Descrição:* ${formData.description}
    `.trim();

    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(url, "_blank");
  }

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
            Cadastro de empresa
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Cadastre sua empresa no Conecta Gravatá
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Preencha os dados abaixo para anunciar sua empresa no portal e
            começar a ganhar visibilidade em Gravatá.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nome da empresa
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
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
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
              >
                <option value="">Selecione</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Pousadas">Pousadas</option>
                <option value="Cafeterias">Cafeterias</option>
                <option value="Serviços">Serviços</option>
                <option value="Beleza">Beleza</option>
                <option value="Lojas">Lojas</option>
                <option value="Saúde">Saúde</option>
                <option value="Moda">Moda</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Plano escolhido
              </label>
              <input
                type="text"
                name="plan"
                value={formData.plan}
                readOnly
                placeholder="Ex: Premium"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nome do responsável
              </label>
              <input
                type="text"
                name="responsibleName"
                value={formData.responsibleName}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
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
                placeholder="(81) 99999-9999"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
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
                placeholder="@suaempresa"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, bairro, número"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Descrição da empresa
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Fale um pouco sobre sua empresa, produtos ou serviços."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Ao enviar, o cadastro será encaminhado para análise via WhatsApp.
            </p>

            <button
              type="submit"
              className="rounded-2xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
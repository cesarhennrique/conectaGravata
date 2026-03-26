import { type FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function CompanyForm() {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plano") || "";

  const [formData, setFormData] = useState({
    companyName: "",
    category: "",
    plan: selectedPlan || "",
    responsibleName: "",
    whatsapp: "",
    instagram: "",
    address: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numeroDestino = "5581999999999";

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

  function selectPlan(plan: string) {
    setFormData((prev) => ({
      ...prev,
      plan,
    }));
  }

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
         

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Coloque sua empresa no Conecta Gravatá
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Escolha o plano ideal para sua empresa ganhar visibilidade no portal
            e preencher o cadastro para começar.
          </p>
        </div>

        {/* PLANOS */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <button
            type="button"
            onClick={() => selectPlan("Básico")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:shadow-md ${
              formData.plan === "Básico"
                ? "border-orange-400 bg-orange-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold text-slate-900">Básico</h2>
            <p className="mt-2 text-sm text-slate-600">
              Presença simples no portal.
            </p>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              R$29
              <span className="text-base font-medium text-slate-500">/mês</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>✔ Nome da empresa</li>
              <li>✔ Categoria</li>
              <li>✔ WhatsApp</li>
              <li>✔ Endereço</li>
              <li>✔ 1 foto principal</li>
              <li>✔ Presença na listagem</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => selectPlan("Pro")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:shadow-md ${
              formData.plan === "Pro"
                ? "border-orange-400 bg-orange-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold text-slate-900">Pro</h2>
            <p className="mt-2 text-sm text-slate-600">
              Mais visibilidade e destaque.
            </p>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              R$59
              <span className="text-base font-medium text-slate-500">/mês</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>✔ Tudo do plano Básico</li>
              <li>✔ Até 4 fotos da empresa</li>
              <li>✔ Descrição mais completa</li>
              <li>✔ Maior visibilidade na listagem</li>
              <li>✔ Perfil mais atrativo no portal</li>
            </ul>
          </button>

          <button
            type="button"
            onClick={() => selectPlan("Premium")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:shadow-md ${
              formData.plan === "Premium"
                ? "border-orange-500 bg-orange-50 ring-1 ring-orange-200"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Premium</h2>
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Destaque
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Máxima visibilidade no portal.
            </p>
            <p className="mt-5 text-3xl font-bold text-slate-900">
              R$99
              <span className="text-base font-medium text-slate-500">/mês</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>✔ Tudo do plano Pro</li>
              <li>✔ Até 8 fotos da empresa</li>
              <li>✔ Selo de destaque</li>
              <li>✔ Aparece primeiro nas listagens</li>
              <li>✔ Prioridade na home</li>
              <li>✔ Máxima visibilidade no portal</li>
            </ul>
          </button>
        </div>

        {/* FORMULÁRIO */}
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
                <option>Restaurantes</option>
                <option>Pousadas</option>
                <option>Cafeterias</option>
                <option>Serviços</option>
                <option>Beleza</option>
                <option>Lojas</option>
                <option>Saúde</option>
                <option>Moda</option>
                <option>Prestadores</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Plano escolhido
              </label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
              >
                <option value="">Selecione um plano</option>
                <option value="Básico">Básico</option>
                <option value="Pro">Pro</option>
                <option value="Premium">Premium</option>
              </select>
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
              Ao enviar, entraremos em contato pelo WhatsApp com os próximos
              passos.
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

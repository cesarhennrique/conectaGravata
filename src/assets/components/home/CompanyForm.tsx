import { type FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const plans = [
  {
    id: "Básico",
    price: "R$39",
    description: "Ideal para começar a aparecer nas buscas.",
    features: [
      "Aparece nas buscas do portal",
      "Contato direto via WhatsApp",
      "Informações básicas da empresa",
      "Presença na listagem",
    ],
    highlight: false,
  },
  {
    id: "Pro",
    price: "R$59",
    description: "Para quem quer atrair mais clientes e se destacar.",
    features: [
      "Mais destaque na listagem",
      "Até 4 fotos da empresa",
      "Mais chances de ser encontrado",
      "Tudo do plano Básico",
    ],
    highlight: true,
  },
  {
    id: "Premium",
    price: "R$129",
    description: "Para empresas que querem ser as mais vistas da cidade.",
    features: [
      "Aparece primeiro nas buscas",
      "Selo de destaque no portal",
      "Até 8 fotos da empresa",
      "Prioridade na página inicial",
      "Tudo do plano Pro",
    ],
    highlight: false,
  },
];

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function selectPlan(plan: "Básico" | "Pro" | "Premium") {
    setFormData((prev) => ({ ...prev, plan }));
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
*Instagram:* ${formData.instagram || "Não informado"}
*Endereço:* ${formData.address || "Não informado"}
*Descrição:* ${formData.description}
    `.trim();

    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">

        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
            Anuncie no portal
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Faça sua empresa ser encontrada em Gravatá
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-500">
            Escolha o plano ideal para aparecer nas buscas e receber contatos
            de moradores e turistas direto pelo WhatsApp.
          </p>
        </div>

        {/* Cards de plano */}
        <div className="mb-12 grid gap-6 md:grid-cols-3 ">
          {plans.map((plan) => {
            const isSelected = formData.plan === plan.id;
            const isHighlight = plan.highlight;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => selectPlan(plan.id as "Básico" | "Pro" | "Premium")}
                className={`relative rounded-3xl border p-7 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-orange-500 bg-orange-50 shadow-lg ring-2 ring-orange-400 scale-[1.02]"
                    : isHighlight
                    ? "border-orange-300 bg-orange-50 shadow-md hover:shadow-lg"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                } cursor-pointer`}
              >
                {/* Badge mais popular */}
                {isHighlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white shadow-sm">
                      Mais popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-bold text-slate-900">{plan.id}</h2>
                  {isSelected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

                <p className="mt-5 text-4xl font-bold text-slate-900">
                  {plan.price}
                  <span className="text-base font-medium text-slate-400">/mês</span>
                </p>

                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="h-4 w-4 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={`mt-6 rounded-2xl py-2.5 text-center text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-orange-500 text-white"
                    : isHighlight
                    ? "bg-orange-100 text-orange-600"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {isSelected ? "Plano selecionado ✓" : "Selecionar plano"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Dados da empresa
            {formData.plan && (
              <span className="ml-3 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
                Plano {formData.plan}
              </span>
            )}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                required
              >
                <option value="">Selecione</option>
                <option>Restaurante</option>
                <option>Pousada</option>
                <option>Cafeteria</option>
                <option>Serviços</option>
                <option>Beleza</option>
                <option>Loja</option>
                <option>Saúde</option>
                <option>Moda</option>
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Instagram{" "}
                <span className="font-normal text-slate-400">(opcional)</span>
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@suaempresa"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Endereço{" "}
                <span className="font-normal text-slate-400">(opcional)</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, bairro, número"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                rows={4}
                placeholder="Fale um pouco sobre sua empresa, produtos ou serviços."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-400">
              Após enviar, entraremos em contato pelo WhatsApp para ativar sua empresa.
            </p>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-2xl bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-95"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.857L.057 23.214a.75.75 0 0 0 .92.92l5.356-1.476A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.497-5.254-1.367l-.376-.214-3.924 1.082 1.082-3.924-.214-.376A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Quero anunciar minha empresa
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
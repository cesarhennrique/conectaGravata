import { Link } from "react-router-dom";

export default function Pricing() {
  const getWhatsAppLink = (plano: string) => {
    const numero = "5581996791909";

    const mensagem = encodeURIComponent(
      `Olá! Quero anunciar minha empresa no Conecta Gravatá.\nPlano escolhido: ${plano}`
    );

    return `https://wa.me/${numero}?text=${mensagem}`;
  };
  return (
    <section className="bg-slate-50 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl text-center">
        <span className="rounded-full bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
          Anuncie no portal
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Seja encontrado por quem está pronto para comprar em Gravatá
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
          Coloque sua empresa na frente de moradores e turistas que já estão
          buscando exatamente o que você oferece.
        </p>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Empresas locais já estão ganhando mais visibilidade no Conecta Gravatá
        </p>

        <div className="mt-8">
          <p className="text-base font-semibold text-slate-900 md:text-lg">
            Mais visibilidade, mais clientes, mais vendas
          </p>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Escolha o plano ideal para destacar seu negócio no portal.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* PREMIUM */}
          <article className="relative order-1 rounded-3xl border border-orange-300 bg-white p-6 text-left shadow-xl md:order-3">
            <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow">
              Mais escolhido
            </span>

            <h3 className="text-lg font-semibold text-slate-900">Premium</h3>
            <p className="mt-2 text-sm text-slate-600">
              Fique no topo e seja a primeira escolha
            </p>

            <p className="mt-6 text-3xl font-bold text-slate-900">
              R$99
              <span className="ml-1 text-base font-medium text-slate-500">
                /mês
              </span>
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Sem fidelidade • Cancele quando quiser
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✔ Tudo do plano Pro</li>
              <li>✔ Destaque no topo</li>
              <li>✔ Badge “Destaque”</li>
              <li>✔ Mais cliques e visibilidade</li>
              <li>✔ Maior destaque visual no portal</li>
            </ul>

            <Link to="/cadastro-empresa?plano=Premium">
              <button className="mt-6 w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                Quero aparecer no topo
              </button>
            </Link>
          </article>

          {/* PRO */}
          <article className="order-2 rounded-3xl border border-slate-300 bg-white p-6 text-left shadow-ld md:order-2">
            <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
            <p className="mt-2 text-sm text-slate-600">
              Apareça mais e se destaque da concorrência
            </p>

            <p className="mt-6 text-3xl font-bold text-slate-900">
              R$59
              <span className="ml-1 text-base font-medium text-slate-500">
                /mês
              </span>
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Sem fidelidade • Cancele quando quiser
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✔ Tudo do plano básico</li>
              <li>✔ Foto da empresa</li>
              <li>✔ Destaque maior nos cards</li>
              <li>✔ Mais atenção na listagem</li>
            </ul>

            <Link to="/cadastro-empresa?plano=Pro">
              <button className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Quero mais visibilidade
              </button>
            </Link>
          </article>

          {/* BÁSICO */}
          <article className="order-3 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm md:order-1">
            <h3 className="text-lg font-semibold text-slate-900">Básico</h3>
            <p className="mt-2 text-sm text-slate-600">
              Garanta sua presença no portal e comece a ser encontrado
            </p>

            <p className="mt-6 text-3xl font-bold text-slate-900">
              R$29
              <span className="ml-1 text-base font-medium text-slate-500">
                /mês
              </span>
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Sem fidelidade • Cancele quando quiser
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li>✔ Nome da empresa</li>
              <li>✔ Categoria</li>
              <li>✔ WhatsApp</li>
              <li>✔ Presença no portal</li>
            </ul>

            <Link to="/cadastro-empresa?plano=Básico">
              <button className="mt-6 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Começar agora
              </button>
            </Link>
          </article>
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Ainda tem dúvidas sobre qual plano escolher?
          </p>

          <a
            href="https://wa.me/5581996791909?text=Olá,%20quero%20anunciar%20no%20Conecta%20Gravatá"
            target="_blank"
            rel="noopener noreferrer"
          >
            <a
              href={getWhatsAppLink("Quero mais informações")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-3 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600">
                Falar no WhatsApp
              </button>
            </a>
          </a>
        </div>
      </div>
    </section>
  );
}

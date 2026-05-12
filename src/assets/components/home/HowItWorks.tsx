import { Search, Star, MessageCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Busque o que precisa",
    description: "Digite o nome do serviço, categoria ou estabelecimento que deseja encontrar em Gravatá.",
    color: "bg-brand-500",
  },
  {
    step: "02",
    icon: Star,
    title: "Compare e escolha",
    description: "Veja fotos, horários, localização e detalhes de cada empresa para tomar a melhor decisão.",
    color: "bg-blue-500",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Entre em contato",
    description: "Fale diretamente com o negócio pelo WhatsApp ou visite o endereço com apenas um clique.",
    color: "bg-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            Simples e rápido
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Como funciona
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
            Em três passos você encontra o que precisa e já fala com o negócio.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+3rem)] top-7 hidden h-px w-[calc(100%-3rem)] border-t-2 border-dashed border-slate-200 md:block" />
                )}

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.color} text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>

                <span className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Passo {s.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

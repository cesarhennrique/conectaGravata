import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { MapPin, Clock, Phone, MessageCircle, AtSign } from "lucide-react";
import { businesses } from "../../data/businesses";

export default function EmpresaDetalhe() {
  const { id } = useParams();

  const business = businesses.find((item) => item.id === Number(id));

  if (!business) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">Empresa não encontrada</h1>
          <p className="mt-4 text-slate-600">
            Não encontramos os dados dessa empresa.
          </p>
        </div>
      </main>
    );
  }

  const isPremium = business.plan === "premium";

function handleWhatsAppClick() {
  if (!business) return;

  const mensagem = `
Olá! Encontrei sua empresa no Conecta Gravatá.

*Empresa:* ${business.name}
*Categoria:* ${business.category}
*Local:* ${business.location}

Gostaria de mais informações.
  `.trim();

  const url = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    mensagem
  )}`;

  window.open(url, "_blank");
}

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
            <div>
              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={business.image}
                  alt={business.name}
                  className="h-[320px] w-full object-cover md:h-[460px]"
                />

                {isPremium && (
                  <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Destaque
                  </span>
                )}
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-slate-500">
                  {business.category}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  {business.name}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{business.location}</span>
                  </div>

                  {business.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{business.hours}</span>
                    </div>
                  )}
                </div>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
                  {business.description}
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Informações e contato
              </h2>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span>{business.whatsapp}</span>
                </div>

                {business.instagram && (
                  <div className="flex items-center gap-3">
                    <AtSign className="h-4 w-4 text-slate-500" />
                    <span>{business.instagram}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{business.location}</span>
                </div>

                {business.hours && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span>{business.hours}</span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chamar no WhatsApp
                </button>

                <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Ver no mapa
                </button>
              </div>

              {isPremium && (
                <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                  <p className="text-sm font-semibold text-orange-700">
                    Empresa em destaque no portal
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Este perfil possui maior visibilidade no Conecta Gravatá e
                    aparece com destaque para moradores e turistas.
                  </p>
                </div>
              )}
            </aside>
          </div>

          {business.gallery && business.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Fotos e ambiente
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {business.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${business.name} ${index + 1}`}
                      className="h-64 w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
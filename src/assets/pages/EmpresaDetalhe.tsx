import { Clock, MapPin, MessageCircle, Phone, AtSign } from "lucide-react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const businesses = [
  {
    id: "1",
    name: "Bistrô da Serra",
    category: "Restaurantes",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    rating: 4.9,
    description:
      "O Bistrô da Serra oferece uma experiência gastronômica sofisticada em Gravatá, com ambiente aconchegante, cardápio especial e atendimento diferenciado para moradores e turistas.",
    phone: "(81) 99999-9999",
    instagram: "@bistrodaserra",
    hours: "Seg a Dom • 12h às 22h",
    gallery: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Villa Gravatá",
    category: "Pousadas",
    location: "Alpes Suíços, Gravatá",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Uma pousada charmosa e acolhedora em Gravatá, ideal para quem busca descanso, boa localização e uma experiência confortável na cidade.",
    phone: "(81) 98888-7777",
    instagram: "@villagravata",
    hours: "Recepção 24 horas",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Café do Mirante",
    category: "Cafeterias",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Um espaço agradável para café, reuniões e pausas especiais, com cardápio artesanal e ambiente acolhedor em Gravatá.",
    phone: "(81) 97777-6666",
    instagram: "@cafedomirante",
    hours: "Seg a Sáb • 8h às 19h",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export default function EmpresaDetalhe() {
  const { id } = useParams();

  const business = businesses.find((item) => item.id === id);

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

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl">
          {/* topo */}
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
            <div>
              <div className="overflow-hidden rounded-4xl">
                <img
                  src={business.image}
                  alt={business.name}
                  className="h-80 w-full object-cover md:h-110"
                />
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

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{business.hours}</span>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
                  {business.description}
                </p>
              </div>
            </div>

            {/* sidebar */}
            <aside className="h-fit rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Informações e contato
              </h2>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span>{business.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <AtSign className="h-4 w-4 text-slate-500" />
                  <span>{business.instagram}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>{business.location}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
                  Ver no mapa
                </button>

                <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <MessageCircle className="h-4 w-4" />
                  Chamar no WhatsApp
                </button>
              </div>
            </aside>
          </div>

          {/* galeria */}
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
        </div>
      </section>
    </main>
  );
}
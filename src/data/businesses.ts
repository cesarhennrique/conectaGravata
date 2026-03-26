export type Business = {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  priceLevel: string;
  openNow: boolean;
  card: boolean;
  familyFriendly: boolean;
  plan: "premium" | "pro" | "basic";
  whatsapp: string;
  hours?: string;
  instagram?: string;
  gallery?: string[];
};

export const businesses: Business[] = [
  {
    id: 1,
    name: "Bistrô da Serra",
    category: "Restaurante",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Ambiente sofisticado, boa gastronomia e uma experiência ideal para moradores e turistas em Gravatá.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: true,
    plan: "premium",
    whatsapp: "5581991111111",
    hours: "Seg a Dom • 12h às 22h",
    instagram: "@bistrodaserra",
    gallery: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Villa Gravatá",
    category: "Pousada",
    location: "Alpes Suíços, Gravatá",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    description:
      "Hospedagem charmosa com estrutura aconchegante, excelente localização e clima acolhedor.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: true,
    plan: "pro",
    whatsapp: "5581992222222",
    hours: "Recepção 24 horas",
    instagram: "@villagravata",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Café do Mirante",
    category: "Cafeteria",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    description:
      "Perfeito para uma pausa, reuniões e momentos especiais com café de qualidade e ambiente agradável.",
    priceLevel: "R$$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "premium",
    whatsapp: "5581993333333",
    hours: "Seg a Sáb • 8h às 19h",
    instagram: "@cafedomirante",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    name: "Elétrica Gravatá",
    category: "Serviços",
    location: "Prado, Gravatá",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Serviços elétricos residenciais e comerciais com atendimento rápido em Gravatá.",
    priceLevel: "R$$",
    openNow: false,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581994444444",
  },
  {
    id: 5,
    name: "Studio Belle",
    category: "Beleza",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Salão de beleza com serviços de cabelo, maquiagem e estética para diferentes ocasiões.",
    priceLevel: "R$$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "pro",
    whatsapp: "5581995555555",
  },
  {
    id: 6,
    name: "Moda Serra",
    category: "Moda",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    description:
      "Loja com roupas e acessórios para quem busca estilo e variedade em Gravatá.",
    priceLevel: "R$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "pro",
    whatsapp: "5581996666666",
  },
  {
    id: 7,
    name: "Vida Clínica",
    category: "Saúde",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
    description:
      "Clínica com atendimento em diversas especialidades, estrutura moderna e localização central em Gravatá.",
    priceLevel: "R$$",
    openNow: true,
    card: true,
    familyFriendly: true,
    plan: "premium",
    whatsapp: "5581997777777",
  },
  {
    id: 8,
    name: "Loja Central",
    category: "Loja",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    description:
      "Loja com variedades, presentes e utilidades para o dia a dia, atendendo moradores e visitantes em Gravatá.",
    priceLevel: "R$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581998888888",
  },
  {
    id: 9,
    name: "Carlos Eletricista",
    category: "Eletricista",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Atendimento residencial e comercial para instalação, manutenção elétrica e pequenos reparos.",
    priceLevel: "R$$",
    openNow: true,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581991010101",
  },
  {
    id: 10,
    name: "Encanador Express",
    category: "Encanador",
    location: "Prado, Gravatá",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    description:
      "Serviços rápidos de encanamento, vazamentos, manutenção hidráulica e instalação.",
    priceLevel: "R$$",
    openNow: true,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581992020202",
  },
  {
    id: 11,
    name: "Pintura Boa Vista",
    category: "Pintor",
    location: "Boa Vista, Gravatá",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop",
    description:
      "Pintura interna e externa para residências, comércios e pequenos projetos.",
    priceLevel: "R$$",
    openNow: false,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581993030303",
  },
  {
    id: 12,
    name: "Jardim Verde",
    category: "Jardinagem",
    location: "Alpes Suíços, Gravatá",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=1200&auto=format&fit=crop",
    description:
      "Cuidados com jardim, poda, paisagismo e manutenção de áreas verdes.",
    priceLevel: "R$$",
    openNow: true,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581994040404",
  },
  {
    id: 13,
    name: "Limpeza em Dia",
    category: "Limpeza",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200&auto=format&fit=crop",
    description:
      "Limpeza residencial e comercial com atendimento ágil e organizado.",
    priceLevel: "R$",
    openNow: true,
    card: false,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581995050505",
  },
  {
    id: 14,
    name: "Manutenção Total",
    category: "Manutenção",
    location: "Cruzeiro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description:
      "Montagem, reparos e manutenção geral para casa, escritório e pequenos comércios.",
    priceLevel: "R$$",
    openNow: false,
    card: true,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581996060606",
  },
  {
    id: 15,
    name: "Frio Certo Refrigeração",
    category: "Refrigeração",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1581092919535-7146ff1a5907?q=80&w=1200&auto=format&fit=crop",
    description:
      "Instalação e manutenção de ar-condicionado, freezers e refrigeração em geral.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581997070707",
  },
  {
    id: 16,
    name: "Auto Brilho Detail",
    category: "Detalhamento automotivo",
    location: "Centro, Gravatá",
    image:
      "https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?q=80&w=1200&auto=format&fit=crop",
    description:
      "Lavagem técnica, polimento, higienização e detalhamento automotivo.",
    priceLevel: "R$$$",
    openNow: true,
    card: true,
    familyFriendly: false,
    plan: "basic",
    whatsapp: "5581998080808",
  },
];
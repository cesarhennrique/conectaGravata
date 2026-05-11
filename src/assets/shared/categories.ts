export const CATEGORIES = [
  // Alimentação
  "Restaurante",
  "Cafeteria",
  "Lanchonete",
  "Bar",
  "Pizzaria",
  "Sorveteria",
  "Padaria",
  // Hospedagem & Turismo
  "Pousada",
  "Hotel",
  "Turismo",
  // Beleza & Estética
  "Beleza",
  "Barbearia",
  // Saúde
  "Saúde",
  "Farmácia",
  "Academia",
  // Moda & Loja
  "Moda",
  "Loja",
  "Mercado",
  // Serviços gerais
  "Serviços",
  "Eletricista",
  "Encanador",
  "Pintor",
  "Jardinagem",
  "Limpeza",
  "Manutenção",
  "Refrigeração",
  "Detalhamento automotivo",
  // Outros
  "Educação",
  "Imóveis",
  "Contabilidade",
  "Outros",
] as const;

export type Category = (typeof CATEGORIES)[number];

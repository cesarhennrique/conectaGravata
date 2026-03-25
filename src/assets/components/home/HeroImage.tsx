export default function HeroImage() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[32px] lg:h-[560px]">
      <img
        src="/hero-gravata.png"
        alt="Vista de Gravatá"
        className="h-full w-full object-cover"
      />

      {/* Gradiente branco vindo da esquerda */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/75 to-transparent" />

      {/* Leve suavização geral */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}
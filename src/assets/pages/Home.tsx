import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categoria from "../components/home/Categoria";
import MobileExploreCard from "../components/home/MobileExploreCard";
import FeaturedBusinesses from "../components/home/FeatureBusinesses";
import CtaBanner from "../components/home/CtaBanner";
import NewsSection from "../components/home/NewsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      {/* Explore card sobrepõe a fronteira hero / fundo branco */}
      <div className="relative z-20 -mt-16 px-4 md:hidden">
        <MobileExploreCard />
      </div>
      {/* Container branco arredondado — mobile only */}
      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] md:hidden">
        <FeaturedBusinesses />
      </div>
      {/* Desktop: layout normal */}
      <div className="hidden md:block">
        <Categoria />
        <FeaturedBusinesses />
      </div>
      <CtaBanner />
      <NewsSection />
    </main>
  );
}

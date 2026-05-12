import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import MobileExploreCard from "../components/home/MobileExploreCard";
import FeaturedBusinesses from "../components/home/FeatureBusinesses";
import CtaBanner from "../components/home/CtaBanner";
import NewsSection from "../components/home/NewsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      {/* Mobile: explore card sobrepõe a fronteira + fundo branco arredondado */}
      <div className="relative z-20 -mt-16 px-4 md:hidden">
        <MobileExploreCard />
      </div>
      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] md:hidden">
        <FeaturedBusinesses />
      </div>

      {/* Desktop */}
      <div className="hidden bg-white md:block">
        <div className="mx-auto max-w-7xl px-8 py-16">
          <MobileExploreCard />
        </div>
        <FeaturedBusinesses />
      </div>
      <CtaBanner />
      <NewsSection />
    </main>
  );
}

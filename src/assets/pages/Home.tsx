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
      {/* Container branco arredondado — mobile only */}
      <div className="relative z-10 -mt-6 rounded-t-3xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] md:hidden">
        <div className="px-4 pt-5 pb-2">
          <MobileExploreCard />
        </div>
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

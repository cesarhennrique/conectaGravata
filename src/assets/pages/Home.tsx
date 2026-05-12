import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categoria from "../components/home/Categoria";
import FeaturedBusinesses from "../components/home/FeatureBusinesses";
import CtaBanner from "../components/home/CtaBanner";
import NewsSection from "../components/home/NewsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Categoria />
      <FeaturedBusinesses />
      <CtaBanner />
      <NewsSection />
    </main>
  );
}

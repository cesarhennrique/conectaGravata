import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categoria from "../components/home/Categoria";
import FeaturedBusinesses from "../components/home/FeatureBusinesses";


export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <Categoria />
      <FeaturedBusinesses />
      
    </main>
  );
}
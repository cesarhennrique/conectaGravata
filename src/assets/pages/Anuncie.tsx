import Navbar from "../components/layout/Navbar";
import Pricing from "../components/home/Pricing";

export default function Anuncie() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Pricing />
    </main>
  );
}
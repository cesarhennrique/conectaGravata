import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Restaurantes", "Pousadas", "Cafeterias", "Lojas", "Beleza", "Saúde",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Logo + desc */}
          <div className="lg:col-span-1">
            <img className="h-10 w-auto" src="/logonavbar.png" alt="Conecta Gravatá" />
            <p className="mt-4 text-sm leading-7">
              Plataforma para descobrir empresas, serviços e experiências em Gravatá-PE. Conectando moradores e turistas aos melhores negócios locais.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com/conectagravata"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-brand-500 text-sm font-bold"
              >
                IG
              </a>
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <h3 className="text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/" className="transition hover:text-brand-400">Início</Link></li>
              <li><Link to="/resultados?local=Gravatá" className="transition hover:text-brand-400">Explorar empresas</Link></li>
              <li><Link to="/cadastro-empresa" className="transition hover:text-brand-400">Cadastrar empresa</Link></li>
              <li><a href="/#como-funciona" className="transition hover:text-brand-400">Como funciona</a></li>
              <li><a href="/#noticias" className="transition hover:text-brand-400">Notícias</a></li>
            </ul>
          </div>

          {/* Col 3 — Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-white">Categorias</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/resultados?q=${cat.toLowerCase()}&local=Gravatá`}
                    className="transition hover:text-brand-400"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato + newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                Gravatá - PE, Brasil
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                conectagravata@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                (81) 9 0000-0000
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">Newsletter</p>
              <div className="mt-3 flex overflow-hidden rounded-xl border border-white/10">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <button className="bg-brand-500 px-4 text-white transition hover:bg-brand-600 cursor-pointer">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Conecta Gravatá. Todos os direitos reservados.</p>
          <p>Desenvolvido por <span className="text-brand-400">Urbixy</span></p>
        </div>
      </div>
    </footer>
  );
}

import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img className="w-30" src="/logo.png" alt="" />

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Plataforma para descobrir empresas, serviços e experiências em
              Gravatá. Conectando moradores e turistas aos melhores negócios locais.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Navegação</h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <Link to="/" className="transition hover:text-orange-500">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/resultados?local=Gravatá"
                  className="transition hover:text-orange-500"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link
                  to="/prestadores"
                  className="transition hover:text-orange-500"
                >
                  Prestadores
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastro-empresa"
                  className="transition hover:text-orange-500"
                >
                  Cadastrar empresa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Contato</h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Gravatá - PE
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (81) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contato@conectagravata.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Conecta Gravatá. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
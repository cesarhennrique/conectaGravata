import { type FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Email ou senha inválidos.");
      return;
    }

    setIsAuthenticated(true);
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-sm font-medium text-orange-600">
              Área administrativa
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Entrar no painel
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Faça login para gerenciar empresas, prestadores e planos do portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@conectagravata.com"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400"
                required
              />
            </div>

            {errorMessage && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
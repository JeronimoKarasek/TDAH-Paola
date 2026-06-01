"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Tedhy from "@/components/Tedhy";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Erro ao entrar");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 confetti-bg bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Tedhy size={140} expression="focused" />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 ring-1 ring-gray-100">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1 text-xs font-bold mb-3">
              <Lock size={14} /> ÁREA RESTRITA
            </div>
            <h1 className="font-display text-2xl font-bold gradient-text">
              Dashboard Sintonize
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Acesso exclusivo do administrador
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-3.5"
            >
              {loading ? "Entrando..." : "Entrar no painel"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            Credenciais padrão: <code className="bg-gray-100 px-1 rounded">admin</code> /{" "}
            <code className="bg-gray-100 px-1 rounded">sintonize2025</code>
            <br />
            (altere via variáveis de ambiente)
          </p>
        </div>
      </div>
    </main>
  );
}

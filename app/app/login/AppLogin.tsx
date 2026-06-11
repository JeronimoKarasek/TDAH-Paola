"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Tedhy from "@/components/Tedhy";

/**
 * Tela de login do app Sintonize TDAH.
 * Conectada ao banco real via /api/app/login (Supabase + bcrypt).
 */
export default function AppLogin({ tedhImageUrl }: { tedhImageUrl?: string }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [userName, setUserName] = useState("");

  const valid = /\S+@\S+\.\S+/.test(email) && pass.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Não foi possível entrar.");
        return;
      }
      setUserName(data?.user?.name || "");
      setDone(true);
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo — Tedhy */}
      <div className="relative hidden lg:flex flex-col justify-center items-center gradient-bg text-white p-12 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <Tedhy size={260} expression="happy" imageUrl={tedhImageUrl} limbs />
        <h2 className="font-display text-3xl font-bold mt-8 text-center max-w-sm">
          Que bom te ver de novo! 👋
        </h2>
        <p className="text-white/90 text-center mt-3 max-w-sm">
          Entre e continue de onde parou. O foco te espera.
        </p>
      </div>

      {/* Lado direito — formulário */}
      <div className="flex flex-col justify-center px-6 sm:px-12 py-12 bg-[#fffaf3]">
        <div className="max-w-md w-full mx-auto">
          {!done ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 lg:hidden">
                  <Tedhy size={40} floating={false} imageUrl={tedhImageUrl} />
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-secondary-600">
                  <Sparkles size={16} /> Sintonize TDAH
                </span>
              </div>

              <h1 className="font-display text-3xl font-bold mb-1">Entrar</h1>
              <p className="text-gray-500 mb-8">
                Acesse sua conta para continuar seu método.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Sua senha"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-11 py-3 focus:border-primary-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="mostrar senha"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!valid || loading}
                  className="btn-primary w-full !py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Ainda não tem conta?{" "}
                <a href="/app" className="text-primary-600 font-semibold hover:underline">
                  Criar conta
                </a>
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Tedhy size={160} expression="excited" imageUrl={tedhImageUrl} limbs />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <CheckCircle2 className="text-green-500" size={28} />
                Bem-vindo(a){userName ? `, ${userName.split(" ")[0]}` : ""}!
              </h1>
              <p className="text-gray-600 mb-8">
                Login realizado com sucesso. Seu painel está sendo preparado.
              </p>
              <a href="/app/dashboard" className="btn-primary !py-3.5">
                Ir para o meu painel <ArrowRight size={18} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

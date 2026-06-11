"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Tedhy from "@/components/Tedhy";

/**
 * Tela de criação de conta + senha do app Sintonize TDAH.
 * Esta é a porta de entrada do produto (onde o assinante cria sua senha
 * e começa a usar o método). Demonstração de UX — a persistência real
 * (banco de dados) entra no próximo ciclo.
 */
export default function AppOnboarding({ tedhImageUrl }: { tedhImageUrl?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  // Regras de força da senha (feedback visual em tempo real)
  const rules = [
    { ok: pass.length >= 8, label: "Pelo menos 8 caracteres" },
    { ok: /[A-Z]/.test(pass), label: "Uma letra maiúscula" },
    { ok: /[0-9]/.test(pass), label: "Um número" },
    { ok: pass.length > 0 && pass === confirm, label: "As senhas coincidem" },
  ];
  const allOk = rules.every((r) => r.ok) && name.trim() && /\S+@\S+\.\S+/.test(email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allOk) return;
    // Aqui futuramente: POST /api/app/signup → cria usuário + hash da senha no banco
    setDone(true);
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo — boas-vindas do Tedhy */}
      <div className="relative hidden lg:flex flex-col justify-center items-center gradient-bg text-white p-12 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <Tedhy size={260} expression="excited" imageUrl={tedhImageUrl} limbs />
        <h2 className="font-display text-3xl font-bold mt-8 text-center max-w-sm">
          Bem-vindo(a) à sua nova rotina, sintonizado(a)! 🎉
        </h2>
        <p className="text-white/90 text-center mt-3 max-w-sm">
          Crie sua conta e o Tedhy te guia do caos ao foco — no seu ritmo, do seu
          jeito.
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

              <h1 className="font-display text-3xl font-bold mb-1">Crie sua conta</h1>
              <p className="text-gray-500 mb-8">
                É rápido. Em menos de 1 minuto você está dentro do método.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field icon={User} placeholder="Seu nome" value={name} onChange={setName} />
                <Field
                  icon={Mail}
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={setEmail}
                />

                {/* Senha */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Crie uma senha"
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

                {/* Confirmar senha */}
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Confirme a senha"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 outline-none"
                  />
                </div>

                {/* Força da senha */}
                <ul className="grid grid-cols-2 gap-2 pt-1">
                  {rules.map((r) => (
                    <li
                      key={r.label}
                      className={`flex items-center gap-1.5 text-xs ${r.ok ? "text-green-600" : "text-gray-400"}`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center ${r.ok ? "bg-green-100" : "bg-gray-100"}`}>
                        <Check size={11} />
                      </span>
                      {r.label}
                    </li>
                  ))}
                </ul>

                <button
                  type="submit"
                  disabled={!allOk}
                  className="btn-primary w-full !py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Criar conta e começar
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Já tem conta?{" "}
                <a href="/app/login" className="text-primary-600 font-semibold hover:underline">
                  Entrar
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
                <Tedhy size={160} expression="happy" imageUrl={tedhImageUrl} limbs />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Conta criada, {name.split(" ")[0]}! 🎉
              </h1>
              <p className="text-gray-600 mb-8">
                Sua senha foi definida com sucesso. O Tedhy já está preparando seu
                primeiro plano de foco.
              </p>
              <a href="#" className="btn-primary !py-3.5">
                Entrar no meu painel <ArrowRight size={18} />
              </a>
              <p className="text-xs text-gray-400 mt-6">
                (Demonstração — a próxima etapa conecta esta tela ao banco de dados
                real e ao login.)
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  icon: any;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 outline-none"
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Plan } from "@/lib/types";

interface PricingProps {
  plans: Plan[];
}

export default function Pricing({ plans }: PricingProps) {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error" | "info";
    message: string;
    url?: string;
  } | null>(null);

  function openCheckout(p: Plan) {
    setSelectedPlan(p);
    setResult(null);
    setOpen(true);
  }

  async function submit() {
    if (!selectedPlan) return;
    if (!form.name || !form.email) {
      setResult({ type: "error", message: "Preencha nome e e-mail." });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          planId: selectedPlan.id,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setResult({
          type: "error",
          message: data.error || "Erro ao processar.",
        });
      } else if (data.leadOnly) {
        setResult({
          type: "info",
          message: data.message,
        });
      } else if (data.invoiceUrl) {
        setResult({
          type: "success",
          message: "Tudo certo! Redirecionando para o pagamento...",
          url: data.invoiceUrl,
        });
        setTimeout(() => {
          window.location.href = data.invoiceUrl;
        }, 1500);
      } else {
        setResult({
          type: "success",
          message:
            "Assinatura criada! Você receberá o link de pagamento por e-mail em instantes.",
        });
      }
    } catch (err: any) {
      setResult({ type: "error", message: err.message || "Erro de conexão." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="planos"
      className="py-20 px-4 sm:px-6 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 confetti-bg opacity-50" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-4 shadow-md">
            <Sparkles size={16} />
            Escolha seu nível de sintonia
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Planos que cabem no seu <span className="gradient-text">bolso e ritmo</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            7 dias de garantia. Cancele quando quiser, sem letras miúdas. Promessa
            do Tedhy 🤝
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 shadow-xl transition-all hover-lift ${
                p.highlight
                  ? "bg-gradient-to-br from-primary-500 via-secondary-500 to-secondary-600 text-white scale-105 ring-4 ring-primary-300"
                  : "bg-white ring-1 ring-gray-100"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sunny-400 text-gray-900 font-bold text-xs px-4 py-1.5 rounded-full shadow-lg">
                  {p.badge}
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`font-display font-bold text-2xl mb-1 ${
                    p.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`text-sm ${
                    p.highlight ? "text-white/90" : "text-gray-500"
                  }`}
                >
                  {p.tagline}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-sm ${
                      p.highlight ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    R$
                  </span>
                  <span
                    className={`font-display text-5xl font-bold ${
                      p.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {Math.floor(p.price)}
                  </span>
                  <span
                    className={`text-2xl font-bold ${
                      p.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ,{(p.price % 1).toFixed(2).slice(2).padEnd(2, "0")}
                  </span>
                  <span
                    className={`text-sm ${
                      p.highlight ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    /{p.cycle === "MONTHLY" ? "mês" : "ano"}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`flex-shrink-0 mt-0.5 ${
                        p.highlight ? "text-sunny-400" : "text-mint-500"
                      }`}
                      size={20}
                    />
                    <span
                      className={`text-sm ${
                        p.highlight ? "text-white/95" : "text-gray-700"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openCheckout(p)}
                className={`w-full rounded-full px-6 py-4 font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg ${
                  p.highlight
                    ? "bg-white text-primary-600 hover:bg-yellow-50"
                    : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                }`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          🔒 Pagamento seguro via Asaas · 💳 Pix, boleto e cartão · 🔄 Cancele
          quando quiser
        </div>
      </div>

      {/* Checkout modal */}
      {open && selectedPlan && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              <X size={20} />
            </button>

            <h3 className="font-display font-bold text-2xl mb-2">
              Plano {selectedPlan.name}
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              R$ {selectedPlan.price.toFixed(2).replace(".", ",")}/
              {selectedPlan.cycle === "MONTHLY" ? "mês" : "ano"} · Cancele quando
              quiser
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Seu nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                disabled={loading}
              />
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                disabled={loading}
              />
              <input
                type="tel"
                placeholder="Celular (WhatsApp)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="CPF (opcional, agiliza)"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary-500 outline-none"
                disabled={loading}
              />
            </div>

            {result && (
              <div
                className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                  result.type === "success"
                    ? "bg-green-50 text-green-700"
                    : result.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {result.message}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className="btn-primary w-full mt-6 !py-4"
            >
              {loading ? "Processando..." : "Confirmar e pagar"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Ao continuar você concorda com nossos termos. 🔒 Asaas processa o
              pagamento.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Preciso ter diagnóstico de TDAH para usar?",
    a: "Não! O Sintonize foi pensado para mentes com TDAH, suspeita ou só com cara de TDAH. Se você se identifica com qualquer característica, vai amar. Aqui ninguém te julga.",
  },
  {
    q: "Como funciona o cancelamento?",
    a: "Você cancela em 1 clique direto na sua conta, sem precisar mandar e-mail, falar com SAC ou explicar nada. Promessa do Tedhy 🤝.",
  },
  {
    q: "Tem garantia?",
    a: "Sim! 7 dias de garantia incondicional. Testou e não rolou? A gente devolve 100% do valor sem perguntas. Risco zero.",
  },
  {
    q: "Funciona no celular?",
    a: "Sim! O Sintonize é 100% responsivo e funciona em qualquer dispositivo (Android, iOS, desktop). Em breve, app nativo!",
  },
  {
    q: "É um app médico ou substitui tratamento?",
    a: "Não. O Sintonize é uma ferramenta de organização e foco. Ele complementa, mas não substitui acompanhamento profissional. Sempre consulte seu médico ou terapeuta.",
  },
  {
    q: "Como o Tedhy IA funciona no plano Flow?",
    a: "O Tedhy aprende seus padrões (horários de pico, gatilhos, hábitos) e adapta lembretes, sugere micro-tarefas e ajusta tudo automaticamente. É como ter um copiloto neurodivergente 24/7.",
  },
  {
    q: "Quais formas de pagamento aceitam?",
    a: "Pix (instantâneo), boleto bancário e cartão de crédito (com recorrência automática). Tudo processado de forma segura pelo Asaas.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            Tire suas dúvidas
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl overflow-hidden ring-1 ring-gray-100"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-display font-semibold text-lg pr-4">
                  {f.q}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-primary-500 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-700 leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

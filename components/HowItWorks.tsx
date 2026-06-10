"use client";

import { motion } from "framer-motion";
import Tedhy from "./Tedhy";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Conheça seu padrão",
    desc: "Em 3 minutos o Tedhy mapeia seu perfil TDAH, seus horários de pico e o que mais te trava.",
    color: "bg-primary-500",
  },
  {
    num: "02",
    title: "Receba seu plano",
    desc: "Geramos uma rotina sob medida com micro-tarefas, blocos de hiperfoco e pausas que respeitam você.",
    color: "bg-secondary-500",
  },
  {
    num: "03",
    title: "Execute com o Tedhy",
    desc: "Lembretes amigáveis, gamificação e timer adaptado. Você não está sozinho — somos parceiros.",
    color: "bg-accent-500",
  },
  {
    num: "04",
    title: "Veja sua evolução",
    desc: "Dashboards visuais mostram seu progresso, hábitos e conquistas. Dopamina garantida.",
    color: "bg-sunny-500",
  },
];

export default function HowItWorks({ tedhImageUrl }: { tedhImageUrl?: string }) {
  return (
    <section
      id="como-funciona"
      className="py-20 px-4 sm:px-6 bg-gradient-to-br from-orange-50 via-purple-50 to-cyan-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            ✨ Simples como respirar
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Como funciona em <span className="gradient-text">4 passos</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start bg-white rounded-2xl p-6 shadow-md hover-lift"
              >
                <div
                  className={`flex-shrink-0 w-14 h-14 ${s.color} text-white rounded-2xl flex items-center justify-center font-display font-bold text-xl shadow-lg`}
                >
                  {s.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl blur-3xl opacity-50" />
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-center mb-6">
                <Tedhy size={200} expression="wink" imageUrl={tedhImageUrl} />
              </div>
              <div className="space-y-3">
                {[
                  "Tarefa de 5 min ✅ +10 XP",
                  "Pausa para água 💧 +5 XP",
                  "Foco 25 min 🎯 +25 XP",
                  "Hábito do dia ⭐ +15 XP",
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl px-4 py-3"
                  >
                    <CheckCircle2 className="text-mint-500" size={20} />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      {t}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full px-4 py-2 font-bold text-sm shadow-lg">
                  🔥 Streak de 7 dias!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

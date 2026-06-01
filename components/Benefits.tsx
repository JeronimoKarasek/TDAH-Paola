"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  Target,
  Heart,
  Zap,
  Trophy,
  Users,
  Bell,
  Calendar,
} from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Pensado pro seu cérebro",
    desc: "Cada tela, botão e cor foi escolhida para reduzir a sobrecarga sensorial e estimular o foco.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Gestão de tempo realista",
    desc: "Esqueça métodos genéricos. Aqui o tempo é flexível, com pausas e recompensas que funcionam.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Target,
    title: "Metas pequenas, vitórias gigantes",
    desc: "Dividimos tudo em micro-tarefas comemoráveis. Cada check vira um boost de dopamina.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Bell,
    title: "Lembretes que não irritam",
    desc: "Notificações inteligentes baseadas no seu padrão de atenção, e não num timer aleatório.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Trophy,
    title: "Gamificação real",
    desc: "Ganhe XP, conquistas e suba de nível. Sua produtividade vira jogo, sem culpa.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Heart,
    title: "Sem julgamento",
    desc: "Errou? Apertou snooze 5 vezes? O Tedhy te abraça, ajusta o plano e segue contigo.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Zap size={16} />
            Por que o Sintonize funciona?
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Não é mais um app de produtividade.
            <br />
            <span className="gradient-text">É o seu copiloto neurodivergente.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cansou de tentar caber em sistemas feitos para cérebros neurotípicos?
            Aqui o jogo muda.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card hover-lift group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

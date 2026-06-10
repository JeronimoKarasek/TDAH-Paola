"use client";

import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  Clock,
  Brain,
  ListChecks,
  Bell,
  Palette,
  HeartHandshake,
  Mic,
} from "lucide-react";

/**
 * "O app perfeito" — features pensadas a partir de pesquisa com a comunidade
 * TDAH/autista (body doubling, gamificação, gestão visual de tempo, brain dump,
 * quebra de tarefas, modo baixo estímulo para autismo, etc).
 */
const features = [
  {
    icon: Users,
    title: "Body Doubling ao vivo",
    desc: "Salas de foco com outras pessoas neurodivergentes. Trabalhar 'acompanhado' é uma das técnicas mais eficazes para o cérebro TDAH iniciar tarefas.",
    color: "from-orange-500 to-pink-500",
    tag: "Mais pedido ⚡",
  },
  {
    icon: ListChecks,
    title: "Quebra de tarefas automática",
    desc: "Diga 'limpar a casa' e o Tedhy divide em micro-passos de 2–5 min. Sem paralisia: só o próximo passinho de cada vez.",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: Trophy,
    title: "Gamificação com dopamina",
    desc: "XP, streaks, conquistas e recompensas. Transformamos a sua rotina num jogo que o seu cérebro realmente quer jogar.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "Tempo visual (time blindness)",
    desc: "Timers visuais, blocos coloridos e Pomodoro adaptado. Você enxerga o tempo passar — adeus cegueira temporal.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Brain,
    title: "Brain Dump rápido",
    desc: "Mil ideias na cabeça? Despeje tudo num toque (ou por voz) e o Tedhy organiza depois. Liberte a mente do peso de lembrar.",
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: Bell,
    title: "Lembretes que não dão pra ignorar",
    desc: "Notificações carinhosas, repetidas e contextuais — com áudio do Tedhy. Feitos para vencer o 'esqueci totalmente'.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Palette,
    title: "Modo baixo estímulo (autismo)",
    desc: "Interface calma, sem cores fortes, sem animações e com linguagem literal. Você controla os estímulos do seu jeito.",
    color: "from-indigo-500 to-purple-500",
    tag: "Autismo 💙",
  },
  {
    icon: Mic,
    title: "Tudo por voz",
    desc: "Fale com o Tedhy para criar tarefas, anotar e planejar o dia. Para quando digitar parece um Everest.",
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: HeartHandshake,
    title: "Acolhimento, não cobrança",
    desc: "Errou um dia? Recomeçar é um toque. Sem culpa, sem 'streak perdido'. O método se adapta a você — não o contrário.",
    color: "from-pink-500 to-rose-500",
  },
];

export default function AppFeatures() {
  return (
    <section id="app" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-orange-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            🚀 O método dentro do app
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Tudo o que sua mente precisa para{" "}
            <span className="gradient-text">assumir o controle</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada recurso foi desenhado com (e para) a comunidade TDAH e autista.
            Nada de produtividade tóxica — só ferramentas que respeitam o seu
            cérebro.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="relative bg-white rounded-3xl p-6 shadow-md hover-lift ring-1 ring-gray-100"
              >
                {f.tag && (
                  <span className="absolute -top-3 right-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {f.tag}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

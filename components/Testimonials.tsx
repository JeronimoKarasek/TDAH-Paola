"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana C.",
    role: "Designer, 28 anos",
    text: "Pela primeira vez não me sinto culpada por ser eu mesma. O Tedhy entende meu ritmo e me ajuda sem cobrar. Mudou meu trabalho e minha autoestima.",
    color: "from-pink-400 to-rose-500",
    initial: "M",
  },
  {
    name: "Rodrigo L.",
    role: "Dev backend, 34 anos",
    text: "Já testei TODOS os apps de produtividade. Só esse considerou meu cérebro. Os blocos de hiperfoco com timer flexível salvaram meus deadlines.",
    color: "from-cyan-400 to-blue-500",
    initial: "R",
  },
  {
    name: "Carla P.",
    role: "Estudante de medicina",
    text: "Eu chorava antes de estudar. Agora abro o Sintonize e o Tedhy quebra tudo em micro-tarefas. Passei na residência depois de 3 tentativas!",
    color: "from-purple-400 to-fuchsia-500",
    initial: "C",
  },
  {
    name: "Felipe T.",
    role: "Empreendedor, 41 anos",
    text: "Diagnosticado aos 38. O app me deu a estrutura que eu nunca tive. Minha esposa percebeu a diferença em 2 semanas. Vale cada centavo.",
    color: "from-orange-400 to-red-500",
    initial: "F",
  },
];

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="py-20 px-4 sm:px-6 bg-gradient-to-br from-secondary-50 via-white to-primary-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-mint-500 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            💚 Histórias reais
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4">
            Mentes que se <span className="gradient-text">sintonizaram</span>
          </h2>
          <p className="text-lg text-gray-600">
            +2.500 pessoas, +180.000 tarefas concluídas, ZERO sermões de
            produtividade tóxica.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card relative hover-lift"
            >
              <Quote
                className="absolute top-4 right-4 text-primary-100"
                size={64}
              />
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="text-yellow-400 mt-3 text-lg">★★★★★</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

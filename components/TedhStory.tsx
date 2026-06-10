"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Sparkles } from "lucide-react";
import Tedhy from "./Tedhy";

/**
 * A história e o contexto do Tedh — o coração emocional da marca.
 * Mensagem central: o problema nunca foi a pessoa, foi a falta de um método.
 */
export default function TedhStory({ tedhImageUrl }: { tedhImageUrl?: string }) {
  return (
    <section id="historia" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Tedh */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center order-2 lg:order-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 rounded-full blur-3xl opacity-60" />
          <Tedhy size={320} expression="happy" imageUrl={tedhImageUrl} limbs />
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Brain size={16} /> A história do Tedh
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            “Eu também me sentia <span className="gradient-text">quebrado</span>.
            Até descobrir que eu só precisava de um método.”
          </h2>

          <div className="space-y-4 text-gray-600 text-lg">
            <p>
              O Tedh é um cérebro como o seu: cheio de ideias geniais, mil abas
              abertas ao mesmo tempo e uma energia que ninguém entendia. Por anos
              ele ouviu que era <em>preguiçoso</em>, <em>desorganizado</em>,{" "}
              <em>incapaz de focar</em>.
            </p>
            <p>
              Um dia ele percebeu a verdade que mudou tudo:{" "}
              <strong className="text-gray-900">
                o problema nunca foi ele — foi tentar usar um mundo feito para
                cérebros neurotípicos.
              </strong>{" "}
              Faltava um método que respeitasse o jeito TDAH e autista de
              funcionar.
            </p>
            <p>
              Então o Tedh colocou os óculos, arregaçou as mangas e criou o{" "}
              <strong className="text-secondary-600">Sintonize TDAH</strong>: o
              sistema que transforma o “caos” em superpoder. Hoje ele caminha ao
              seu lado, te lembrando todos os dias:{" "}
              <span className="font-display font-semibold text-primary-600">
                você não está atrasado, você só estava sem direção.
              </span>
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4">
            <Heart className="text-primary-500 flex-shrink-0" fill="currentColor" size={24} />
            <p className="text-gray-700 font-medium">
              Aqui ninguém te conserta. A gente te <strong>direciona</strong> rumo
              à felicidade, ao foco e às suas conquistas. <Sparkles className="inline text-sunny-500" size={16} />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

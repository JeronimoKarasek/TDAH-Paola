"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Instagram, Youtube } from "lucide-react";
import Tedhy from "./Tedhy";
import type { SocialLinks } from "@/lib/types";

export default function CTA({ social, tedhImageUrl }: { social?: SocialLinks; tedhImageUrl?: string }) {
  const instagram = social?.instagram?.trim() || "https://www.instagram.com/sintonize_tdah/";
  const youtube = social?.youtube?.trim();
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden gradient-bg shadow-2xl"
        >
          <div className="relative px-8 sm:px-16 py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Sparkles size={16} />
                Comece hoje, sem desculpas
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold mb-4 leading-tight">
                Sua mente merece um sistema que <em className="not-italic underline decoration-sunny-400 decoration-4 underline-offset-4">funciona</em>.
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Em 5 minutos você está sintonizado. Sem cartão de crédito para
                testar. Sem letra miúda. Sem julgamento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#planos" className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-transform">
                  Quero começar agora
                  <ArrowRight size={20} />
                </a>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-6 py-4 rounded-full ring-2 ring-white/40 hover:bg-white/25 transition-colors"
                >
                  <Instagram size={20} />
                  Seguir no Instagram
                </a>
                {youtube && (
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-6 py-4 rounded-full ring-2 ring-white/40 hover:bg-white/25 transition-colors"
                  >
                    <Youtube size={20} />
                    YouTube
                  </a>
                )}
              </div>
              <p className="text-white/80 text-sm mt-4">
                ⏱️ Leva menos de 3 minutos · 🔒 100% seguro · 💝 7 dias de
                garantia
              </p>
            </div>

            <div className="hidden lg:flex justify-center">
              <Tedhy size={280} expression="excited" imageUrl={tedhImageUrl} limbs />
            </div>
          </div>

          {/* decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

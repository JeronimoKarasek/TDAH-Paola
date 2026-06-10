"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowRight, Instagram } from "lucide-react";
import Tedhy from "./Tedhy";
import type { SocialLinks } from "@/lib/types";

interface HeroProps {
  title: string;
  subtitle: string;
  tedhImageUrl?: string;
  social?: SocialLinks;
}

export default function Hero({ title, subtitle, tedhImageUrl, social }: HeroProps) {
  const instagram = social?.instagram || "https://www.instagram.com/sintonize_tdah/";
  return (
    <section
      id="top"
      className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden confetti-bg"
    >
      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 -left-20 w-96 h-96 bg-primary-300 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 -right-20 w-96 h-96 bg-secondary-300 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent-300 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 mb-6 ring-1 ring-primary-200"
          >
            <Sparkles className="text-primary-500" size={18} />
            <span className="text-sm font-semibold text-gray-700">
              Feito por TDAHs para TDAHs ⚡
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="gradient-text">{title}</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#planos" className="btn-primary text-lg">
              <Zap size={20} />
              Sintonizar minha mente
              <ArrowRight size={20} />
            </a>
            <a href="#como-funciona" className="btn-secondary text-lg">
              Como funciona?
            </a>
          </div>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            <Instagram size={18} />
            Seguir o Tedhy no Instagram
          </a>

          <div className="mt-10 flex flex-wrap gap-8 justify-center lg:justify-start text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white" />
              </div>
              <span>
                <strong className="text-gray-900">+2.500</strong> mentes sintonizadas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-yellow-500 text-lg">★★★★★</div>
              <span>
                <strong className="text-gray-900">4.9/5</strong> de avaliação
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tedhy mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 rounded-full blur-3xl opacity-50" />
          <Tedhy size={380} expression="excited" imageUrl={tedhImageUrl} limbs />

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute top-10 right-0 sm:right-10 bg-white shadow-2xl rounded-2xl rounded-bl-none px-5 py-3 ring-2 ring-primary-300"
          >
            <p className="font-display font-semibold text-gray-800 text-sm sm:text-base">
              Oi! Eu sou o Tedhy 👋
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Vou te ajudar a focar!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

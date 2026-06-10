"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Imagem oficial do Tedh (mascote padrão). O upload do /admin tem prioridade sobre ela. */
export const TEDH_OFFICIAL_IMAGE = "/tedh-oficial.webp";

interface TedhyProps {
  size?: number;
  expression?: "happy" | "wink" | "excited" | "focused";
  floating?: boolean;
  className?: string;
  /** Quando o admin envia uma imagem custom do Tedh, ela tem prioridade sobre o padrão */
  imageUrl?: string | null;
  /** Mostra bracinhos e perninhas animados — só vale para o Tedh em SVG (a imagem oficial já tem corpo) */
  limbs?: boolean;
}

/**
 * Tedh — o cérebro de óculos roxos, mascote oficial do Sintonize TDAH.
 * Inspirado no personagem-base: cérebro rosa, óculos roxos retangulares,
 * sorriso simpático. Agora com braços e perninhas animadas (`limbs`).
 *
 * Se o admin enviar uma imagem custom (`imageUrl`), ela é exibida no lugar
 * do SVG — mantendo as animações de flutuar e os braços/pernas opcionais.
 */
export default function Tedhy({
  size = 240,
  expression = "happy",
  floating = true,
  className = "",
  imageUrl = null,
  limbs = false,
}: TedhyProps) {
  // Evita mismatch de hidratação ao escolher imagem
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fonte da imagem: custom do admin > imagem oficial padrão
  const src = imageUrl || TEDH_OFFICIAL_IMAGE;
  const useImage = mounted && !!src;
  // A imagem oficial já tem braços/pernas — só mostramos os do SVG quando NÃO há imagem
  const showLimbs = limbs && !useImage;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={
        floating
          ? {
              y: [0, -12, 0],
              rotate: [-2, 2, -2],
            }
          : {}
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* ===== BRAÇOS (atrás do corpo) ===== */}
      {showLimbs && (
        <>
          {/* braço esquerdo — acena */}
          <motion.div
            className="absolute z-0"
            style={{
              left: "-9%",
              top: "42%",
              width: "26%",
              height: "10%",
              transformOrigin: "100% 50%",
            }}
            animate={{ rotate: [10, -28, 10] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Arm flip />
          </motion.div>
          {/* braço direito — leve balanço */}
          <motion.div
            className="absolute z-0"
            style={{
              right: "-9%",
              top: "46%",
              width: "26%",
              height: "10%",
              transformOrigin: "0% 50%",
            }}
            animate={{ rotate: [-8, 12, -8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Arm />
          </motion.div>
        </>
      )}

      {/* ===== CORPO (imagem oficial/custom ou SVG fallback) ===== */}
      <div className="relative z-10 w-full h-full">
        {useImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Tedh, o mascote do Sintonize TDAH"
            className="w-full h-full object-cover rounded-[18%] drop-shadow-2xl"
          />
        ) : (
          <BrainSvg expression={expression} />
        )}
      </div>

      {/* ===== PERNAS (à frente, na base) ===== */}
      {showLimbs && (
        <>
          {/* perna esquerda */}
          <motion.div
            className="absolute z-20"
            style={{
              left: "30%",
              bottom: "-12%",
              width: "9%",
              height: "20%",
              transformOrigin: "50% 0%",
            }}
            animate={{ rotate: [-6, 8, -6] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leg />
          </motion.div>
          {/* perna direita */}
          <motion.div
            className="absolute z-20"
            style={{
              right: "30%",
              bottom: "-12%",
              width: "9%",
              height: "20%",
              transformOrigin: "50% 0%",
            }}
            animate={{ rotate: [8, -6, 8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leg />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

/* ---------------- Braço ---------------- */
function Arm({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 40"
      className="w-full h-full"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* braço */}
      <path
        d="M 5 20 Q 45 8, 78 18"
        stroke="#9333ea"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 5 20 Q 45 8, 78 18"
        stroke="#c084fc"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* mãozinha */}
      <circle cx="82" cy="18" r="13" fill="#ff8fab" stroke="#9333ea" strokeWidth="3" />
    </svg>
  );
}

/* ---------------- Perna ---------------- */
function Leg() {
  return (
    <svg viewBox="0 0 40 100" className="w-full h-full">
      {/* perna */}
      <path
        d="M 20 0 L 20 70"
        stroke="#9333ea"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 20 0 L 20 70"
        stroke="#c084fc"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* tênis */}
      <path
        d="M 8 72 Q 8 88, 22 88 L 36 88 Q 38 78, 28 72 Z"
        fill="#06b6d4"
        stroke="#0e7490"
        strokeWidth="3"
      />
      <path d="M 10 84 L 36 84" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Cérebro (rosto) ---------------- */
function BrainSvg({ expression }: { expression: TedhyProps["expression"] }) {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
    >
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9a8b" />
          <stop offset="100%" stopColor="#fb6f92" />
        </linearGradient>
        <radialGradient id="cheekGradient">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow de fundo */}
      <circle cx="120" cy="120" r="115" fill="url(#brainGlow)" />

      {/* Sparkles girando */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        <circle cx="30" cy="60" r="3" fill="#facc15" opacity="0.85" />
        <circle cx="210" cy="80" r="4" fill="#06b6d4" opacity="0.85" />
        <circle cx="200" cy="180" r="3" fill="#a855f7" opacity="0.85" />
        <circle cx="40" cy="190" r="3.5" fill="#f97316" opacity="0.85" />
      </motion.g>

      {/* ===== CÉREBRO (contorno arredondado e enrugado) ===== */}
      <path
        d="M 120 48
           C 150 40, 178 52, 188 78
           C 208 84, 212 112, 198 128
           C 206 146, 196 170, 174 174
           C 168 192, 144 200, 126 190
           C 116 198, 96 196, 90 182
           C 66 184, 48 166, 54 144
           C 38 134, 38 106, 56 96
           C 58 70, 84 56, 104 64
           C 110 52, 116 48, 120 48 Z"
        fill="url(#brainGradient)"
        stroke="#6b21a8"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Divisão central */}
      <path
        d="M 120 52 Q 116 100, 122 150 Q 124 175, 120 190"
        stroke="#6b21a8"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* Rugas do cérebro - esquerda */}
      <path d="M 70 90 Q 86 100, 80 118 Q 92 128, 82 146" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 58 122 Q 74 130, 70 150" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 96 70 Q 104 84, 100 98" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 78 165 Q 92 168, 100 178" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* Rugas do cérebro - direita */}
      <path d="M 170 90 Q 154 100, 160 118 Q 148 128, 158 146" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 184 124 Q 168 132, 172 152" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 146 70 Q 138 84, 142 98" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />
      <path d="M 160 168 Q 148 172, 140 182" stroke="#6b21a8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />

      {/* Bochechas */}
      <ellipse cx="78" cy="150" rx="12" ry="8" fill="url(#cheekGradient)" />
      <ellipse cx="162" cy="150" rx="12" ry="8" fill="url(#cheekGradient)" />

      {/* ===== ÓCULOS ROXOS (retangulares, como o print) ===== */}
      {/* lente esquerda */}
      <rect x="64" y="108" width="46" height="38" rx="12" fill="white" fillOpacity="0.92" stroke="#7c3aed" strokeWidth="6" />
      {/* lente direita */}
      <rect x="130" y="108" width="46" height="38" rx="12" fill="white" fillOpacity="0.92" stroke="#7c3aed" strokeWidth="6" />
      {/* ponte */}
      <path d="M 110 120 Q 120 114, 130 120" stroke="#7c3aed" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* hastes */}
      <path d="M 64 120 L 50 116" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />
      <path d="M 176 120 L 190 116" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" />

      {/* ===== OLHOS (com piscar) ===== */}
      <motion.g
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4, times: [0, 0.92, 0.95, 1], repeat: Infinity }}
        style={{ transformOrigin: "87px 127px" }}
      >
        <circle cx="87" cy="127" r="9" fill="#1f2937" />
        <circle cx="90" cy="123" r="3" fill="white" />
        <circle cx="84" cy="130" r="1.4" fill="white" />
      </motion.g>

      <motion.g
        animate={{
          scaleY: expression === "wink" ? [1, 0.1, 1, 1, 1] : [1, 1, 0.1, 1],
        }}
        transition={{
          duration: 4,
          times: expression === "wink" ? [0, 0.1, 0.2, 0.95, 1] : [0, 0.92, 0.95, 1],
          repeat: Infinity,
        }}
        style={{ transformOrigin: "153px 127px" }}
      >
        <circle cx="153" cy="127" r="9" fill="#1f2937" />
        <circle cx="156" cy="123" r="3" fill="white" />
        <circle cx="150" cy="130" r="1.4" fill="white" />
      </motion.g>

      {/* ===== SORRISO ===== */}
      {expression === "excited" ? (
        <path d="M 102 158 Q 120 178, 138 158 Q 138 172, 120 176 Q 102 172, 102 158 Z" fill="#6b21a8" />
      ) : (
        <path d="M 104 160 Q 120 176, 136 160" stroke="#6b21a8" strokeWidth="4" fill="none" strokeLinecap="round" />
      )}

      {/* Lâmpada de ideia */}
      <motion.g
        animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "120px 36px" }}
      >
        <circle cx="120" cy="36" r="11" fill="#facc15" />
        <rect x="116" y="45" width="8" height="4" fill="#9ca3af" rx="1" />
        <path d="M 108 32 L 103 27 M 132 32 L 137 27 M 120 23 L 120 17" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

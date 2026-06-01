"use client";

import { motion } from "framer-motion";

interface TedhyProps {
  size?: number;
  expression?: "happy" | "wink" | "excited" | "focused";
  floating?: boolean;
  className?: string;
}

export default function Tedhy({
  size = 240,
  expression = "happy",
  floating = true,
  className = "",
}: TedhyProps) {
  return (
    <motion.div
      className={`inline-block ${className}`}
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
      <svg
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* Glow background */}
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb4a2" />
            <stop offset="50%" stopColor="#ff8fab" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <linearGradient id="brainGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <radialGradient id="cheekGradient">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <circle cx="120" cy="120" r="115" fill="url(#brainGlow)" />

        {/* Floating sparkles around brain */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "120px 120px" }}
        >
          <circle cx="30" cy="60" r="3" fill="#facc15" opacity="0.8" />
          <circle cx="210" cy="80" r="4" fill="#06b6d4" opacity="0.8" />
          <circle cx="200" cy="180" r="3" fill="#a855f7" opacity="0.8" />
          <circle cx="40" cy="190" r="3.5" fill="#f97316" opacity="0.8" />
          <path
            d="M 25 120 L 28 115 L 31 120 L 28 125 Z"
            fill="#10b981"
            opacity="0.7"
          />
          <path
            d="M 215 130 L 218 125 L 221 130 L 218 135 Z"
            fill="#ff6b6b"
            opacity="0.7"
          />
        </motion.g>

        {/* BRAIN BODY - left hemisphere */}
        <path
          d="M 75 95
             C 60 90, 50 110, 55 130
             C 45 138, 48 158, 65 165
             C 70 180, 90 188, 110 180
             C 115 195, 120 195, 120 195
             L 120 80
             C 115 75, 105 73, 95 78
             C 88 70, 75 75, 75 95 Z"
          fill="url(#brainGradient)"
          stroke="#9333ea"
          strokeWidth="2.5"
        />

        {/* BRAIN BODY - right hemisphere */}
        <path
          d="M 165 95
             C 180 90, 190 110, 185 130
             C 195 138, 192 158, 175 165
             C 170 180, 150 188, 130 180
             C 125 195, 120 195, 120 195
             L 120 80
             C 125 75, 135 73, 145 78
             C 152 70, 165 75, 165 95 Z"
          fill="url(#brainGradient2)"
          stroke="#9333ea"
          strokeWidth="2.5"
        />

        {/* Brain wrinkle lines - left */}
        <path
          d="M 75 105 Q 90 110, 95 125 Q 85 135, 95 150"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 65 130 Q 78 138, 75 155"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 95 95 Q 105 105, 110 115"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Brain wrinkle lines - right */}
        <path
          d="M 165 105 Q 150 110, 145 125 Q 155 135, 145 150"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 175 130 Q 162 138, 165 155"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 145 95 Q 135 105, 130 115"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Central division */}
        <path
          d="M 120 80 L 120 195"
          stroke="#9333ea"
          strokeWidth="2"
          opacity="0.4"
        />

        {/* Cheeks */}
        <ellipse cx="80" cy="150" rx="12" ry="8" fill="url(#cheekGradient)" />
        <ellipse cx="160" cy="150" rx="12" ry="8" fill="url(#cheekGradient)" />

        {/* GLASSES - left lens */}
        <circle
          cx="92"
          cy="128"
          r="22"
          fill="white"
          fillOpacity="0.85"
          stroke="#1f2937"
          strokeWidth="3.5"
        />
        {/* Glasses reflection */}
        <ellipse
          cx="86"
          cy="122"
          rx="6"
          ry="4"
          fill="white"
          opacity="0.9"
          transform="rotate(-20 86 122)"
        />

        {/* GLASSES - right lens */}
        <circle
          cx="148"
          cy="128"
          r="22"
          fill="white"
          fillOpacity="0.85"
          stroke="#1f2937"
          strokeWidth="3.5"
        />
        <ellipse
          cx="142"
          cy="122"
          rx="6"
          ry="4"
          fill="white"
          opacity="0.9"
          transform="rotate(-20 142 122)"
        />

        {/* Glasses bridge */}
        <path
          d="M 114 128 Q 120 124, 126 128"
          stroke="#1f2937"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* EYES - with blinking animation */}
        <motion.g
          animate={{
            scaleY: expression === "wink" ? [1, 1, 1, 1] : [1, 1, 0.1, 1],
          }}
          transition={{
            duration: 4,
            times: [0, 0.92, 0.95, 1],
            repeat: Infinity,
          }}
          style={{ transformOrigin: "92px 128px" }}
        >
          <circle cx="92" cy="128" r="7" fill="#1f2937" />
          <circle cx="94" cy="125" r="2.5" fill="white" />
          <circle cx="90" cy="131" r="1.2" fill="white" />
        </motion.g>

        <motion.g
          animate={{
            scaleY:
              expression === "wink" ? [1, 0.1, 1, 1, 1] : [1, 1, 0.1, 1],
          }}
          transition={{
            duration: 4,
            times:
              expression === "wink"
                ? [0, 0.1, 0.2, 0.95, 1]
                : [0, 0.92, 0.95, 1],
            repeat: Infinity,
          }}
          style={{ transformOrigin: "148px 128px" }}
        >
          <circle cx="148" cy="128" r="7" fill="#1f2937" />
          <circle cx="150" cy="125" r="2.5" fill="white" />
          <circle cx="146" cy="131" r="1.2" fill="white" />
        </motion.g>

        {/* MOUTH - smile */}
        {expression === "excited" ? (
          <path
            d="M 105 165 Q 120 180, 135 165 Q 135 175, 120 178 Q 105 175, 105 165 Z"
            fill="#1f2937"
          />
        ) : (
          <path
            d="M 105 165 Q 120 178, 135 165"
            stroke="#1f2937"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Lightbulb idea on top */}
        <motion.g
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "120px 50px" }}
        >
          <circle cx="120" cy="50" r="12" fill="#facc15" />
          <rect x="116" y="60" width="8" height="4" fill="#9ca3af" rx="1" />
          <path
            d="M 110 45 L 105 40 M 130 45 L 135 40 M 120 36 L 120 30"
            stroke="#facc15"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

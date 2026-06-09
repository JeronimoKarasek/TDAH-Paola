"use client";

import Tedhy from "./Tedhy";
import { Heart, Instagram, Mail, Youtube, MessageCircle } from "lucide-react";
import type { SocialLinks } from "@/lib/types";

// Ícone simples do TikTok (lucide não tem oficial)
function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.5 5.5c.9 1 2.1 1.7 3.5 1.8v2.6c-1.3 0-2.6-.4-3.6-1v5.7c0 3-2.4 5.4-5.4 5.4S5.6 17.6 5.6 14.6c0-2.8 2.1-5.1 4.8-5.4v2.7c-1.2.3-2.1 1.4-2.1 2.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V2.5h2.8c0 1.1.4 2.2.0 3z" />
    </svg>
  );
}

interface FooterProps {
  tedhImageUrl?: string;
  social?: SocialLinks;
}

export default function Footer({ tedhImageUrl, social }: FooterProps) {
  const socials = [
    social?.instagram && { href: social.instagram, icon: Instagram, label: "Instagram" },
    social?.youtube && { href: social.youtube, icon: Youtube, label: "YouTube" },
    social?.tiktok && { href: social.tiktok, icon: TikTokIcon, label: "TikTok" },
    social?.whatsapp && { href: social.whatsapp, icon: MessageCircle, label: "WhatsApp" },
    social?.email && { href: `mailto:${social.email}`, icon: Mail, label: "E-mail" },
  ].filter(Boolean) as { href: string; icon: any; label: string }[];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10">
                <Tedhy size={40} floating={false} imageUrl={tedhImageUrl} />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Sintonize TDAH
              </span>
            </div>
            <p className="text-sm text-gray-400">
              O problema nunca foi você. Com o Tedh e o método certo, sua mente
              neurodivergente vira a sua maior vantagem. 💜
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#beneficios" className="hover:text-primary-400">Por que funciona</a></li>
              <li><a href="#historia" className="hover:text-primary-400">Conheça o Tedh</a></li>
              <li><a href="#planos" className="hover:text-primary-400">Planos</a></li>
              <li><a href="#faq" className="hover:text-primary-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Suporte</h4>
            <ul className="space-y-2 text-sm">
              {social?.email && (
                <li><a href={`mailto:${social.email}`} className="hover:text-primary-400">{social.email}</a></li>
              )}
              {social?.whatsapp && (
                <li><a href={social.whatsapp} className="hover:text-primary-400" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              )}
              <li>Seg–Sex, 9h às 18h</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Conecte-se</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>© 2025 Sintonize TDAH. Todos os direitos reservados.</div>
          <div className="flex items-center gap-1">
            Feito com <Heart size={14} className="text-primary-500" fill="currentColor" /> e muita dopamina
          </div>
        </div>
      </div>
    </footer>
  );
}

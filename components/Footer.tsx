"use client";

import Tedhy from "./Tedhy";
import { Heart, Instagram, Mail, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10">
                <Tedhy size={40} floating={false} />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Sintonize TDAH
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Feito por mentes neurodivergentes, para mentes neurodivergentes.
              Com muito amor 💜
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#beneficios" className="hover:text-primary-400">Benefícios</a></li>
              <li><a href="#planos" className="hover:text-primary-400">Planos</a></li>
              <li><a href="#depoimentos" className="hover:text-primary-400">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-primary-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:contato@sintonizetdah.com.br" className="hover:text-primary-400">contato@sintonizetdah.com.br</a></li>
              <li>WhatsApp: (00) 0000-0000</li>
              <li>Seg–Sex, 9h às 18h</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-3">Conecte-se</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <Youtube size={18} />
              </a>
              <a href="mailto:contato@sintonizetdah.com.br" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                <Mail size={18} />
              </a>
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

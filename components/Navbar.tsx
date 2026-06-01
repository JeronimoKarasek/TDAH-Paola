"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Tedhy from "./Tedhy";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#beneficios", label: "Por que funciona" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#planos", label: "Planos" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-12 h-12 flex-shrink-0">
            <Tedhy size={48} floating={false} />
          </div>
          <span className="font-display font-bold text-xl sm:text-2xl gradient-text">
            Sintonize TDAH
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#planos" className="btn-primary !px-6 !py-2.5 text-sm">
            Quero começar
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-medium text-gray-700 hover:text-primary-500"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#planos"
            onClick={() => setOpen(false)}
            className="btn-primary w-full !py-3 text-sm"
          >
            Quero começar
          </a>
        </div>
      )}
    </header>
  );
}

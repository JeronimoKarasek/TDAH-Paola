"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Sparkles, Rocket } from "lucide-react";
import Tedhy from "@/components/Tedhy";

export default function DashboardClient({
  name,
  email,
  tedhImageUrl,
}: {
  name: string;
  email: string;
  tedhImageUrl?: string;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch("/api/app/logout", { method: "POST" });
    } finally {
      router.push("/app/login");
    }
  }

  const first = (name || email).split(" ")[0];

  return (
    <main className="min-h-screen bg-[#fffaf3]">
      {/* Topbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
        <span className="inline-flex items-center gap-1.5 font-semibold text-secondary-600">
          <Sparkles size={18} /> Sintonize TDAH
        </span>
        <button
          onClick={logout}
          disabled={loggingOut}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 disabled:opacity-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Saindo..." : "Sair"}
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <Tedhy size={180} expression="excited" imageUrl={tedhImageUrl} limbs />
          <h1 className="font-display text-3xl font-bold mt-6">
            Olá, {first}! 👋
          </h1>
          <p className="text-gray-500 mt-2 max-w-md">
            Você está logado(a) com <span className="font-medium">{email}</span>.
            Seu painel de foco está sendo construído — em breve você terá body
            doubling, gamificação e o método completo aqui dentro.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 w-full">
            {[
              { title: "Plano de hoje", desc: "Em breve" },
              { title: "Sequência de foco", desc: "Em breve" },
              { title: "Conquistas", desc: "Em breve" },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-left"
              >
                <Rocket className="text-primary-500 mb-3" size={22} />
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

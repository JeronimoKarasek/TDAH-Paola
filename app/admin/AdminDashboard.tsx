"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Users,
  Eye,
  TrendingUp,
  Globe,
  Smartphone,
  Calendar,
  LogOut,
  Settings,
  RefreshCw,
  Save,
  Plus,
  Trash2,
  KeyRound,
  Mail,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Tedhy from "@/components/Tedhy";
import { Plan } from "@/lib/types";

const COLORS = ["#f97316", "#a855f7", "#06b6d4", "#facc15", "#10b981", "#ef4444", "#8b5cf6", "#ec4899"];

interface Stats {
  totals: {
    visits: number;
    uniqueVisitors: number;
    today: number;
    todayUnique: number;
    last7: number;
    last30: number;
    leads: number;
  };
  series: { date: string; visits: number; unique: number }[];
  devices: { name: string; value: number }[];
  browsers: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  referrers: { name: string; value: number }[];
  recent: any[];
}

interface ConfigState {
  asaasApiKey: string;
  asaasApiKeyConfigured: boolean;
  asaasEnv: "production" | "sandbox";
  plans: Plan[];
  heroTitle: string;
  heroSubtitle: string;
}

export default function AdminDashboard({ user }: { user: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"overview" | "visitors" | "leads" | "config">("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [config, setConfig] = useState<ConfigState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.ok) setStats(data);
    } finally {
      setLoading(false);
    }
  }

  async function loadLeads() {
    const res = await fetch("/api/admin/leads");
    const data = await res.json();
    if (data.ok) setLeads(data.leads);
  }

  async function loadConfig() {
    const res = await fetch("/api/admin/config");
    const data = await res.json();
    if (data.ok) setConfig(data.config);
  }

  useEffect(() => {
    loadStats();
    loadLeads();
    loadConfig();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveConfig() {
    if (!config) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const body: any = {
        asaasEnv: config.asaasEnv,
        plans: config.plans,
        heroTitle: config.heroTitle,
        heroSubtitle: config.heroSubtitle,
      };
      // Only send api key if it's not masked
      if (!config.asaasApiKey.includes("…") && config.asaasApiKey.trim()) {
        body.asaasApiKey = config.asaasApiKey;
      }
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.ok) {
        setConfig(data.config);
        setSaveMsg({ type: "ok", text: "Configurações salvas com sucesso! 🎉" });
      } else {
        setSaveMsg({ type: "err", text: data.error || "Erro ao salvar." });
      }
    } catch (err: any) {
      setSaveMsg({ type: "err", text: err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(null), 4000);
    }
  }

  function updatePlan(idx: number, key: keyof Plan, value: any) {
    if (!config) return;
    const plans = [...config.plans];
    (plans[idx] as any)[key] = value;
    setConfig({ ...config, plans });
  }

  function updatePlanFeature(planIdx: number, fIdx: number, value: string) {
    if (!config) return;
    const plans = [...config.plans];
    const features = [...plans[planIdx].features];
    features[fIdx] = value;
    plans[planIdx] = { ...plans[planIdx], features };
    setConfig({ ...config, plans });
  }

  function addFeature(planIdx: number) {
    if (!config) return;
    const plans = [...config.plans];
    plans[planIdx] = { ...plans[planIdx], features: [...plans[planIdx].features, "Novo benefício"] };
    setConfig({ ...config, plans });
  }

  function removeFeature(planIdx: number, fIdx: number) {
    if (!config) return;
    const plans = [...config.plans];
    const features = plans[planIdx].features.filter((_, i) => i !== fIdx);
    plans[planIdx] = { ...plans[planIdx], features };
    setConfig({ ...config, plans });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <Tedhy size={40} floating={false} />
            </div>
            <div>
              <div className="font-display font-bold text-lg gradient-text">Sintonize TDAH</div>
              <div className="text-xs text-gray-500">Painel administrativo</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadStats();
                loadLeads();
                loadConfig();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              title="Atualizar"
            >
              <RefreshCw size={18} />
            </button>
            <span className="text-sm text-gray-600 hidden sm:inline">Olá, <strong>{user}</strong></span>
            <button onClick={logout} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 px-3 py-2">
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 border-t border-gray-100 overflow-x-auto">
          {[
            { id: "overview", label: "Visão geral", icon: TrendingUp },
            { id: "visitors", label: "Visitantes", icon: Users },
            { id: "leads", label: "Leads / Vendas", icon: Mail },
            { id: "config", label: "Configurações", icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  tab === t.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading && !stats && <div className="text-center py-20 text-gray-500">Carregando dados...</div>}

        {/* ===== OVERVIEW ===== */}
        {tab === "overview" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Visitantes hoje" value={stats.totals.todayUnique} sub={`${stats.totals.today} pageviews`} icon={Calendar} color="from-orange-500 to-pink-500" />
              <StatCard label="Visitantes únicos" value={stats.totals.uniqueVisitors} sub={`${stats.totals.visits} pageviews totais`} icon={Users} color="from-purple-500 to-fuchsia-500" />
              <StatCard label="Últimos 7 dias" value={stats.totals.last7} sub="pageviews" icon={Eye} color="from-cyan-500 to-blue-500" />
              <StatCard label="Leads capturados" value={stats.totals.leads} sub="conversões" icon={Mail} color="from-green-500 to-emerald-500" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-4">📈 Tráfego (últimos 14 dias)</h3>
              <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={stats.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                    <Legend />
                    <Line type="monotone" dataKey="visits" name="Pageviews" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="unique" name="Únicos" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Smartphone size={18} /> Dispositivos
                </h3>
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={stats.devices} dataKey="value" nameKey="name" outerRadius={90} label>
                        {stats.devices.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">🌐 Navegadores</h3>
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer>
                    <BarChart data={stats.browsers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#a855f7" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Globe size={18} /> Países
                </h3>
                <ul className="space-y-2">
                  {stats.countries.map((c, i) => (
                    <li key={c.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="font-medium">{c.name}</span>
                      </span>
                      <span className="text-gray-600 font-mono text-sm">{c.value}</span>
                    </li>
                  ))}
                  {stats.countries.length === 0 && <li className="text-sm text-gray-400">Sem dados ainda</li>}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">🔗 Origem do tráfego</h3>
                <ul className="space-y-2">
                  {stats.referrers.map((r, i) => (
                    <li key={r.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{r.name}</span>
                      </span>
                      <span className="text-gray-600 font-mono text-sm">{r.value}</span>
                    </li>
                  ))}
                  {stats.referrers.length === 0 && <li className="text-sm text-gray-400">Sem dados ainda</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ===== VISITORS ===== */}
        {tab === "visitors" && stats && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-display font-bold text-lg">Últimos visitantes (50)</h3>
              <p className="text-sm text-gray-500">Detalhes anônimos de cada visita</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Quando</th>
                    <th className="text-left px-4 py-3 font-semibold">Local</th>
                    <th className="text-left px-4 py-3 font-semibold">Dispositivo</th>
                    <th className="text-left px-4 py-3 font-semibold">Navegador / OS</th>
                    <th className="text-left px-4 py-3 font-semibold">Página</th>
                    <th className="text-left px-4 py-3 font-semibold">Origem</th>
                    <th className="text-left px-4 py-3 font-semibold">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent.map((v) => (
                    <tr key={v.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{new Date(v.ts).toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 text-gray-700">{v.city || "?"}, {v.country || "?"}</td>
                      <td className="px-4 py-3 capitalize">{v.device}</td>
                      <td className="px-4 py-3">{v.browser} / {v.os}</td>
                      <td className="px-4 py-3 font-mono text-xs">{v.path}</td>
                      <td className="px-4 py-3 truncate max-w-[200px]">{v.referrer || "direto"}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{v.ip}</td>
                    </tr>
                  ))}
                  {stats.recent.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">Nenhum visitante ainda. Compartilhe seu link! 🚀</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== LEADS ===== */}
        {tab === "leads" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-display font-bold text-lg">Leads / Tentativas de assinatura</h3>
              <p className="text-sm text-gray-500">Pessoas que iniciaram o checkout</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Data</th>
                    <th className="text-left px-4 py-3 font-semibold">Nome</th>
                    <th className="text-left px-4 py-3 font-semibold">E-mail</th>
                    <th className="text-left px-4 py-3 font-semibold">Telefone</th>
                    <th className="text-left px-4 py-3 font-semibold">CPF</th>
                    <th className="text-left px-4 py-3 font-semibold">Plano</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{new Date(l.ts).toLocaleString("pt-BR")}</td>
                      <td className="px-4 py-3 font-medium">{l.name}</td>
                      <td className="px-4 py-3"><a href={`mailto:${l.email}`} className="text-primary-500 hover:underline">{l.email}</a></td>
                      <td className="px-4 py-3">{l.phone || "-"}</td>
                      <td className="px-4 py-3 font-mono text-xs">{l.cpf || "-"}</td>
                      <td className="px-4 py-3"><span className="inline-block bg-secondary-100 text-secondary-700 rounded-full px-2 py-0.5 text-xs font-semibold uppercase">{l.planId}</span></td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-400">Nenhum lead ainda. Hora de divulgar! 📣</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== CONFIG ===== */}
        {tab === "config" && config && (
          <div className="space-y-6 max-w-4xl">
            {saveMsg && (
              <div className={`rounded-xl px-4 py-3 text-sm flex items-center gap-2 ${saveMsg.type === "ok" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {saveMsg.type === "ok" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                {saveMsg.text}
              </div>
            )}

            {/* ASAAS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                <KeyRound size={20} className="text-primary-500" /> Integração Asaas
              </h3>
              <p className="text-sm text-gray-500 mb-4">Configure a chave de API que processará as assinaturas.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ambiente</label>
                  <select
                    value={config.asaasEnv}
                    onChange={(e) => setConfig({ ...config, asaasEnv: e.target.value as any })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 focus:border-primary-500 outline-none"
                  >
                    <option value="sandbox">Sandbox (testes)</option>
                    <option value="production">Produção (vendas reais)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chave da API {config.asaasApiKeyConfigured && <span className="text-green-600 text-xs">(configurada)</span>}
                  </label>
                  <input
                    type="password"
                    value={config.asaasApiKey}
                    onChange={(e) => setConfig({ ...config, asaasApiKey: e.target.value })}
                    placeholder={config.asaasApiKeyConfigured ? "Digite para substituir" : "$aact_..."}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 focus:border-primary-500 outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                💡 Obtenha sua chave em: Asaas → Integrações → API. Para produção use a chave que começa com <code className="bg-gray-100 px-1 rounded">$aact_prod</code>.
              </p>
            </div>

            {/* HERO */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-1">Textos da landing</h3>
              <p className="text-sm text-gray-500 mb-4">Personalize o título e o subtítulo do topo.</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título principal</label>
                  <input
                    type="text"
                    value={config.heroTitle}
                    onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                  <textarea
                    value={config.heroSubtitle}
                    onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* PLANS */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-1">Planos & Preços</h3>
              <p className="text-sm text-gray-500 mb-4">Edite valores, nomes e descrições de cada plano.</p>

              <div className="space-y-6">
                {config.plans.map((p, idx) => (
                  <div key={p.id} className="rounded-2xl border-2 border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-display font-bold text-lg">
                        Plano <span className="gradient-text">{p.name}</span>
                      </h4>
                      <label className="text-sm flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={p.highlight || false}
                          onChange={(e) => updatePlan(idx, "highlight", e.target.checked)}
                        />
                        Destacar
                      </label>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nome</label>
                        <input value={p.name} onChange={(e) => updatePlan(idx, "name", e.target.value)} className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tagline</label>
                        <input value={p.tagline} onChange={(e) => updatePlan(idx, "tagline", e.target.value)} className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Preço (R$)</label>
                        <input type="number" step="0.01" value={p.price} onChange={(e) => updatePlan(idx, "price", parseFloat(e.target.value) || 0)} className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Ciclo</label>
                        <select value={p.cycle} onChange={(e) => updatePlan(idx, "cycle", e.target.value)} className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500">
                          <option value="MONTHLY">Mensal</option>
                          <option value="YEARLY">Anual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Texto do botão</label>
                        <input value={p.cta} onChange={(e) => updatePlan(idx, "cta", e.target.value)} className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Selo (badge)</label>
                        <input value={p.badge || ""} onChange={(e) => updatePlan(idx, "badge", e.target.value)} placeholder="Ex: MAIS POPULAR" className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Benefícios incluídos</label>
                      <div className="space-y-2">
                        {p.features.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <input
                              value={f}
                              onChange={(e) => updatePlanFeature(idx, fIdx, e.target.value)}
                              className="flex-1 rounded-lg border-2 border-gray-200 px-3 py-2 outline-none focus:border-primary-500 text-sm"
                            />
                            <button onClick={() => removeFeature(idx, fIdx)} className="p-2 rounded-lg text-red-500 hover:bg-red-50">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => addFeature(idx)} className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 font-medium">
                          <Plus size={16} /> Adicionar benefício
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-4">
              <button onClick={saveConfig} disabled={saving} className="btn-primary w-full !py-4">
                <Save size={18} /> {saving ? "Salvando..." : "Salvar todas as alterações"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <div className="text-3xl font-bold font-display">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

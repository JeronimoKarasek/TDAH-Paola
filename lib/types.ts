export interface Visit {
  id: string;
  ts: number;
  ip?: string;
  country?: string;
  city?: string;
  ua?: string;
  device?: "mobile" | "tablet" | "desktop";
  browser?: string;
  os?: string;
  referrer?: string;
  path?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
}

export interface Lead {
  id: string;
  ts: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  planId: string;
  source?: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  cycle: "MONTHLY" | "YEARLY";
  highlight?: boolean;
  badge?: string;
  features: string[];
  cta: string;
  color: string;
}

export interface SocialLinks {
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  email: string;
}

/** Plataforma de uma postagem agendada */
export type SocialPlatform = "instagram" | "youtube" | "tiktok";

export type PostStatus = "scheduled" | "published" | "draft";

export interface ScheduledPost {
  id: string;
  title: string;
  caption: string;
  /** Data/hora de publicação (timestamp em ms) */
  scheduledFor: number;
  /** Em quais redes deve ser postado */
  platforms: SocialPlatform[];
  status: PostStatus;
  /** URL opcional de uma imagem/thumbnail */
  mediaUrl?: string;
  createdAt: number;
}

export interface SiteConfig {
  asaasApiKey: string;
  asaasEnv: "production" | "sandbox";
  plans: Plan[];
  heroTitle: string;
  heroSubtitle: string;
  /** Imagem custom do Tedh (data URL ou caminho), enviada pelo admin */
  tedhImageUrl: string;
  social: SocialLinks;
  /** Calendário de postagens diárias nas redes */
  posts: ScheduledPost[];
  updatedAt: number;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: "spark",
    name: "Spark",
    tagline: "Para começar a sintonizar",
    price: 29.9,
    cycle: "MONTHLY",
    features: [
      "Planner Tedhy diário simplificado",
      "Lembretes inteligentes (até 10/dia)",
      "Técnica Pomodoro adaptada para TDAH",
      "Biblioteca de hábitos iniciais",
      "Comunidade no Discord",
    ],
    cta: "Começar agora",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "focus",
    name: "Focus",
    tagline: "O queridinho dos TDAH ❤️",
    price: 49.9,
    cycle: "MONTHLY",
    highlight: true,
    badge: "MAIS POPULAR",
    features: [
      "Tudo do Spark",
      "Lembretes ilimitados + áudio",
      "Dashboard de foco com gamificação",
      "Trilhas de produtividade guiadas",
      "Metas semanais com recompensas",
      "Mentorias ao vivo mensais",
      "Modo hiperfoco com bloqueio de apps",
    ],
    cta: "Quero focar agora 🚀",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: "flow",
    name: "Flow",
    tagline: "Vida em sintonia total",
    price: 89.9,
    cycle: "MONTHLY",
    features: [
      "Tudo do Focus",
      "Sessões 1:1 com mentor TDAH (2/mês)",
      "Plano personalizado pelo Tedhy IA",
      "Acesso vitalício a cursos novos",
      "Suporte prioritário no WhatsApp",
      "Workshops exclusivos trimestrais",
      "Acompanhamento por profissional",
    ],
    cta: "Entrar em flow ✨",
    color: "from-purple-500 to-fuchsia-500",
  },
];

export const DEFAULT_SOCIAL: SocialLinks = {
  instagram: "https://www.instagram.com/sintonize_tdah/",
  youtube: "",
  tiktok: "",
  whatsapp: "",
  email: "contato@sintonizetdah.com.br",
};

export const DEFAULT_CONFIG: SiteConfig = {
  asaasApiKey: "",
  asaasEnv: "sandbox",
  plans: DEFAULT_PLANS,
  heroTitle: "O problema nunca foi você. Foi a falta de um método.",
  heroSubtitle:
    "Sua mente TDAH não precisa de conserto — precisa de direção. Com o Tedh ao seu lado, você transforma o caos em foco, o foco em hábito e o hábito em uma vida com mais felicidade e conquistas.",
  tedhImageUrl: "",
  social: DEFAULT_SOCIAL,
  posts: [],
  updatedAt: Date.now(),
};

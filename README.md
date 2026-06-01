# 🧠 Sintonize TDAH

> Organize sua mente, conquiste seu dia. Página de vendas + dashboard administrativo para um SaaS focado em pessoas com TDAH, com o mascote **Tedhy** (um cérebro de óculos animado).

![Stack](https://img.shields.io/badge/Next.js-14-black) ![TS](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

---

## ✨ O que está incluído

- 🎨 **Landing page de alta conversão** com paleta vibrante (laranja + roxo + ciano) pensada para chamar atenção de pessoas com TDAH
- 🧠 **Mascote Tedhy** — cérebro de óculos 100% feito em SVG + animações Framer Motion (pisca, flutua, brilha)
- 💰 **3 planos de assinatura** (Spark / Focus / Flow) totalmente editáveis pelo admin
- 🔐 **Dashboard /admin** protegido com login (cookie HMAC) e:
  - Visão geral com KPIs (visitantes únicos, hoje, 7 dias, 30 dias, leads)
  - Gráfico de tráfego (últimos 14 dias)
  - Distribuição por dispositivo, navegador, país e origem
  - Tabela com os últimos 50 visitantes (IP, geolocalização, UA, página, referrer)
  - Tabela de leads/tentativas de checkout
  - Editor visual dos planos (preços, descrição, benefícios, badges)
  - Configuração da **chave de API Asaas** (sandbox/produção)
  - Edição do título e subtítulo do hero
- 💳 **Integração Asaas** completa (cria customer + subscription + retorna `invoiceUrl`)
- 📊 **Tracking automático** de visitantes com geolocalização via `ip-api.com`
- 🚀 **Pronto para Vercel** (zero configuração necessária)

---

## 🏃 Como rodar localmente

```bash
npm install
cp .env.example .env.local   # ajuste as variáveis se quiser
npm run dev
```

Abra <http://localhost:3000>.

- Landing: `/`
- Admin: `/admin` → login em `/admin/login`
  - **Credenciais padrão**: `admin` / `sintonize2025` (mude no `.env`)

---

## 🚀 Deploy na Vercel

### Opção 1 — via dashboard
1. Crie um repositório Git com este código e suba.
2. Em <https://vercel.com> → **Add New Project** → importe o repositório.
3. Em **Environment Variables**, adicione:

| Variável | Descrição |
|---|---|
| `ADMIN_USER` | Usuário admin (ex: `admin`) |
| `ADMIN_PASSWORD` | Senha forte do admin |
| `ADMIN_SECRET` | String aleatória longa (HMAC do cookie) |
| `ASAAS_API_KEY` | _(opcional)_ Pode configurar depois pelo painel `/admin` |
| `ASAAS_API_URL` | _(opcional)_ `https://api.asaas.com/v3` (prod) ou `https://api-sandbox.asaas.com/v3` |

4. Click **Deploy**. Pronto! 🎉

### Opção 2 — via CLI

```bash
npm i -g vercel
vercel login
vercel
# ... siga o assistente
vercel --prod
```

> ⚠️ **Importante sobre persistência**: como Vercel é serverless, dados gravados em JSON ficam em `/tmp` e podem ser perdidos a cada cold start. Para produção, recomenda-se trocar `lib/storage.ts` por um banco real (Vercel KV, Postgres, Supabase, etc.). A integração com Asaas e o fluxo de leads funcionam normalmente — apenas as estatísticas históricas podem reiniciar.

---

## 🔑 Configurando o Asaas

1. Faça login na sua conta Asaas
2. Vá em **Integrações → API**
3. Copie a chave (começa com `$aact_…`)
4. No site, acesse `/admin` → aba **Configurações**
5. Cole a chave, escolha o ambiente (sandbox/produção) e salve

A partir daí, qualquer tentativa de assinatura no site cria automaticamente:
- Um cliente no Asaas (ou reaproveita por e-mail)
- Uma assinatura recorrente (`MONTHLY` ou `YEARLY`)
- E redireciona o usuário para a tela de pagamento (`invoiceUrl`)

---

## 🎨 Personalização

| O quê | Onde |
|---|---|
| Cores | `tailwind.config.ts` (paleta `primary`, `secondary`, `accent`) |
| Tedhy (mascote) | `components/Tedhy.tsx` (SVG inline, totalmente editável) |
| Textos do hero | `/admin` → Configurações |
| Planos | `/admin` → Configurações → Planos |
| Depoimentos | `components/Testimonials.tsx` |
| FAQ | `components/FAQ.tsx` |

---

## 📂 Estrutura do projeto

```
app/
  page.tsx               → Landing page
  admin/
    page.tsx             → Dashboard (protegido)
    AdminDashboard.tsx   → UI do dashboard
    login/page.tsx       → Tela de login
  api/
    track/               → Recebe pageviews
    checkout/            → Cria assinatura no Asaas
    auth/                → Login / logout
    admin/               → Stats, leads, config (todas protegidas)
    public/config/       → Config pública
components/
  Tedhy.tsx              → Mascote (SVG animado)
  Hero, Pricing, ...     → Seções da landing
  Tracker.tsx            → Dispara o /api/track no client
lib/
  asaas.ts               → Wrapper da API Asaas
  auth.ts                → Sessões HMAC
  config.ts              → Leitura/escrita do config persistido
  storage.ts             → JSON file storage (/tmp em prod)
  ua.ts                  → Parsing leve de User-Agent
```

---

## 🛠️ Próximos passos sugeridos

- [ ] Trocar `lib/storage.ts` por banco real (Vercel KV é o caminho mais rápido)
- [ ] Adicionar webhook do Asaas (`/api/asaas/webhook`) para registrar pagamentos confirmados
- [ ] Adicionar Google Analytics ou Plausible para análise mais robusta
- [ ] Implementar a área do assinante (`/app`) com o sistema real

---

Feito com 💜 e muita dopamina. Bora sintonizar!

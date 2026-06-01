import { getConfig } from "./config";

interface CreateCustomerInput {
  name: string;
  email: string;
  cpfCnpj?: string;
  mobilePhone?: string;
}

interface CreateSubscriptionInput {
  customer: string;
  value: number;
  nextDueDate: string; // YYYY-MM-DD
  cycle: "MONTHLY" | "YEARLY";
  description: string;
  billingType?: "BOLETO" | "CREDIT_CARD" | "PIX" | "UNDEFINED";
}

function getBase() {
  const cfg = getConfig();
  const envUrl = process.env.ASAAS_API_URL;
  if (envUrl) return envUrl.replace(/\/+$/, "");
  return cfg.asaasEnv === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";
}

function getKey() {
  return process.env.ASAAS_API_KEY || getConfig().asaasApiKey || "";
}

async function asaasRequest<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const key = getKey();
  if (!key) {
    throw new Error(
      "Chave da API Asaas não configurada. Configure em /admin → Configurações."
    );
  }
  const res = await fetch(`${getBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: key,
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  let body: any;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const msg =
      body?.errors?.[0]?.description ||
      body?.message ||
      `Asaas HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body as T;
}

export async function findOrCreateCustomer(input: CreateCustomerInput) {
  // Try to find by email first
  const list = await asaasRequest<{ data: any[] }>(
    `/customers?email=${encodeURIComponent(input.email)}`
  );
  if (list?.data?.length) return list.data[0];

  return asaasRequest("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      cpfCnpj: input.cpfCnpj,
      mobilePhone: input.mobilePhone,
    }),
  });
}

export async function createSubscription(input: CreateSubscriptionInput) {
  return asaasRequest("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: input.customer,
      billingType: input.billingType || "UNDEFINED",
      value: input.value,
      nextDueDate: input.nextDueDate,
      cycle: input.cycle,
      description: input.description,
    }),
  });
}

export async function getPaymentLinkForSubscription(subscriptionId: string) {
  // Get first payment of this subscription to redirect user to invoice
  const res = await asaasRequest<{ data: any[] }>(
    `/subscriptions/${subscriptionId}/payments`
  );
  const first = res?.data?.[0];
  return first?.invoiceUrl || first?.bankSlipUrl || null;
}

export function todayYMD(): string {
  const d = new Date();
  // Asaas requires nextDueDate >= tomorrow in some cases; we use tomorrow
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

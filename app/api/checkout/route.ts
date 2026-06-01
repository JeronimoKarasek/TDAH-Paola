import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/config";
import {
  createSubscription,
  findOrCreateCustomer,
  getPaymentLinkForSubscription,
  todayYMD,
} from "@/lib/asaas";
import { appendJSON } from "@/lib/storage";
import { Lead } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, cpf, planId } = body || {};

    if (!name || !email || !planId) {
      return NextResponse.json(
        { ok: false, error: "Preencha nome, e-mail e selecione um plano." },
        { status: 400 }
      );
    }

    const cfg = getConfig();
    const plan = cfg.plans.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { ok: false, error: "Plano não encontrado." },
        { status: 400 }
      );
    }

    // Save lead regardless
    const lead: Lead = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
      name,
      email,
      phone,
      cpf,
      planId,
      source: body.source || "site",
    };
    appendJSON<Lead>("leads.json", lead);

    // Try Asaas integration
    const apiKey = process.env.ASAAS_API_KEY || cfg.asaasApiKey;
    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        leadOnly: true,
        message:
          "Recebemos seus dados! Em instantes entraremos em contato com o link de pagamento.",
      });
    }

    const customer = await findOrCreateCustomer({
      name,
      email,
      cpfCnpj: cpf,
      mobilePhone: phone,
    });

    const sub = await createSubscription({
      customer: customer.id,
      value: plan.price,
      nextDueDate: todayYMD(),
      cycle: plan.cycle,
      description: `Assinatura Sintonize TDAH - Plano ${plan.name}`,
      billingType: "UNDEFINED",
    });

    const invoiceUrl = await getPaymentLinkForSubscription(sub.id).catch(() => null);

    return NextResponse.json({
      ok: true,
      subscriptionId: sub.id,
      invoiceUrl,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Erro ao criar assinatura." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getConfig, saveConfig } from "@/lib/config";
import { getSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }
  const cfg = getConfig();
  // Mask api key for safety
  const masked = cfg.asaasApiKey
    ? cfg.asaasApiKey.slice(0, 6) + "…" + cfg.asaasApiKey.slice(-4)
    : "";
  return NextResponse.json({
    ok: true,
    config: {
      ...cfg,
      asaasApiKey: masked,
      asaasApiKeyConfigured: !!cfg.asaasApiKey,
    },
  });
}

export async function PUT(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const update: any = {};

  if (typeof body.asaasApiKey === "string" && !body.asaasApiKey.includes("…")) {
    update.asaasApiKey = body.asaasApiKey.trim();
  }
  if (body.asaasEnv === "production" || body.asaasEnv === "sandbox") {
    update.asaasEnv = body.asaasEnv;
  }
  if (Array.isArray(body.plans)) {
    update.plans = body.plans;
  }
  if (typeof body.heroTitle === "string") update.heroTitle = body.heroTitle;
  if (typeof body.heroSubtitle === "string") update.heroSubtitle = body.heroSubtitle;

  const saved = saveConfig(update);
  return NextResponse.json({
    ok: true,
    config: {
      ...saved,
      asaasApiKey: saved.asaasApiKey
        ? saved.asaasApiKey.slice(0, 6) + "…" + saved.asaasApiKey.slice(-4)
        : "",
      asaasApiKeyConfigured: !!saved.asaasApiKey,
    },
  });
}

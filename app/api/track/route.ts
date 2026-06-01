import { NextRequest, NextResponse } from "next/server";
import { appendJSON } from "@/lib/storage";
import { parseUA } from "@/lib/ua";
import { Visit } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getIP(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

async function geoLookup(ip: string): Promise<{ country?: string; city?: string }> {
  if (!ip || ip === "0.0.0.0" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip === "::1") {
    return { country: "Local", city: "Local" };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return {};
    const j = await res.json();
    if (j.status !== "success") return {};
    return { country: j.country, city: j.city };
  } catch {
    return {};
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ua = req.headers.get("user-agent") || "";
    const ip = getIP(req);
    const { device, browser, os } = parseUA(ua);
    const geo = await geoLookup(ip);

    const visit: Visit = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
      ip,
      ua,
      device,
      browser,
      os,
      country: geo.country,
      city: geo.city,
      referrer: body.referrer || req.headers.get("referer") || "direto",
      path: body.path || "/",
      utm: body.utm || {},
    };

    appendJSON<Visit>("visitors.json", visit);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

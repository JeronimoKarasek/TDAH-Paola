import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/storage";
import { Visit, Lead } from "@/lib/types";
import { getSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  const visits = readJSON<Visit[]>("visitors.json", []);
  const leads = readJSON<Lead[]>("leads.json", []);

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const today = visits.filter((v) => now - v.ts < day);
  const last7 = visits.filter((v) => now - v.ts < 7 * day);
  const last30 = visits.filter((v) => now - v.ts < 30 * day);

  // Unique by IP for visitor count
  const uniqueIps = new Set(visits.map((v) => v.ip || "?")).size;
  const todayUnique = new Set(today.map((v) => v.ip || "?")).size;

  // Daily series (last 14 days)
  const series: { date: string; visits: number; unique: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const start = now - (i + 1) * day;
    const end = now - i * day;
    const dayVisits = visits.filter((v) => v.ts >= start && v.ts < end);
    const dayUnique = new Set(dayVisits.map((v) => v.ip || "?")).size;
    const date = new Date(end - day / 2).toISOString().slice(5, 10); // MM-DD
    series.push({ date, visits: dayVisits.length, unique: dayUnique });
  }

  // Breakdowns
  function bucket<T extends keyof Visit>(field: T) {
    const map: Record<string, number> = {};
    for (const v of visits) {
      const k = (v[field] as any) || "Desconhecido";
      map[k] = (map[k] || 0) + 1;
    }
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }

  const devices = bucket("device");
  const browsers = bucket("browser").slice(0, 6);
  const countries = bucket("country").slice(0, 8);
  const referrers = bucket("referrer").slice(0, 8);

  // Recent visitors (last 50)
  const recent = visits.slice(-50).reverse().map((v) => ({
    id: v.id,
    ts: v.ts,
    ip: v.ip,
    device: v.device,
    browser: v.browser,
    os: v.os,
    country: v.country,
    city: v.city,
    path: v.path,
    referrer: v.referrer,
  }));

  return NextResponse.json({
    ok: true,
    totals: {
      visits: visits.length,
      uniqueVisitors: uniqueIps,
      today: today.length,
      todayUnique,
      last7: last7.length,
      last30: last30.length,
      leads: leads.length,
    },
    series,
    devices,
    browsers,
    countries,
    referrers,
    recent,
  });
}

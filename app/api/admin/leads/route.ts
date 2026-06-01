import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/storage";
import { Lead } from "@/lib/types";
import { getSessionFromRequest } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }
  const leads = readJSON<Lead[]>("leads.json", []);
  return NextResponse.json({ ok: true, leads: leads.slice(-200).reverse() });
}

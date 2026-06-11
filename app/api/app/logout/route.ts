import { NextResponse } from "next/server";
import { clearAppSessionCookie } from "@/lib/appAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  clearAppSessionCookie();
  return NextResponse.json({ ok: true });
}

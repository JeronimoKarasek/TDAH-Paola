import { NextRequest, NextResponse } from "next/server";
import { createSession, setSessionCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const user = String(body.user || "");
  const pass = String(body.password || "");

  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "sintonize2025";

  if (user !== expectedUser || pass !== expectedPass) {
    return NextResponse.json(
      { ok: false, error: "Usuário ou senha incorretos" },
      { status: 401 }
    );
  }

  const token = createSession(user);
  setSessionCookie(token);
  return NextResponse.json({ ok: true });
}

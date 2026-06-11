import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { createAppSession, setAppSessionCookie } from "@/lib/appAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Banco de dados não configurado. Contate o administrador." },
      { status: 503 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Informe e-mail e senha." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: user, error } = await supabase
    .from("app_users")
    .select("id, name, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("[login] lookup error", error);
    return NextResponse.json(
      { error: "Erro ao entrar. Tente novamente." },
      { status: 500 }
    );
  }

  // Mensagem genérica para não revelar se o e-mail existe
  const invalid = NextResponse.json(
    { error: "E-mail ou senha incorretos." },
    { status: 401 }
  );

  if (!user || !user.password_hash) return invalid;

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return invalid;

  const token = createAppSession({ id: user.id, email: user.email });
  setAppSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

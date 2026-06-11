import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { createAppSession, setAppSessionCookie } from "@/lib/appAuth";

export const dynamic = "force-dynamic";

function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

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

  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  // Validações
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Informe seu nome." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "A senha precisa ter pelo menos 8 caracteres." },
      { status: 400 }
    );
  }
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return NextResponse.json(
      { error: "A senha precisa ter uma letra maiúscula e um número." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Verifica se o e-mail já existe
  const { data: existing, error: lookupError } = await supabase
    .from("app_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) {
    console.error("[signup] lookup error", lookupError);
    return NextResponse.json(
      { error: "Erro ao verificar e-mail. Tente novamente." },
      { status: 500 }
    );
  }
  if (existing) {
    return NextResponse.json(
      { error: "Este e-mail já está cadastrado. Faça login." },
      { status: 409 }
    );
  }

  // Hash da senha
  const password_hash = await bcrypt.hash(password, 10);

  const { data: user, error: insertError } = await supabase
    .from("app_users")
    .insert({ name, email, password_hash })
    .select("id, email, name")
    .single();

  if (insertError || !user) {
    console.error("[signup] insert error", insertError);
    // Possível corrida: e-mail duplicado (unique constraint)
    if ((insertError as any)?.code === "23505") {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado. Faça login." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Não foi possível criar a conta. Tente novamente." },
      { status: 500 }
    );
  }

  // Cria a sessão
  const token = createAppSession({ id: user.id, email: user.email });
  setAppSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

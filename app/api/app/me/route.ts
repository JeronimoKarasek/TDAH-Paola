import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { getAppSessionFromRequest } from "@/lib/appAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getAppSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  // Sessão válida — busca dados atualizados se o banco estiver disponível
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data: user } = await supabase
        .from("app_users")
        .select("id, name, email, plan_id, email_verified")
        .eq("id", session.id)
        .maybeSingle();

      if (user) {
        return NextResponse.json({ user });
      }
    } catch (e) {
      console.error("[me] error", e);
    }
  }

  // Fallback: dados do token
  return NextResponse.json({
    user: { id: session.id, email: session.email },
  });
}

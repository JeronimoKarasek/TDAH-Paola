import { redirect } from "next/navigation";
import { getConfig } from "@/lib/config";
import { getAppSessionFromCookies } from "@/lib/appAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = getAppSessionFromCookies();
  if (!session) {
    redirect("/app/login");
  }

  const cfg = getConfig();
  let name = "";
  let email = session.email;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data: user } = await supabase
        .from("app_users")
        .select("name, email")
        .eq("id", session.id)
        .maybeSingle();
      if (user) {
        name = user.name || "";
        email = user.email || email;
      }
    } catch {
      // ignora — usa dados do token
    }
  }

  return <DashboardClient name={name} email={email} tedhImageUrl={cfg.tedhImageUrl} />;
}

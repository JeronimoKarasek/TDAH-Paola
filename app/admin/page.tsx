import { getSessionFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const session = getSessionFromCookies();
  if (!session) redirect("/admin/login");
  return <AdminDashboard user={session.user} />;
}

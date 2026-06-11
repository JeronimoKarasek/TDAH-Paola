import { getConfig } from "@/lib/config";
import AppLogin from "./AppLogin";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const cfg = getConfig();
  return <AppLogin tedhImageUrl={cfg.tedhImageUrl} />;
}

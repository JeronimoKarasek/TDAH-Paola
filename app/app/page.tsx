import { getConfig } from "@/lib/config";
import AppOnboarding from "./AppOnboarding";

export const dynamic = "force-dynamic";

export default function AppEntry() {
  const cfg = getConfig();
  return <AppOnboarding tedhImageUrl={cfg.tedhImageUrl} />;
}

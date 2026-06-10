import { readJSON, writeJSON } from "./storage";
import { DEFAULT_CONFIG, DEFAULT_SOCIAL, SiteConfig } from "./types";

const FILE = "config.json";

export function getConfig(): SiteConfig {
  const cfg = readJSON<SiteConfig>(FILE, DEFAULT_CONFIG);
  // Migração: garante que campos novos existam em configs antigas
  if (!cfg.plans || cfg.plans.length === 0) {
    cfg.plans = DEFAULT_CONFIG.plans;
  }
  if (!cfg.social) {
    cfg.social = { ...DEFAULT_SOCIAL };
  } else {
    cfg.social = { ...DEFAULT_SOCIAL, ...cfg.social };
  }
  if (typeof cfg.tedhImageUrl !== "string") cfg.tedhImageUrl = "";
  if (!Array.isArray(cfg.posts)) cfg.posts = [];
  return cfg;
}

export function saveConfig(partial: Partial<SiteConfig>): SiteConfig {
  const current = getConfig();
  const updated: SiteConfig = {
    ...current,
    ...partial,
    updatedAt: Date.now(),
  };
  writeJSON(FILE, updated);
  return updated;
}

/**
 * Returns the config that is safe to be sent to the client (no API keys).
 */
export function getPublicConfig() {
  const cfg = getConfig();
  return {
    plans: cfg.plans,
    heroTitle: cfg.heroTitle,
    heroSubtitle: cfg.heroSubtitle,
    tedhImageUrl: cfg.tedhImageUrl,
    social: cfg.social,
  };
}

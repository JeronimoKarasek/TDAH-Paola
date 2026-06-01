// Lightweight User-Agent parsing — no dependency
export function parseUA(ua?: string) {
  if (!ua) return { device: "desktop" as const, browser: "Unknown", os: "Unknown" };
  const lower = ua.toLowerCase();

  let device: "mobile" | "tablet" | "desktop" = "desktop";
  if (/ipad|tablet/.test(lower)) device = "tablet";
  else if (/mobi|iphone|android.*mobile/.test(lower)) device = "mobile";

  let browser = "Outro";
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("chrome/") && !lower.includes("edg/")) browser = "Chrome";
  else if (lower.includes("safari/") && !lower.includes("chrome/")) browser = "Safari";
  else if (lower.includes("firefox/")) browser = "Firefox";
  else if (lower.includes("opr/") || lower.includes("opera")) browser = "Opera";

  let os = "Outro";
  if (lower.includes("windows")) os = "Windows";
  else if (lower.includes("mac os")) os = "macOS";
  else if (lower.includes("android")) os = "Android";
  else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) os = "iOS";
  else if (lower.includes("linux")) os = "Linux";

  return { device, browser, os };
}

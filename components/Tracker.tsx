"use client";

import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    // Avoid double-counting on dev StrictMode and avoid tracking admin
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;
    const key = "sintonize_tracked_session";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    const params = new URLSearchParams(window.location.search);
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || "direto",
        utm: {
          source: params.get("utm_source") || undefined,
          medium: params.get("utm_medium") || undefined,
          campaign: params.get("utm_campaign") || undefined,
        },
      }),
    }).catch(() => {});
  }, []);
  return null;
}

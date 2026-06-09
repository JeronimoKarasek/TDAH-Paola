import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { getConfig, saveConfig } from "@/lib/config";
import { ScheduledPost, SocialPlatform } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_PLATFORMS: SocialPlatform[] = ["instagram", "youtube", "tiktok"];

function sanitizePost(body: any, existing?: ScheduledPost): ScheduledPost {
  const platforms = Array.isArray(body.platforms)
    ? body.platforms.filter((p: any) => VALID_PLATFORMS.includes(p))
    : existing?.platforms || [];

  return {
    id: existing?.id || body.id || `post_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: String(body.title ?? existing?.title ?? "").slice(0, 140),
    caption: String(body.caption ?? existing?.caption ?? "").slice(0, 2200),
    scheduledFor: Number(body.scheduledFor) || existing?.scheduledFor || Date.now(),
    platforms,
    status: ["scheduled", "published", "draft"].includes(body.status)
      ? body.status
      : existing?.status || "scheduled",
    mediaUrl: typeof body.mediaUrl === "string" ? body.mediaUrl : existing?.mediaUrl,
    createdAt: existing?.createdAt || Date.now(),
  };
}

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  const cfg = getConfig();
  const posts = [...cfg.posts].sort((a, b) => a.scheduledFor - b.scheduledFor);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const cfg = getConfig();
  const post = sanitizePost(body);
  const posts = [...cfg.posts, post];
  saveConfig({ posts });
  return NextResponse.json({ ok: true, post, posts });
}

export async function PUT(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const cfg = getConfig();
  const idx = cfg.posts.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ ok: false, error: "Postagem não encontrada" }, { status: 404 });

  const updated = sanitizePost(body, cfg.posts[idx]);
  const posts = [...cfg.posts];
  posts[idx] = updated;
  saveConfig({ posts });
  return NextResponse.json({ ok: true, post: updated, posts });
}

export async function DELETE(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const cfg = getConfig();
  const posts = cfg.posts.filter((p) => p.id !== id);
  saveConfig({ posts });
  return NextResponse.json({ ok: true, posts });
}

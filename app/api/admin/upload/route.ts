import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { saveConfig } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Limite de ~2MB para a imagem do Tedh (armazenada como data URL no config)
const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

/**
 * Upload da imagem oficial do Tedh.
 * Aceita multipart/form-data (campo `file`) e salva como data URL no config,
 * funcionando inclusive no ambiente serverless da Vercel.
 */
export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const blob = file as File;

    if (!ALLOWED.includes(blob.type)) {
      return NextResponse.json(
        { ok: false, error: "Formato inválido. Use PNG, JPG, WEBP, GIF ou SVG." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await blob.arrayBuffer());
    if (buffer.length > MAX_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Imagem muito grande (máx. 2MB). Comprima e tente de novo." },
        { status: 400 }
      );
    }

    const dataUrl = `data:${blob.type};base64,${buffer.toString("base64")}`;
    saveConfig({ tedhImageUrl: dataUrl });

    return NextResponse.json({ ok: true, tedhImageUrl: dataUrl });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Falha no upload." }, { status: 500 });
  }
}

/** Remove a imagem custom, voltando ao Tedh em SVG */
export async function DELETE(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }
  saveConfig({ tedhImageUrl: "" });
  return NextResponse.json({ ok: true });
}

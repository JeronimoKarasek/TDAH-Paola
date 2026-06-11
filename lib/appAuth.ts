import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

/**
 * Sessão dos usuários do APP (assinantes) — separada da sessão do /admin.
 * Cookie assinado com HMAC contendo o id e o e-mail do usuário.
 */
const COOKIE_NAME = "tedhy_app_session";

function getSecret() {
  return process.env.APP_SESSION_SECRET || "dev-app-secret-change-me";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export interface AppSession {
  id: string;
  email: string;
}

export function createAppSession(user: AppSession) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 dias
  const payload = `${user.id}|${user.email}|${exp}`;
  const sig = sign(payload);
  // base64 para evitar problemas com caracteres no cookie
  return Buffer.from(`${payload}|${sig}`).toString("base64");
}

export function verifyAppToken(token?: string | null): AppSession | null {
  if (!token) return null;
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const parts = raw.split("|");
    if (parts.length !== 4) return null;
    const [id, email, expStr, sig] = parts;
    const expected = sign(`${id}|${email}|${expStr}`);
    if (sig !== expected) return null;
    const exp = parseInt(expStr, 10);
    if (!exp || exp < Date.now()) return null;
    return { id, email };
  } catch {
    return null;
  }
}

export function setAppSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAppSessionCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getAppSessionFromCookies(): AppSession | null {
  const t = cookies().get(COOKIE_NAME)?.value;
  return verifyAppToken(t);
}

export function getAppSessionFromRequest(req: NextRequest): AppSession | null {
  const t = req.cookies.get(COOKIE_NAME)?.value;
  return verifyAppToken(t);
}

export const APP_COOKIE = COOKIE_NAME;

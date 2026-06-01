import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "sintonize_admin";

function getSecret() {
  return process.env.ADMIN_SECRET || "dev-secret-change-me";
}

function sign(payload: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
}

export function createSession(user: string) {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = `${user}.${exp}`;
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyToken(token?: string | null): { user: string } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [user, expStr, sig] = parts;
  const expected = sign(`${user}.${expStr}`);
  if (sig !== expected) return null;
  const exp = parseInt(expStr, 10);
  if (!exp || exp < Date.now()) return null;
  return { user };
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getSessionFromCookies(): { user: string } | null {
  const t = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(t);
}

export function getSessionFromRequest(req: NextRequest): { user: string } | null {
  const t = req.cookies.get(COOKIE_NAME)?.value;
  return verifyToken(t);
}

export const ADMIN_COOKIE = COOKIE_NAME;

// Simple file-based JSON storage. On Vercel, /tmp is the only writable path
// during runtime, so we use it. For production, replace this with a real DB.

import fs from "fs";
import path from "path";

const isProd = process.env.NODE_ENV === "production";
// On Vercel only /tmp is writable
const DATA_DIR = isProd && process.env.VERCEL ? "/tmp/sintonize-data" : path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string) {
  ensureDir();
  return path.join(DATA_DIR, name);
}

export function readJSON<T>(name: string, fallback: T): T {
  try {
    const fp = filePath(name);
    if (!fs.existsSync(fp)) return fallback;
    const raw = fs.readFileSync(fp, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(name: string, data: T): void {
  const fp = filePath(name);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), "utf-8");
}

export function appendJSON<T>(name: string, item: T): void {
  const list = readJSON<T[]>(name, []);
  list.push(item);
  writeJSON(name, list);
}

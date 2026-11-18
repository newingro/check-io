import "server-only";
import { createHash } from "node:crypto";

/** Verifica che la richiesta provenga dallo stesso sito (protezione CSRF di base). */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // I browser moderni inviano sempre Origin per le POST fetch: in sua assenza rifiutiamo.
    return false;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Chiave anonima del client per il rate limiting (hash dell'IP, mai salvato in chiaro). */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`check-io:${ip}`).digest("hex").slice(0, 32);
}

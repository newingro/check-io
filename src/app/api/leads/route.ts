import { randomBytes } from "node:crypto";
import { deliverLead } from "@/lib/leads/deliver";
import { clientKey, isSameOrigin } from "@/lib/security/request";
import { createRateLimiter, createRecentSet } from "@/lib/security/rate-limit";
import { leadRequestSchema, type LeadApiResponse, type LeadErrorCode } from "@/lib/validation/lead";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_TIME_MS = 2500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const recentSubmissions = createRecentSet(15 * 60 * 1000);

function json(body: LeadApiResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function fail(code: LeadErrorCode, message: string, status: number, extra?: Partial<LeadApiResponse>, headers?: HeadersInit) {
  return json({ ok: false, code, message, ...extra }, status, headers);
}

function newReference() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `CK-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return fail("forbidden", "Richiesta non autorizzata.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail("invalid", "Formato della richiesta non valido.", 415);
  }
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return fail("payload_too_large", "La richiesta è troppo grande.", 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail("payload_too_large", "La richiesta è troppo grande.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("invalid", "Formato della richiesta non valido.", 400);
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.filter((p) => p !== "data").join(".") || "form";
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return fail("invalid", "Alcuni campi non sono validi. Controlla i dati inseriti.", 422, { fieldErrors });
  }

  const { meta, ...lead } = parsed.data;

  // Campo trappola compilato: risposta neutra, nessun inoltro.
  if (meta.hp.trim() !== "") {
    return json({ ok: true, reference: newReference() }, 200);
  }

  const elapsed = Date.now() - meta.startedAt;
  if (elapsed < MIN_FILL_TIME_MS) {
    return fail("too_fast", "Invio troppo rapido: attendi qualche secondo e riprova.", 429);
  }
  if (elapsed > MAX_FORM_AGE_MS) {
    return fail("invalid", "Il modulo è scaduto: ricarica la pagina e riprova.", 400);
  }

  const duplicateOf = recentSubmissions.get(meta.submissionId);
  if (duplicateOf) {
    return json({ ok: true, reference: duplicateOf }, 200);
  }

  const rate = limiter.check(clientKey(request));
  if (!rate.allowed) {
    return fail(
      "rate_limited",
      "Hai inviato diverse richieste in poco tempo. Riprova più tardi oppure contattaci per telefono o WhatsApp.",
      429,
      undefined,
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const reference = newReference();
  const outcome = await deliverLead(lead, reference);

  if (outcome.status === "not_configured") {
    console.warn(`[leads] nessun canale di consegna configurato (tipo=${lead.type}).`);
    return fail(
      "not_configured",
      "L'invio online non è ancora attivo. Contattaci per telefono o su WhatsApp: risponderemo volentieri.",
      503,
    );
  }
  if (outcome.status === "failed") {
    return fail(
      "delivery_failed",
      "Non siamo riusciti a ricevere la richiesta. Riprova tra qualche minuto oppure contattaci per telefono o su WhatsApp.",
      502,
    );
  }

  recentSubmissions.set(meta.submissionId, reference);
  console.info(`[leads] richiesta ricevuta tipo=${lead.type} ref=${reference} canali=${outcome.channels.join(",")}`);
  return json({ ok: true, reference }, 201);
}

export function GET() {
  return fail("invalid", "Metodo non consentito.", 405, undefined, { Allow: "POST" });
}

import "server-only";
import { createHmac } from "node:crypto";
import type { Lead } from "@/lib/validation/lead";
import { leadHtml, leadSubject, leadText } from "./format";

/**
 * Consegna dei lead verso i canali configurati tramite variabili d'ambiente.
 *
 * - Email via Resend (REST API): RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL
 * - Webhook (CRM, automazioni): LEADS_WEBHOOK_URL, LEADS_WEBHOOK_SECRET (facoltativo)
 *
 * La richiesta è considerata ricevuta solo se almeno un canale conferma la
 * consegna. Se nessun canale è configurato la funzione lo dichiara
 * esplicitamente: il sito non simula mai un invio riuscito.
 */

export type DeliveryOutcome =
  | { status: "delivered"; channels: string[] }
  | { status: "not_configured" }
  | { status: "failed"; channels: string[] };

interface Channel {
  name: string;
  send: (lead: Lead, reference: string, receivedAt: Date) => Promise<void>;
}

function configuredChannels(): Channel[] {
  const channels: Channel[] = [];
  const { RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL, LEADS_WEBHOOK_URL, LEADS_WEBHOOK_SECRET } = process.env;

  if (RESEND_API_KEY && LEADS_TO_EMAIL && LEADS_FROM_EMAIL) {
    channels.push({
      name: "email",
      async send(lead, reference, receivedAt) {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": reference,
          },
          body: JSON.stringify({
            from: LEADS_FROM_EMAIL,
            to: LEADS_TO_EMAIL.split(",").map((s) => s.trim()).filter(Boolean),
            reply_to: lead.data.email,
            subject: leadSubject(lead, reference),
            text: leadText(lead, reference, receivedAt),
            html: leadHtml(lead, reference, receivedAt),
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          throw new Error(`Resend HTTP ${response.status}`);
        }
      },
    });
  }

  if (LEADS_WEBHOOK_URL) {
    channels.push({
      name: "webhook",
      async send(lead, reference, receivedAt) {
        const body = JSON.stringify({
          event: "lead.created",
          reference,
          receivedAt: receivedAt.toISOString(),
          source: "check-io.it",
          lead,
        });
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (LEADS_WEBHOOK_SECRET) {
          headers["X-CheckIO-Signature"] = `sha256=${createHmac("sha256", LEADS_WEBHOOK_SECRET).update(body).digest("hex")}`;
        }
        const response = await fetch(LEADS_WEBHOOK_URL, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(8000),
        });
        if (!response.ok) {
          throw new Error(`Webhook HTTP ${response.status}`);
        }
      },
    });
  }

  return channels;
}

export function isDeliveryConfigured(): boolean {
  return configuredChannels().length > 0;
}

export async function deliverLead(lead: Lead, reference: string): Promise<DeliveryOutcome> {
  const channels = configuredChannels();
  if (channels.length === 0) {
    return { status: "not_configured" };
  }
  const receivedAt = new Date();
  const results = await Promise.allSettled(channels.map((c) => c.send(lead, reference, receivedAt)));
  const delivered = channels.filter((_, i) => results[i].status === "fulfilled").map((c) => c.name);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      // Nessun dato personale nei log: solo canale, riferimento ed errore tecnico.
      console.error(`[leads] consegna fallita canale=${channels[i].name} ref=${reference}:`, String(result.reason));
    }
  });
  if (delivered.length > 0) {
    return { status: "delivered", channels: delivered };
  }
  return { status: "failed", channels: channels.map((c) => c.name) };
}

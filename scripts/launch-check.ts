/**
 * Elenca i dati ancora mancanti prima della pubblicazione definitiva.
 * Uso: npm run check:launch
 */
import { getLaunchChecklist } from "../src/config/site.ts";

const missing = getLaunchChecklist();
const deliveryVars = ["RESEND_API_KEY", "LEADS_TO_EMAIL", "LEADS_FROM_EMAIL"];
const hasEmail = deliveryVars.every((name) => Boolean(process.env[name]));
const hasWebhook = Boolean(process.env.LEADS_WEBHOOK_URL);

console.log("\nCHECK-iO — verifica pre-pubblicazione\n");
if (missing.length === 0) {
  console.log("✔ Dati societari e legali completi.");
} else {
  console.log("Dati da completare in src/config/site.ts:");
  for (const item of missing) console.log(`  • ${item.label} (${item.key})`);
}
console.log(
  hasEmail || hasWebhook
    ? `\n✔ Canale di ricezione lead configurato in questo ambiente (${[hasEmail && "email", hasWebhook && "webhook"].filter(Boolean).join(", ")}).`
    : "\n✖ Nessun canale di ricezione lead configurato in questo ambiente: imposta RESEND_API_KEY + LEADS_TO_EMAIL + LEADS_FROM_EMAIL oppure LEADS_WEBHOOK_URL.",
);
console.log("");

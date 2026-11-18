import {
  CONTACT_METHODS,
  optionLabel,
  PREFERRED_TIMES,
  PROPERTY_TYPES,
  RENTAL_STATUSES,
  REQUEST_TYPES,
  type Lead,
} from "../validation/lead.ts";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Rimuove caratteri di controllo che potrebbero alterare intestazioni o log. */
export function sanitizeLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
  useGrouping: "always",
});

export interface LeadRow {
  label: string;
  value: string;
}

export function leadDisplayName(lead: Lead): string {
  return lead.type === "consulenza" ? lead.data.fullName : `${lead.data.firstName} ${lead.data.lastName}`;
}

export function leadRows(lead: Lead): LeadRow[] {
  if (lead.type === "consulenza") {
    const d = lead.data;
    return [
      { label: "Nome e cognome", value: d.fullName },
      { label: "Email", value: d.email },
      { label: "Telefono", value: d.phone },
      { label: "Località dell'immobile", value: d.location },
      { label: "Tipologia della richiesta", value: optionLabel(REQUEST_TYPES, d.requestType) },
      { label: "Fascia oraria preferita", value: optionLabel(PREFERRED_TIMES, d.preferredTime) },
      { label: "Contatto preferito", value: optionLabel(CONTACT_METHODS, d.contactMethod) },
      { label: "Messaggio", value: d.message },
    ];
  }
  const d = lead.data;
  const rows: LeadRow[] = [
    { label: "Nome", value: d.firstName },
    { label: "Cognome", value: d.lastName },
    { label: "Email", value: d.email },
    { label: "Telefono", value: d.phone },
    { label: "Comune dell'immobile", value: d.municipality },
    { label: "Tipologia di immobile", value: optionLabel(PROPERTY_TYPES, d.propertyType) },
    { label: "Numero di camere", value: String(d.bedrooms) },
    { label: "Posti letto", value: String(d.beds) },
    { label: "Stato attuale", value: optionLabel(RENTAL_STATUSES, d.rentalStatus) },
    { label: "Messaggio", value: d.message ? d.message : "—" },
  ];
  if (d.simulation) {
    const s = d.simulation;
    rows.push({
      label: "Simulazione (valori indicativi inseriti dall'utente, non verificati)",
      value: `Tariffa media ${euro.format(s.nightlyRate)}/notte · Occupazione ${s.occupancy}% · ${s.availableDays} giorni disponibili · Commissione ${s.commission}%`,
    });
  }
  return rows;
}

export function leadSubject(lead: Lead, reference: string): string {
  const kind = lead.type === "consulenza" ? "Richiesta di consulenza" : "Richiesta di valutazione immobile";
  return sanitizeLine(`[CHECK-iO] ${kind} — ${leadDisplayName(lead)} (${reference})`);
}

export function leadText(lead: Lead, reference: string, receivedAt: Date): string {
  const lines = leadRows(lead).map((row) => `${row.label}: ${row.value}`);
  return [
    lead.type === "consulenza" ? "Nuova richiesta di consulenza" : "Nuova richiesta di valutazione immobile",
    `Riferimento: ${reference}`,
    `Ricevuta il: ${receivedAt.toLocaleString("it-IT", { timeZone: "Europe/Rome" })}`,
    "",
    ...lines,
  ].join("\n");
}

export function leadHtml(lead: Lead, reference: string, receivedAt: Date): string {
  const rows = leadRows(lead)
    .map(
      (row) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e8eef0;color:#61717d;font-weight:600;vertical-align:top;width:220px">${escapeHtml(
          row.label,
        )}</th><td style="padding:8px 12px;border-bottom:1px solid #e8eef0;color:#0b1a2a;white-space:pre-wrap">${escapeHtml(
          row.value,
        )}</td></tr>`,
    )
    .join("");
  const title = lead.type === "consulenza" ? "Nuova richiesta di consulenza" : "Nuova richiesta di valutazione immobile";
  return `<!doctype html><html lang="it"><body style="margin:0;padding:24px;background:#f7f9fa;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border-collapse:collapse">
<tr><td style="background:#0b1a2a;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700">CHECK-<span style="color:#08b7a9">iO</span> · ${escapeHtml(title)}</td></tr>
<tr><td style="padding:16px 24px;color:#61717d;font-size:13px">Riferimento ${escapeHtml(reference)} · ${escapeHtml(
    receivedAt.toLocaleString("it-IT", { timeZone: "Europe/Rome" }),
  )}</td></tr>
<tr><td style="padding:0 12px 24px"><table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">${rows}</table></td></tr>
</table></body></html>`;
}

/**
 * Schemi di validazione condivisi tra client (React Hook Form) e server
 * (route handler `/api/leads`). Nessun import tramite alias: il file viene
 * eseguito anche dai test con Node.
 */
import { z } from "zod";

const PHONE_PATTERN = /^\+?[0-9][0-9\s().-]{5,19}$/;

const personName = (label: string) =>
  z
    .string({ error: `Inserisci ${label}.` })
    .trim()
    .min(2, `Inserisci ${label} (almeno 2 caratteri).`)
    .max(80, "Massimo 80 caratteri.");

const emailField = z
  .string({ error: "Inserisci un indirizzo email." })
  .trim()
  .min(1, "Inserisci un indirizzo email.")
  .max(254, "Indirizzo email troppo lungo.")
  .pipe(z.email({ error: "Inserisci un indirizzo email valido." }));

const phoneField = z
  .string({ error: "Inserisci un numero di telefono." })
  .trim()
  .min(1, "Inserisci un numero di telefono.")
  .regex(PHONE_PATTERN, "Inserisci un numero di telefono valido, ad esempio +39 351 000 0000.");

const privacyField = z.boolean().refine((value) => value === true, {
  error: "Per inviare la richiesta conferma di aver preso visione dell'informativa privacy.",
});

export const REQUEST_TYPES = [
  { value: "affidare-immobile", label: "Vorrei affidare un immobile" },
  { value: "commissioni", label: "Vorrei conoscere le commissioni" },
  { value: "valutazione", label: "Vorrei una valutazione" },
  { value: "servizi", label: "Ho una domanda sui servizi" },
  { value: "altro", label: "Altro" },
] as const;

export const PREFERRED_TIMES = [
  { value: "mattina", label: "Mattina (9:00–12:00)" },
  { value: "primo-pomeriggio", label: "Primo pomeriggio (12:00–15:00)" },
  { value: "tardo-pomeriggio", label: "Tardo pomeriggio (15:00–18:00)" },
  { value: "indifferente", label: "Indifferente" },
] as const;

export const CONTACT_METHODS = [
  { value: "telefono", label: "Telefono" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

export const PROPERTY_TYPES = [
  { value: "appartamento", label: "Appartamento" },
  { value: "attico", label: "Attico" },
  { value: "casa-indipendente", label: "Casa indipendente" },
  { value: "villa", label: "Villa" },
  { value: "rustico", label: "Rustico o casale" },
  { value: "altro", label: "Altro" },
] as const;

export const RENTAL_STATUSES = [
  { value: "gia-affittato", label: "Già affittato" },
  { value: "non-affittato", label: "Non ancora affittato" },
  { value: "altro", label: "Altro" },
] as const;

type Options = readonly { value: string; label: string }[];
const values = <T extends Options>(options: T) =>
  options.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

export function optionLabel(options: Options, value: string | undefined | null) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}

export const consultationSchema = z.object({
  fullName: personName("nome e cognome"),
  email: emailField,
  phone: phoneField,
  location: z
    .string({ error: "Indica la località dell'immobile." })
    .trim()
    .min(2, "Indica la località dell'immobile.")
    .max(120, "Massimo 120 caratteri."),
  requestType: z.enum(values(REQUEST_TYPES), { error: "Seleziona la tipologia della richiesta." }),
  preferredTime: z.enum(values(PREFERRED_TIMES), { error: "Seleziona una fascia oraria." }),
  contactMethod: z.enum(values(CONTACT_METHODS), { error: "Seleziona come preferisci essere ricontattato." }),
  message: z
    .string({ error: "Scrivi un breve messaggio." })
    .trim()
    .min(10, "Scrivi almeno qualche parola sulla tua richiesta (minimo 10 caratteri).")
    .max(2000, "Massimo 2000 caratteri."),
  privacy: privacyField,
});

export const simulationSnapshotSchema = z.object({
  nightlyRate: z.number().min(20).max(2000),
  occupancy: z.number().min(0).max(100),
  availableDays: z.number().int().min(1).max(365),
  commission: z.number().min(10).max(15),
});

const intField = (label: string, min: number, max: number) =>
  z
    .number({ error: `Indica ${label}.` })
    .int(`Indica un numero intero.`)
    .min(min, `Il valore minimo è ${min}.`)
    .max(max, `Il valore massimo è ${max}.`);

export const evaluationSchema = z.object({
  firstName: personName("il nome"),
  lastName: personName("il cognome"),
  email: emailField,
  phone: phoneField,
  municipality: z
    .string({ error: "Indica il comune dell'immobile." })
    .trim()
    .min(2, "Indica il comune dell'immobile.")
    .max(120, "Massimo 120 caratteri."),
  propertyType: z.enum(values(PROPERTY_TYPES), { error: "Seleziona la tipologia di immobile." }),
  bedrooms: intField("il numero di camere", 0, 30),
  beds: intField("il numero di posti letto", 1, 60),
  rentalStatus: z.enum(values(RENTAL_STATUSES), { error: "Seleziona lo stato attuale dell'immobile." }),
  message: z.string().trim().max(2000, "Massimo 2000 caratteri.").optional().or(z.literal("")),
  simulation: simulationSnapshotSchema.optional(),
  privacy: privacyField,
});

export type ConsultationInput = z.input<typeof consultationSchema>;
export type ConsultationData = z.output<typeof consultationSchema>;
export type EvaluationInput = z.input<typeof evaluationSchema>;
export type EvaluationData = z.output<typeof evaluationSchema>;
export type SimulationSnapshot = z.output<typeof simulationSnapshotSchema>;

export const leadMetaSchema = z.object({
  /** Campo trappola: deve restare vuoto. */
  hp: z.string().max(200).optional().default(""),
  /** Timestamp (ms) di apertura del modulo, per scoraggiare invii automatici. */
  startedAt: z.number().int().nonnegative(),
  /** Identificativo generato dal client per evitare invii duplicati. */
  submissionId: z.string().regex(/^[a-zA-Z0-9-]{8,64}$/),
});

export const leadRequestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("consulenza"), data: consultationSchema, meta: leadMetaSchema }),
  z.object({ type: z.literal("valutazione"), data: evaluationSchema, meta: leadMetaSchema }),
]);

export type LeadRequest = z.output<typeof leadRequestSchema>;
export type Lead =
  | { type: "consulenza"; data: ConsultationData }
  | { type: "valutazione"; data: EvaluationData };

export type LeadErrorCode =
  | "invalid"
  | "too_fast"
  | "rate_limited"
  | "not_configured"
  | "delivery_failed"
  | "forbidden"
  | "payload_too_large";

export interface LeadApiResponse {
  ok: boolean;
  reference?: string;
  code?: LeadErrorCode;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

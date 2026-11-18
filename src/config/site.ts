/**
 * Configurazione centrale del sito CHECK-iO.
 *
 * Tutti i dati societari e di contatto vivono qui. I campi impostati a `null`
 * sono informazioni NON ancora verificate: il sito non le mostra finché non
 * vengono compilate. Esegui `npm run check:launch` per l'elenco aggiornato.
 *
 * Questo file non deve importare moduli tramite alias (`@/`) perché viene
 * letto anche dallo script `scripts/launch-check.ts` eseguito con Node.
 */

export type Nullable<T> = T | null;

export interface CompanyInfo {
  /** Ragione sociale (verificata). */
  legalName: string;
  vatNumber: Nullable<string>;
  taxCode: Nullable<string>;
  registeredOffice: Nullable<string>;
  reaNumber: Nullable<string>;
  shareCapital: Nullable<string>;
  pec: Nullable<string>;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  /** Percorso di una fotografia reale e autorizzata. */
  photo?: string;
}

const productionUrl = "https://check-io.it";

export const siteConfig = {
  name: "CHECK-iO",
  tagline: "Property Management",
  description:
    "CHECK-iO offre servizi di property management per proprietari immobiliari: prenotazioni, prezzi dinamici, ospiti, pulizie e gestione operativa.",
  /** URL canonico di produzione. */
  url: productionUrl,
  locale: "it_IT",
  language: "it-IT",
  areaServed: "Italia",

  company: {
    legalName: "Immobiliare Monte Olimpo S.r.l.",
    vatNumber: null,
    taxCode: null,
    registeredOffice: null,
    reaNumber: null,
    shareCapital: null,
    pec: null,
  } satisfies CompanyInfo,

  contact: {
    phone: {
      display: "+39 351 968 8178",
      e164: "+393519688178",
    },
    whatsapp: {
      /** Numero in formato internazionale senza "+" (richiesto da wa.me). */
      number: "393519688178",
      defaultMessage:
        "Buongiorno, vorrei ricevere informazioni sui servizi di property management di CHECK-iO.",
    },
    /** Email pubblica aziendale: da inserire solo quando verificata. */
    email: null as Nullable<string>,
  },

  consultation: {
    /**
     * URL di un sistema di prenotazione con disponibilità reali
     * (es. calendario condiviso). Finché è `null` la CTA porta al modulo
     * di richiesta consulenza con fascia oraria preferita.
     */
    bookingUrl: null as Nullable<string>,
  },

  legal: {
    /** Data dell'ultimo aggiornamento dei documenti legali (ISO). */
    lastUpdated: "2026-11-18",
    /**
     * Impostare a `true` solo dopo la revisione di un professionista e
     * l'inserimento dei dati del titolare mancanti.
     */
    reviewedByCounsel: false,
    /** Tempi di conservazione dei dati dei moduli, da definire. */
    leadRetention: null as Nullable<string>,
    /** Fornitori tecnici effettivamente utilizzati (hosting, email, CRM). */
    processors: [
      {
        name: "Vercel Inc.",
        purpose: "hosting e distribuzione del sito web",
      },
    ] as { name: string; purpose: string }[],
  },

  /** Membri del team: la sezione resta nascosta finché l'elenco è vuoto. */
  team: [] as TeamMember[],

  /** Data di ultimo aggiornamento dei contenuti, usata nella sitemap. */
  contentUpdatedAt: "2026-11-18",
} as const;

export type SiteConfig = typeof siteConfig;

/** Restituisce l'elenco delle informazioni mancanti prima della pubblicazione. */
export function getLaunchChecklist(config: SiteConfig = siteConfig) {
  const missing: { key: string; label: string }[] = [];
  const company = config.company as CompanyInfo;
  const companyLabels: Record<keyof Omit<CompanyInfo, "legalName">, string> = {
    vatNumber: "Partita IVA",
    taxCode: "Codice fiscale",
    registeredOffice: "Sede legale",
    reaNumber: "Numero REA",
    shareCapital: "Capitale sociale",
    pec: "Indirizzo PEC",
  };
  for (const [key, label] of Object.entries(companyLabels)) {
    if (company[key as keyof CompanyInfo] == null) {
      missing.push({ key: `company.${key}`, label });
    }
  }
  if (config.contact.email == null) {
    missing.push({ key: "contact.email", label: "Email aziendale pubblica" });
  }
  if (config.legal.leadRetention == null) {
    missing.push({
      key: "legal.leadRetention",
      label: "Tempi di conservazione dei dati raccolti con i moduli",
    });
  }
  if (!config.legal.reviewedByCounsel) {
    missing.push({
      key: "legal.reviewedByCounsel",
      label: "Revisione legale di Privacy Policy e Cookie Policy",
    });
  }
  return missing;
}

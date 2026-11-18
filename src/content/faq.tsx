import Link from "next/link";
import type { ReactNode } from "react";

export interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const linkClass = "font-medium text-turq-700 underline underline-offset-4 hover:text-navy-900";

export const faqItems: FaqItem[] = [
  {
    id: "cos-e-check-io",
    question: "Che cos'è CHECK-iO?",
    answer: (
      <p>
        CHECK-iO è il brand dedicato al property management di Immobiliare Monte Olimpo S.r.l. Offriamo ai proprietari un
        servizio di gestione per immobili destinati agli affitti brevi: dagli annunci alle prenotazioni, dall&apos;accoglienza
        degli ospiti alle pulizie, fino alla rendicontazione.
      </p>
    ),
  },
  {
    id: "servizi",
    question: "Di quali servizi si occupa CHECK-iO?",
    answer: (
      <p>
        Ci occupiamo di pubblicazione e ottimizzazione degli annunci, gestione di prenotazioni e calendari, prezzi
        dinamici, check-in e check-out, assistenza agli ospiti, pulizie e biancheria, coordinamento delle manutenzioni e
        rendicontazione. L&apos;insieme dei servizi viene definito con ciascun proprietario in base all&apos;immobile e alle
        sue esigenze. Trovi il dettaglio nella{" "}
        <Link href="/servizi" className={linkClass}>
          pagina dei servizi
        </Link>
        .
      </p>
    ),
  },
  {
    id: "immobili",
    question: "Quali immobili possono essere gestiti?",
    answer: (
      <p>
        Valutiamo appartamenti, attici, case indipendenti, ville e altre unità abitative destinate o destinabili agli
        affitti brevi. L&apos;idoneità dipende da caratteristiche, posizione, stato dell&apos;immobile e requisiti
        normativi applicabili: per questo ogni proprietà viene analizzata durante la consulenza iniziale.
      </p>
    ),
  },
  {
    id: "prima-consulenza",
    question: "Come funziona la prima consulenza?",
    answer: (
      <p>
        Raccogliamo le informazioni principali sulla proprietà e sulle tue esigenze, poi ti ricontattiamo per
        approfondire. Se ci sono i presupposti per collaborare, analizziamo l&apos;immobile — anche con un sopralluogo,
        quando necessario — e ti presentiamo una proposta personalizzata. La richiesta di consulenza non ti vincola in
        alcun modo alla sottoscrizione di un contratto.
      </p>
    ),
  },
  {
    id: "costi",
    question: "Quanto costa la gestione?",
    answer: (
      <p>
        Il modello prevede una commissione di gestione indicativa compresa tra il 10% e il 15%, definita in base
        all&apos;immobile e ai servizi concordati. Le condizioni economiche vengono formalizzate in una proposta
        personalizzata: eventuali costi operativi, commissioni dei portali, imposte e servizi aggiuntivi sono indicati
        separatamente.
      </p>
    ),
  },
  {
    id: "commissione",
    question: "Come funziona la commissione del 10–15%?",
    answer: (
      <p>
        La percentuale varia in funzione delle caratteristiche dell&apos;immobile, dei servizi inclusi e dell&apos;impegno
        operativo richiesto, e viene applicata secondo quanto stabilito nell&apos;accordo di gestione. La base di calcolo e
        le voci escluse — ad esempio pulizie, biancheria, commissioni delle piattaforme o interventi di manutenzione —
        sono specificate nella proposta, così da avere un quadro chiaro fin dall&apos;inizio. Per farti un&apos;idea puoi
        usare il{" "}
        <Link href="/proprietari#simulatore" className={linkClass}>
          simulatore di redditività
        </Link>
        , che ha finalità esclusivamente illustrative.
      </p>
    ),
  },
  {
    id: "prenotazioni",
    question: "Chi si occupa delle prenotazioni?",
    answer: (
      <p>
        Se previsto dall&apos;accordo, CHECK-iO gestisce richieste, conferme, modifiche e calendari sulle piattaforme
        concordate, mantenendo allineate le disponibilità. Puoi indicare periodi riservati al tuo uso personale o altre
        preferenze, che vengono considerate nella gestione del calendario.
      </p>
    ),
  },
  {
    id: "check-in-check-out",
    question: "Come vengono gestiti check-in e check-out?",
    answer: (
      <p>
        Le modalità di arrivo e partenza vengono definite insieme: accoglienza di persona oppure soluzioni di accesso
        autonomo, in base all&apos;immobile e alla località. In ogni caso le procedure tengono conto degli adempimenti
        previsti per le locazioni brevi.
      </p>
    ),
  },
  {
    id: "pulizie-manutenzioni",
    question: "Chi organizza pulizie e manutenzioni?",
    answer: (
      <p>
        Organizziamo e coordiniamo pulizie, biancheria e interventi di manutenzione secondo quanto concordato. Per le spese
        di manutenzione vengono stabilite soglie e modalità di autorizzazione: gli interventi oltre la soglia vengono
        sempre condivisi con il proprietario prima di procedere.
      </p>
    ),
  },
  {
    id: "monitoraggio",
    question: "Come posso monitorare l'andamento della proprietà?",
    answer: (
      <p>
        Ricevi riepiloghi periodici con prenotazioni, importi, costi e attività svolte, con frequenza e formato definiti
        nell&apos;accordo. Il tuo referente resta a disposizione per qualsiasi chiarimento sulle singole voci.
      </p>
    ),
  },
  {
    id: "copertura",
    question: "CHECK-iO opera in tutta Italia?",
    answer: (
      <p>
        CHECK-iO si rivolge a proprietari di immobili in Italia. La disponibilità operativa viene verificata in fase di
        consulenza in base alla località e al tipo di servizio richiesto: alcune attività, come accoglienza, pulizie e
        manutenzioni, dipendono infatti dalla disponibilità di risorse sul territorio.
      </p>
    ),
  },
  {
    id: "valutazione",
    question: "Come posso richiedere una valutazione?",
    answer: (
      <p>
        Puoi compilare il{" "}
        <Link href="/proprietari#valutazione" className={linkClass}>
          modulo di valutazione
        </Link>{" "}
        nella pagina dedicata ai proprietari, scriverci su WhatsApp o chiamarci al{" "}
        <a href="tel:+393519688178" className={linkClass}>
          +39 351 968 8178
        </a>
        . Ti ricontatteremo per approfondire le caratteristiche dell&apos;immobile.
      </p>
    ),
  },
];

export function faqByIds(ids: string[]) {
  return ids.map((id) => faqItems.find((item) => item.id === id)).filter((item): item is FaqItem => Boolean(item));
}

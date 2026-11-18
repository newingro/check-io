export type ServiceIcon =
  | "listing"
  | "calendar"
  | "pricing"
  | "keys"
  | "guest"
  | "cleaning"
  | "maintenance"
  | "report";

export interface Service {
  id: string;
  number: string;
  /** Titolo breve usato nella pagina Servizi. */
  title: string;
  /** Titolo esteso usato nella homepage. */
  homeTitle: string;
  homeDescription: string;
  summary: string;
  activities: string[];
  benefit: string;
  note?: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    id: "annunci",
    number: "01",
    title: "Annunci e visibilità",
    homeTitle: "Pubblicazione e ottimizzazione annunci",
    homeDescription:
      "Creiamo e curiamo gli annunci sulle piattaforme di prenotazione, con testi, informazioni e impostazioni pensati per presentare l'immobile al meglio.",
    summary:
      "La qualità di un annuncio incide su come l'immobile viene percepito e scelto. Ci occupiamo di creare, configurare e aggiornare gli annunci sulle piattaforme di prenotazione utilizzate — ad esempio Airbnb e Booking.com — curando ogni informazione utile agli ospiti.",
    activities: [
      "Creazione o revisione degli annunci sulle piattaforme concordate",
      "Testi descrittivi chiari, accurati e coerenti con l'immobile",
      "Selezione e ordinamento delle fotografie disponibili, con eventuale servizio fotografico da concordare",
      "Impostazione di servizi, regole della casa e politiche di cancellazione concordate",
      "Aggiornamenti periodici in base all'andamento e alla stagionalità",
    ],
    benefit:
      "Un annuncio completo e curato, che descrive l'immobile in modo fedele e lo rende più comprensibile per chi sta scegliendo dove soggiornare.",
    note: "Airbnb e Booking.com sono marchi dei rispettivi titolari: vengono citati come piattaforme utilizzabili, senza alcuna partnership ufficiale.",
    icon: "listing",
  },
  {
    id: "prenotazioni",
    number: "02",
    title: "Prenotazioni",
    homeTitle: "Gestione prenotazioni e calendari",
    homeDescription:
      "Gestiamo calendari, disponibilità e richieste, coordinando le prenotazioni tra i diversi canali per ridurre sovrapposizioni ed errori.",
    summary:
      "Seguiamo il ciclo della prenotazione dalla richiesta alla conferma, mantenendo calendari e disponibilità allineati sulle piattaforme utilizzate e rispettando le preferenze del proprietario.",
    activities: [
      "Gestione di richieste, conferme e modifiche delle prenotazioni",
      "Allineamento di calendari e disponibilità tra i canali utilizzati",
      "Impostazione di soggiorni minimi, periodi di blocco e date riservate al proprietario",
      "Invio delle informazioni utili prima dell'arrivo",
      "Coordinamento delle attività operative collegate a ogni soggiorno",
    ],
    benefit:
      "Meno tempo dedicato a messaggi e calendari, e un quadro ordinato delle prenotazioni in corso e future.",
    icon: "calendar",
  },
  {
    id: "prezzi-dinamici",
    number: "03",
    title: "Prezzi dinamici",
    homeTitle: "Prezzi dinamici",
    homeDescription:
      "Aggiorniamo le tariffe in base a stagionalità, calendario e domanda, con l'obiettivo di bilanciare occupazione e valore di ogni notte.",
    summary:
      "Il prezzo corretto cambia nel tempo. Analizziamo e aggiorniamo le tariffe considerando stagionalità, eventi, giorni della settimana e andamento delle prenotazioni, secondo gli strumenti e i criteri concordati con il proprietario.",
    activities: [
      "Definizione di una strategia tariffaria iniziale",
      "Aggiornamento periodico dei prezzi in funzione di stagionalità e calendario",
      "Gestione di tariffe per soggiorni lunghi, ultimo minuto e periodi di alta domanda",
      "Rispetto delle soglie minime indicate dal proprietario",
      "Verifica dell'andamento e revisione della strategia",
    ],
    benefit:
      "Tariffe più coerenti con il momento e con il mercato, senza la necessità di monitorarle ogni giorno.",
    icon: "pricing",
  },
  {
    id: "check-in",
    number: "04",
    title: "Check-in e check-out",
    homeTitle: "Check-in e check-out",
    homeDescription:
      "Coordiniamo arrivi e partenze degli ospiti con procedure chiare, nel rispetto degli adempimenti previsti.",
    summary:
      "Arrivi e partenze sono i momenti più delicati del soggiorno. Organizziamo le procedure di accoglienza e di uscita secondo le modalità concordate — di persona o con soluzioni di accesso autonomo — e nel rispetto degli obblighi applicabili.",
    activities: [
      "Definizione delle modalità di arrivo e di consegna delle chiavi",
      "Istruzioni di accesso chiare inviate agli ospiti",
      "Supporto agli adempimenti amministrativi legati al soggiorno, secondo quanto concordato",
      "Verifica dell'immobile alla partenza, ove previsto",
      "Gestione di orari e richieste particolari secondo disponibilità",
    ],
    benefit:
      "Un'accoglienza ordinata, che tutela l'immobile e offre agli ospiti un'esperienza chiara fin dal primo momento.",
    icon: "keys",
  },
  {
    id: "assistenza-ospiti",
    number: "05",
    title: "Assistenza ospiti",
    homeTitle: "Assistenza agli ospiti",
    homeDescription:
      "Rispondiamo alle domande degli ospiti prima, durante e dopo il soggiorno, secondo tempi e modalità concordati.",
    summary:
      "Una comunicazione tempestiva e cortese fa la differenza nell'esperienza dell'ospite. Gestiamo i messaggi prima, durante e dopo il soggiorno secondo i livelli di servizio definiti nell'accordo di gestione.",
    activities: [
      "Risposta alle richieste di informazioni prima della prenotazione",
      "Messaggi di benvenuto e indicazioni pratiche sul soggiorno",
      "Supporto durante il soggiorno per domande e piccoli imprevisti",
      "Raccolta delle segnalazioni e coordinamento degli interventi necessari",
      "Richiesta di recensione e gestione delle risposte a fine soggiorno",
    ],
    benefit: "Ospiti seguiti con attenzione e un proprietario sollevato dalle comunicazioni quotidiane.",
    note: "Orari e tempi di risposta dell'assistenza vengono definiti nell'accordo di gestione.",
    icon: "guest",
  },
  {
    id: "pulizie",
    number: "06",
    title: "Pulizie e biancheria",
    homeTitle: "Pulizie e biancheria",
    homeDescription:
      "Organizziamo pulizie, cambio biancheria e prodotti di cortesia tra un soggiorno e l'altro, con standard condivisi.",
    summary:
      "Ogni ospite deve trovare l'immobile pronto e in ordine. Pianifichiamo gli interventi di pulizia e i servizi di biancheria in funzione del calendario delle prenotazioni, con standard di preparazione condivisi.",
    activities: [
      "Pianificazione delle pulizie in base a check-in e check-out",
      "Coordinamento del servizio di biancheria e del cambio delle dotazioni",
      "Controllo e riassortimento dei prodotti di cortesia concordati",
      "Checklist condivise per la preparazione dell'immobile",
      "Segnalazione delle anomalie riscontrate durante gli interventi",
    ],
    benefit: "Standard di preparazione costanti, senza dover coordinare fornitori e orari in prima persona.",
    icon: "cleaning",
  },
  {
    id: "manutenzioni",
    number: "07",
    title: "Manutenzioni",
    homeTitle: "Manutenzioni e gestione imprevisti",
    homeDescription:
      "Raccogliamo le segnalazioni, coordiniamo gli interventi necessari e condividiamo con te le decisioni di spesa.",
    summary:
      "Imprevisti e piccole riparazioni fanno parte della vita di un immobile. Raccogliamo le segnalazioni, valutiamo le priorità e coordiniamo gli interventi, secondo le soglie di spesa e le modalità di autorizzazione concordate con il proprietario.",
    activities: [
      "Raccolta e verifica delle segnalazioni di guasti o malfunzionamenti",
      "Coordinamento di tecnici e fornitori per gli interventi",
      "Richiesta di autorizzazione per le spese oltre la soglia concordata",
      "Monitoraggio dello stato delle dotazioni dell'immobile",
      "Suggerimenti per interventi di manutenzione preventiva",
    ],
    benefit: "Problemi gestiti con metodo e decisioni di spesa sempre condivise con te.",
    icon: "maintenance",
  },
  {
    id: "rendicontazione",
    number: "08",
    title: "Rendicontazione",
    homeTitle: "Report e rendicontazione",
    homeDescription:
      "Ricevi riepiloghi chiari su prenotazioni, importi e attività svolte, per conoscere sempre l'andamento della gestione.",
    summary:
      "La trasparenza è alla base della relazione con il proprietario. Forniamo riepiloghi periodici delle prenotazioni, degli importi e delle attività operative, con la frequenza e il formato concordati.",
    activities: [
      "Riepilogo delle prenotazioni e delle notti occupate",
      "Dettaglio degli importi incassati, delle commissioni e dei costi sostenuti",
      "Resoconto degli interventi di pulizia e manutenzione",
      "Note sull'andamento e proposte di miglioramento",
      "Disponibilità per chiarimenti su ogni voce del rendiconto",
    ],
    benefit: "Una visione chiara della gestione, con informazioni verificabili su ogni voce.",
    icon: "report",
  },
];

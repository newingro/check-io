import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali raccolti tramite il sito CHECK-iO e i moduli di contatto, ai sensi del Regolamento (UE) 2016/679.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { company, contact, legal } = siteConfig;
  const holderDetails = [
    company.registeredOffice && `sede legale in ${company.registeredOffice}`,
    company.vatNumber && `P. IVA ${company.vatNumber}`,
  ].filter(Boolean);

  return (
    <LegalPage title="Informativa sulla privacy" path="/privacy-policy" label="Privacy Policy">
      <p>
        Questa informativa descrive come vengono trattati i dati personali degli utenti che consultano il sito{" "}
        {siteConfig.url.replace("https://", "")} e che ci contattano tramite i moduli, il telefono o WhatsApp, ai sensi degli
        articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR) e della normativa italiana applicabile.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento è {company.legalName}
        {holderDetails.length > 0 ? `, ${holderDetails.join(", ")}` : ""}, che opera con il nome commerciale{" "}
        {siteConfig.name}. Puoi contattare il titolare al numero {contact.phone.display}
        {contact.email ? ` o all'indirizzo email ${contact.email}` : ""}
        {company.pec ? `, oppure via PEC all'indirizzo ${company.pec}` : ""}.
      </p>

      <h2>2. Dati trattati</h2>
      <h3>Dati di navigazione</h3>
      <p>
        I sistemi informatici che gestiscono il sito acquisiscono, durante il normale funzionamento, alcuni dati tecnici la
        cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione di Internet (ad esempio indirizzo IP, data
        e ora della richiesta, pagina visitata, tipo di browser). Questi dati sono utilizzati per garantire il corretto
        funzionamento e la sicurezza del sito.
      </p>
      <h3>Dati forniti volontariamente</h3>
      <p>Compilando i moduli di consulenza o di valutazione immobile ci comunichi:</p>
      <ul>
        <li>dati identificativi e di contatto: nome, cognome, indirizzo email, numero di telefono;</li>
        <li>informazioni sull&apos;immobile: comune o località, tipologia, numero di camere e posti letto, stato attuale;</li>
        <li>il contenuto dei messaggi e le preferenze di ricontatto;</li>
        <li>eventuali valori della simulazione di redditività, se scegli di allegarli alla richiesta.</li>
      </ul>
      <p>
        Ti invitiamo a non inserire nei messaggi dati non necessari, in particolare categorie particolari di dati personali.
      </p>

      <h2>3. Finalità e basi giuridiche</h2>
      <ul>
        <li>
          <strong>Rispondere alle richieste</strong> di informazioni, consulenza o valutazione e svolgere le attività
          precontrattuali da te richieste: base giuridica è l&apos;esecuzione di misure precontrattuali (art. 6, par. 1,
          lett. b, GDPR).
        </li>
        <li>
          <strong>Garantire la sicurezza del sito</strong> e prevenire abusi, ad esempio invii automatizzati dei moduli:
          base giuridica è il legittimo interesse del titolare (art. 6, par. 1, lett. f, GDPR).
        </li>
        <li>
          <strong>Adempiere a obblighi di legge</strong> e, se necessario, far valere o difendere un diritto: base giuridica
          sono gli obblighi legali (art. 6, par. 1, lett. c) e il legittimo interesse del titolare.
        </li>
      </ul>
      <p>I dati non vengono utilizzati per finalità di marketing né per attività di profilazione.</p>

      <h2>4. Natura del conferimento</h2>
      <p>
        Il conferimento dei dati contrassegnati come obbligatori nei moduli è necessario per poter rispondere alla
        richiesta; in mancanza non potremo dare seguito al contatto. I dati facoltativi possono essere omessi senza alcuna
        conseguenza.
      </p>

      <h2>5. Modalità del trattamento e sicurezza</h2>
      <p>
        Il trattamento avviene con strumenti informatici e organizzativi idonei a garantire riservatezza, integrità e
        disponibilità dei dati. Le comunicazioni con il sito sono cifrate tramite protocollo HTTPS e i moduli sono protetti
        da sistemi di validazione e di prevenzione degli abusi.
      </p>

      <h2>6. Destinatari dei dati</h2>
      <p>
        I dati possono essere trattati da personale autorizzato del titolare e da fornitori che erogano servizi tecnici,
        nominati, ove necessario, responsabili del trattamento. I fornitori attualmente utilizzati sono:
      </p>
      <ul>
        {legal.processors.map((processor) => (
          <li key={processor.name}>
            {processor.name}, per {processor.purpose};
          </li>
        ))}
      </ul>
      <p>I dati non vengono diffusi né ceduti a terzi per finalità proprie.</p>

      <h2>7. Trasferimenti verso Paesi terzi</h2>
      <p>
        Alcuni fornitori tecnici possono avere sede o infrastrutture al di fuori dello Spazio Economico Europeo. In questi
        casi il trasferimento avviene sulla base di decisioni di adeguatezza della Commissione europea o di clausole
        contrattuali standard, nel rispetto degli articoli 44 e seguenti del GDPR.
      </p>

      <h2>8. Conservazione</h2>
      <p>
        {legal.leadRetention
          ? legal.leadRetention
          : "I dati raccolti tramite i moduli sono conservati per il tempo necessario a gestire la richiesta e le eventuali successive trattative. In caso di sottoscrizione di un accordo, i dati sono conservati per la durata del rapporto e per i periodi previsti dalla normativa applicabile."}{" "}
        I dati di navigazione sono conservati per il tempo strettamente necessario alle finalità di sicurezza.
      </p>

      <h2>9. Diritti dell&apos;interessato</h2>
      <p>
        In qualsiasi momento puoi esercitare i diritti previsti dagli articoli 15-22 del GDPR: accesso, rettifica,
        cancellazione, limitazione del trattamento, portabilità dei dati e opposizione al trattamento basato sul legittimo
        interesse. Per esercitarli puoi contattare il titolare ai recapiti indicati al punto 1.
      </p>
      <p>
        Hai inoltre il diritto di proporre reclamo all&apos;autorità di controllo competente, in Italia il Garante per la
        protezione dei dati personali (www.garanteprivacy.it).
      </p>

      <h2>10. Cookie</h2>
      <p>
        Per informazioni sull&apos;uso di cookie e tecnologie simili consulta la{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>11. Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata, ad esempio in caso di modifiche normative o dei servizi utilizzati. La
        data dell&apos;ultimo aggiornamento è indicata in testa alla pagina.
      </p>
    </LegalPage>
  );
}

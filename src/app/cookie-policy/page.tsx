import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Informazioni sull'uso di cookie e tecnologie simili sul sito CHECK-iO: nessun cookie di profilazione né strumenti di tracciamento di terze parti.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" label="Cookie Policy">
      <p>
        Questa pagina descrive l&apos;uso di cookie e tecnologie simili sul sito {siteConfig.url.replace("https://", "")},
        gestito da {siteConfig.company.legalName} con il nome commerciale {siteConfig.name}.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati salvano sul dispositivo dell&apos;utente. Tecnologie simili,
        come il <em>local storage</em> e il <em>session storage</em> del browser, permettono di memorizzare informazioni in
        modo analogo.
      </p>

      <h2>2. Cookie utilizzati da questo sito</h2>
      <p>
        Nella configurazione attuale il sito <strong>non utilizza cookie di profilazione, cookie di marketing né strumenti
        di analisi o tracciamento di terze parti</strong>. Per questo motivo non viene mostrato alcun banner di consenso.
      </p>
      <p>
        I caratteri tipografici sono ospitati direttamente sul nostro dominio: la navigazione non comporta richieste verso
        servizi esterni di font.
      </p>

      <h2>3. Archiviazione tecnica nel browser</h2>
      <p>
        Se utilizzi il simulatore di redditività e scegli di richiedere una valutazione, i valori inseriti vengono salvati
        temporaneamente nel <em>session storage</em> del tuo browser, al solo scopo di riportarli nel modulo di richiesta.
        Si tratta di un&apos;archiviazione strettamente necessaria a fornire una funzione da te richiesta: i dati restano sul
        tuo dispositivo, non vengono inviati se non decidi di allegarli alla richiesta e vengono eliminati alla chiusura
        della scheda.
      </p>

      <h2>4. Servizi esterni</h2>
      <p>
        Il pulsante WhatsApp apre il servizio di messaggistica di WhatsApp (Meta Platforms) in una nuova scheda o
        nell&apos;applicazione. L&apos;uso di WhatsApp è regolato dall&apos;informativa privacy del relativo fornitore.
      </p>

      <h2>5. Come gestire i cookie</h2>
      <p>
        Puoi gestire o eliminare cookie e dati dei siti dalle impostazioni del tuo browser. La disattivazione
        dell&apos;archiviazione locale non compromette la navigazione del sito.
      </p>

      <h2>6. Aggiornamenti</h2>
      <p>
        Qualora in futuro venissero introdotti strumenti che richiedono il consenso preventivo, ad esempio sistemi di
        statistica non anonimizzati o strumenti di marketing, questa pagina verrà aggiornata e sarà richiesto il tuo
        consenso prima della loro attivazione, con la possibilità di accettarli, rifiutarli e modificare la scelta in
        qualsiasi momento.
      </p>
      <p>
        Per maggiori informazioni sul trattamento dei dati personali consulta la{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}

# CHECK-iO | Property Management

Sito ufficiale di **CHECK-iO**, nome commerciale di **Immobiliare Monte Olimpo S.r.l.**
Dominio di destinazione: [check-io.it](https://check-io.it).

Obiettivo commerciale: trasformare i proprietari immobiliari in contatti qualificati tramite la richiesta di consulenza e di valutazione dell'immobile.

## Stack

| Ambito | Scelta |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack), React 19 |
| Linguaggio | TypeScript strict |
| Stile | Tailwind CSS 4 con design token in `src/app/globals.css` |
| Componenti accessibili | Radix UI Dialog (menu mobile), `<details>` nativi (FAQ) |
| Moduli | React Hook Form + Zod (schemi condivisi client/server) |
| Icone | Lucide React + icone di servizio disegnate su misura |
| Animazioni | CSS + canvas 2D (nessuna dipendenza WebGL o libreria di motion) |
| Font | Manrope (titoli) e Inter (testi), self-hosted con `next/font` |

## Avvio

```bash
npm install
npm run dev          # sviluppo su http://localhost:3000
npm run verify       # lint + typecheck + test + build di produzione
npm run check:launch # elenco dei dati mancanti prima della pubblicazione
```

Richiede Node.js ≥ 22.18 (i test usano il test runner nativo con type stripping).

## Struttura

```
src/
  app/                 pagine (/, /servizi, /proprietari, /chi-siamo, /contatti, /faq,
                       /privacy-policy, /cookie-policy), 404, errore, sitemap, robots,
                       manifest, immagine Open Graph, API /api/leads
  components/
    layout/            header, menu mobile, footer, barra CTA mobile, hero pagine interne
    home/              sezioni della homepage e scena 3D animata
    art/               composizioni architettoniche SVG (renderizzate sul server)
    calculator/        simulatore di redditività
    forms/             modulo consulenza e modulo valutazione immobile
    faq/ ui/ seo/
  config/              site.ts (dati aziendali centralizzati), navigation.ts
  content/             testi: servizi, FAQ, home, proprietari, chi siamo
  lib/
    calculator.ts      formule del simulatore (+ test)
    validation/        schemi Zod condivisi (+ test)
    leads/             formattazione e consegna dei lead (+ test)
    security/          rate limiting, verifica origine (+ test)
    scene/             motore geometrico 3D della hero (+ test)
    seo/               metadata e dati strutturati
public/brand/          logo e varianti estratte dall'asset originale
assets/brand/          logo originale e note sugli asset
scripts/               launch-check, estrazione del logo
```

## Ricezione delle richieste (lead)

I moduli inviano i dati a `POST /api/leads`, che:

- verifica l'origine della richiesta, il formato JSON e la dimensione massima (16 KB);
- valida i dati con gli stessi schemi Zod usati nel browser;
- applica honeypot, tempo minimo di compilazione, rate limiting (5 richieste / 10 minuti per IP) e deduplica degli invii;
- consegna la richiesta ai canali configurati e risponde con un **codice di riferimento** solo se almeno un canale ne conferma la ricezione.

Canali disponibili (variabili d'ambiente, vedi `.env.example`):

| Canale | Variabili |
| --- | --- |
| Email via Resend | `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL` |
| Webhook (CRM, Make, Zapier, n8n…) | `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` (firma `X-CheckIO-Signature: sha256=…`) |

> **Senza alcun canale configurato il sito non simula l'invio**: l'API risponde `503 not_configured` e il modulo mostra telefono e WhatsApp come alternative.

Per una protezione distribuita contro gli abusi è consigliata anche una regola di rate limiting su `/api/leads` nel Vercel Firewall.

## Dati da completare prima della pubblicazione

Tutti i dati aziendali sono in `src/config/site.ts`. I campi a `null` non vengono mostrati sul sito. Esegui `npm run check:launch` per l'elenco aggiornato:

- Partita IVA, codice fiscale, sede legale, REA, capitale sociale, PEC;
- email aziendale pubblica (facoltativa);
- tempi di conservazione dei dati dei moduli;
- revisione legale di Privacy Policy e Cookie Policy (`legal.reviewedByCounsel`), finché è `false` i documenti mostrano un avviso di finalizzazione;
- fornitori tecnici effettivamente usati (`legal.processors`, es. aggiungere Resend se attivato);
- eventuale URL di prenotazione con disponibilità reali (`consultation.bookingUrl`);
- membri del team con contenuti verificati (`team`: la sezione resta nascosta finché è vuota);
- file SVG ufficiali del logo (vedi `assets/brand/README.md`).

Il sito non contiene statistiche, recensioni, partnership, immobili o risultati economici inventati.

## Qualità verificata

- Unit test (21) su formule del simulatore, validazione, escaping delle email, rate limiter e motore geometrico.
- Test end-to-end con Playwright: menu mobile (focus trap, Escape, ritorno del focus), simulatore (calcoli, limiti, tastiera), passaggio dei valori al modulo di valutazione, validazione e invio reale dei moduli verso un webhook di prova.
- axe-core (WCAG 2.0/2.1/2.2 A-AA + best practice): nessuna violazione su tutte le pagine, desktop e mobile.
- Nessun overflow orizzontale a 320, 390, 768, 1024, 1440 e 1920 px.
- Lighthouse (build di produzione locale): desktop 100/100/100/100 sulla homepage; mobile con throttling reale: LCP 1,9–2,4 s, CLS 0.

## Deployment

Il progetto è pronto per Vercel (rilevamento automatico di Next.js). Dopo il collegamento del repository:

1. configurare le variabili d'ambiente dei lead;
2. collegare il dominio `check-io.it` (e reindirizzare `www` al dominio principale);
3. eseguire `npm run check:launch` e completare i dati mancanti.

Gli header di sicurezza (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) sono definiti in `next.config.ts`. Le anteprime non vengono indicizzate (`robots.txt` dinamico).

## Evoluzioni future (non implementate)

L'architettura è predisposta per: area riservata proprietari e dashboard economica, calendario e sincronizzazione prenotazioni tramite channel manager e integrazioni autorizzate con Airbnb e Booking.com, report mensili automatici, documenti e contratti, gestione manutenzioni, notifiche, CRM (già collegabile via webhook), booking delle consulenze sincronizzato con un calendario (`consultation.bookingUrl`), automazioni email, versione multilingua e landing page locali (da creare solo dove il servizio è realmente disponibile).

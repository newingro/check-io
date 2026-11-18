import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FaqList } from "@/components/faq/FaqList";
import { FinalCta } from "@/components/home/FinalCta";
import { ButtonLink } from "@/components/ui/Button";
import { faqItems } from "@/content/faq";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Domande frequenti sulla gestione affitti brevi",
  description:
    "Servizi, commissioni, prenotazioni, check-in, pulizie e copertura del servizio: le risposte alle domande più frequenti dei proprietari su CHECK-iO.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Domande frequenti"
        title="Tutto quello che c'è da sapere, in chiaro."
        description="Le risposte alle domande che i proprietari ci rivolgono più spesso su servizi, costi e modalità di gestione."
        breadcrumb={{ label: "FAQ", href: "/faq" }}
        art={{ form: "struttura", camera: { yaw: -0.9, pitch: 0.3 } }}
      />
      <section aria-label="Elenco delle domande frequenti" className="bg-white py-20 md:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <FaqList items={faqItems} headingLevel="h2" />
          </div>
          <aside className="lg:col-span-3 lg:col-start-10" aria-labelledby="faq-aside-title">
            <div className="border border-line bg-paper p-7 lg:sticky lg:top-32">
              <h2 id="faq-aside-title" className="font-display text-lg font-semibold tracking-[-0.01em] text-navy-900">
                Non trovi la risposta?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                Scrivici o fissa una consulenza: risponderemo a ogni domanda sul tuo immobile.
              </p>
              <ButtonLink href="/contatti?richiesta=servizi#consulenza" variant="primary" tone="light" className="mt-6 w-full">
                Contattaci
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

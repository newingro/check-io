import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CommissionSection } from "@/components/home/CommissionSection";
import { SimulatorSection } from "@/components/calculator/SimulatorSection";
import { FinalCta } from "@/components/home/FinalCta";
import { FaqList } from "@/components/faq/FaqList";
import { PropertyEvaluationForm } from "@/components/forms/PropertyEvaluationForm";
import { siteConfig } from "@/config/site";
import { faqByIds } from "@/content/faq";
import { ownerChallenges, ownerFaqIds } from "@/content/owners";
import { services } from "@/content/services";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Affidare un immobile in gestione",
  description:
    "Affida il tuo immobile a CHECK-iO: gestione affitti brevi, ospiti, pulizie e prezzi dinamici con commissione indicativa del 10–15%. Richiedi una valutazione personalizzata.",
  path: "/proprietari",
});

export default function OwnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Per i proprietari"
        title="Il tuo immobile merita una gestione all'altezza."
        description="Affidare i soggiorni brevi a un partner organizzato significa recuperare tempo, ridurre gli imprevisti e presentare la tua proprietà con la cura che merita."
        breadcrumb={{ label: "Per i proprietari", href: "/proprietari" }}
        art={{ form: "residenza", camera: { yaw: -0.85, pitch: 0.3 } }}
      >
        <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <ButtonLink href="#valutazione" variant="primary" tone="dark">
            Richiedi una valutazione
          </ButtonLink>
          <ButtonLink href="#metodo" variant="secondary" tone="dark" arrow={false}>
            Scopri come funziona
          </ButtonLink>
        </div>
      </PageHero>

      {/* 2. Problematiche tipiche */}
      <section aria-labelledby="sfide-title" className="bg-white py-24 md:py-32">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <p className="eyebrow">Le sfide della gestione</p>
            <h2 id="sfide-title" className="heading-2 mt-5 text-navy-900">
              Gestire da soli richiede più tempo di quanto sembri.
            </h2>
            <p className="lead mt-6 text-slate">
              Un immobile destinato agli affitti brevi è un&apos;attività a tutti gli effetti. Queste sono le difficoltà che i
              proprietari incontrano più spesso.
            </p>
          </div>
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {ownerChallenges.map((challenge, index) => (
              <li key={challenge.title} className="bg-white p-7 md:p-9" data-reveal style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}>
                <span className="tabular font-display text-sm font-semibold text-turq-700">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="heading-3 mt-6 text-navy-900">{challenge.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{challenge.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Soluzioni */}
      <section aria-labelledby="soluzioni-title" className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">La risposta di CHECK-iO</p>
            <h2 id="soluzioni-title" className="heading-2 mt-5 text-navy-900">
              Un metodo che mette ordine in ogni attività.
            </h2>
            <p className="lead mt-6 text-slate">
              A ogni esigenza corrisponde un processo definito, con responsabilità chiare e aggiornamenti costanti.
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {ownerChallenges.map((item) => (
              <li key={item.title} className="grid gap-2 border-t border-line py-7 last:border-b md:grid-cols-[13rem_1fr] md:gap-8" data-reveal>
                <p className="text-sm font-medium text-slate">{item.title}</p>
                <p className="flex gap-3 leading-relaxed text-navy-900">
                  <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-turq-600" strokeWidth={2} />
                  {item.solution}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Onboarding */}
      <ProcessTimeline id="metodo" title="Dal primo contatto alla gestione operativa." />

      {/* 5. Servizi inclusi */}
      <section aria-labelledby="inclusi-title" className="bg-white py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl" data-reveal>
              <p className="eyebrow">Servizi di gestione</p>
              <h2 id="inclusi-title" className="heading-2 mt-5 text-navy-900">
                Tutto ciò che serve, definito nero su bianco.
              </h2>
              <p className="lead mt-6 text-slate">
                I servizi compresi nella gestione vengono stabiliti nell&apos;accordo, in base all&apos;immobile e a ciò che
                desideri delegare.
              </p>
            </div>
            <Link
              href="/servizi"
              className="group inline-flex min-h-11 items-center gap-2 font-display text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-turq-700"
              data-reveal
            >
              Dettaglio dei servizi
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id} className="border-t border-line" data-reveal>
                <Link
                  href={`/servizi#${service.id}`}
                  className="group flex min-h-20 items-center gap-4 py-5 text-navy-900 transition-colors hover:text-turq-700"
                >
                  <ServiceIcon name={service.icon} className="size-7 shrink-0" />
                  <span className="font-display text-[0.9375rem] font-semibold">{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Commissione */}
      <CommissionSection />

      {/* 7. Simulatore */}
      <SimulatorSection />

      {/* 8. FAQ proprietari */}
      <section aria-labelledby="faq-proprietari-title" className="bg-paper py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Domande frequenti</p>
            <h2 id="faq-proprietari-title" className="heading-2 mt-5 text-navy-900">
              Le risposte che i proprietari cercano.
            </h2>
            <Link
              href="/faq"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-display text-[0.9375rem] font-semibold text-navy-900 transition-colors hover:text-turq-700"
            >
              Tutte le domande frequenti
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <FaqList items={faqByIds(ownerFaqIds)} />
          </div>
        </div>
      </section>

      {/* 9. Modulo di valutazione */}
      <section id="valutazione" aria-labelledby="valutazione-form-title" className="bg-white py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Valutazione immobile</p>
              <h2 id="valutazione-form-title" className="heading-2 mt-5 text-navy-900">
                Raccontaci il tuo immobile.
              </h2>
              <p className="lead mt-6 text-slate">
                Con poche informazioni possiamo preparare un primo confronto sulle possibilità di gestione della tua
                proprietà.
              </p>
              <ol className="mt-10 space-y-5 border-t border-line pt-8">
                {[
                  "Compila il modulo con i dati principali.",
                  "Ti ricontattiamo per approfondire caratteristiche e obiettivi.",
                  "Se ci sono i presupposti, ti presentiamo una proposta personalizzata.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-navy-900">
                    <span className="tabular flex size-7 shrink-0 items-center justify-center rounded-full border border-turq-500 font-display text-xs font-semibold text-turq-700">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-10 space-y-2 text-sm text-slate">
                <p>Preferisci un contatto diretto?</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  <a href={phoneHref} className="inline-flex min-h-10 items-center gap-2 font-semibold text-navy-900 hover:text-turq-700">
                    <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    {siteConfig.contact.phone.display}
                  </a>
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 font-semibold text-navy-900 hover:text-turq-700">
                    <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    WhatsApp
                    <span className="sr-only"> (si apre in una nuova scheda)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border border-line bg-paper/60 p-6 sm:p-8 md:p-10">
              <PropertyEvaluationForm />
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA finale */}
      <FinalCta
        title="Preferisci parlarne prima di compilare il modulo?"
        text="Fissa una consulenza: ti ascoltiamo, rispondiamo alle tue domande e valutiamo insieme se la gestione CHECK-iO fa al caso tuo."
      />
    </>
  );
}

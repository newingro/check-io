import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { FinalCta } from "@/components/home/FinalCta";
import { primaryCta } from "@/config/navigation";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Servizi di gestione affitti brevi",
  description:
    "Annunci, prenotazioni, prezzi dinamici, check-in, assistenza ospiti, pulizie, manutenzioni e rendicontazione: i servizi di property management di CHECK-iO per proprietari.",
  path: "/servizi",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title="Una gestione completa, pensata intorno al tuo immobile."
        description="Otto aree di servizio che coprono l'intero ciclo della locazione breve. Le combiniamo in base alle caratteristiche della proprietà e a ciò che desideri delegare."
        breadcrumb={{ label: "Servizi", href: "/servizi" }}
        art={{ form: "citta", camera: { yaw: -0.5 } }}
      >
        <ButtonLink href={primaryCta.href} variant="primary" tone="dark">
          {primaryCta.label}
        </ButtonLink>
      </PageHero>

      <section aria-label="Dettaglio dei servizi" className="bg-paper py-20 md:py-28 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Indice dei servizi" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-slate uppercase">Indice</p>
              <ol className="mt-5 border-l border-line">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`#${service.id}`}
                      className="-ml-px flex min-h-10 items-center gap-3 border-l border-transparent py-1.5 pl-4 text-[0.9375rem] text-slate transition-colors hover:border-turq-500 hover:text-navy-900"
                    >
                      <span className="tabular font-display text-xs font-semibold text-turq-700">{service.number}</span>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-9">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                aria-labelledby={`${service.id}-title`}
                className="grid gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 md:grid-cols-[5rem_1fr] md:gap-10 md:py-20"
                data-reveal
              >
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-6">
                  <span className="flex size-16 items-center justify-center border border-line bg-white text-navy-900">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <span className="tabular font-display text-sm font-semibold tracking-[0.12em] text-slate">{service.number}</span>
                </div>
                <div>
                  <h2 id={`${service.id}-title`} className="heading-2 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] text-navy-900">
                    {service.title}
                  </h2>
                  <p className="lead mt-5 max-w-3xl text-slate">{service.summary}</p>

                  <div className="mt-10 grid gap-8 xl:grid-cols-[1.4fr_1fr] xl:gap-10">
                    <div>
                      <h3 className="font-display text-xs font-bold tracking-[0.2em] text-navy-900 uppercase">Attività comprese</h3>
                      <ul className="mt-5 space-y-3.5">
                        {service.activities.map((activity) => (
                          <li key={activity} className="flex gap-3.5 leading-relaxed text-navy-900/85">
                            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-turq-600" strokeWidth={2} />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="self-start border-l-2 border-turq-500 bg-white p-6">
                      <h3 className="font-display text-xs font-bold tracking-[0.2em] text-turq-700 uppercase">Il vantaggio per te</h3>
                      <p className="mt-3 leading-relaxed text-navy-900">{service.benefit}</p>
                    </div>
                  </div>
                  {service.note ? <p className="mt-8 max-w-3xl text-sm leading-relaxed text-slate">{service.note}</p> : null}
                </div>
              </article>
            ))}

            <div className="mt-6 flex flex-col gap-6 border border-line bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10" data-reveal>
              <div>
                <p className="font-display text-xl font-semibold tracking-[-0.015em] text-navy-900">
                  Il perimetro dei servizi si definisce insieme.
                </p>
                <p className="mt-2 max-w-xl text-slate">
                  Ogni accordo di gestione stabilisce con chiarezza quali attività sono incluse, con quali modalità e a quali condizioni.
                </p>
              </div>
              <ButtonLink href="/contatti?richiesta=servizi#consulenza" variant="primary" tone="light" className="shrink-0">
                Parliamone in consulenza
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

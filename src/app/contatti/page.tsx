import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { siteConfig } from "@/config/site";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contatti e consulenza",
  description:
    "Contatta CHECK-iO per una consulenza sulla gestione del tuo immobile: chiamaci al +39 351 968 8178, scrivici su WhatsApp o compila il modulo di richiesta.",
  path: "/contatti",
});

export default function ContactPage() {
  const bookingUrl = siteConfig.consultation.bookingUrl;
  return (
    <>
      <PageHero
        eyebrow="Contatti"
        title="Parliamo del tuo immobile."
        description="Raccontaci la tua proprietà e le tue esigenze: ti ricontatteremo per fissare una consulenza e valutare insieme la soluzione di gestione più adatta."
        breadcrumb={{ label: "Contatti", href: "/contatti" }}
        art={{ form: "simbolo", camera: { yaw: -0.45, pitch: 0.26 } }}
      />

      <section aria-label="Canali di contatto" className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-site">
          <ul className="grid gap-px border border-line bg-line shadow-[0_30px_60px_-45px_rgb(11_26_42/0.5)] md:grid-cols-2">
            <li className="bg-white">
              <a href={phoneHref} className="group flex h-full items-center gap-5 p-7 transition-colors hover:bg-paper md:p-9">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-turq-400">
                  <Phone aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-slate">Telefono</span>
                  <span className="tabular mt-1 block font-display text-xl font-semibold tracking-[-0.01em] text-navy-900 md:text-2xl">
                    {siteConfig.contact.phone.display}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            </li>
            <li className="bg-white">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-5 p-7 transition-colors hover:bg-paper md:p-9"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-turq-500 text-navy-950">
                  <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-slate">WhatsApp</span>
                  <span className="mt-1 block font-display text-xl font-semibold tracking-[-0.01em] text-navy-900 md:text-2xl">
                    Scrivici un messaggio
                  </span>
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="size-5 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="consulenza" aria-labelledby="consulenza-form-title" className="bg-paper py-20 md:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Prenota una consulenza</p>
              <h2 id="consulenza-form-title" className="heading-2 mt-5 text-navy-900">
                Richiedi una consulenza.
              </h2>
              <p className="lead mt-6 text-slate">
                Indica la fascia oraria che preferisci: ti ricontatteremo per fissare il primo confronto sul tuo immobile.
              </p>
              <ol className="mt-10 space-y-6 border-t border-line pt-8">
                {[
                  { title: "Invia la richiesta", text: "Bastano pochi dati sul tuo immobile e sulle tue esigenze." },
                  { title: "Ti ricontattiamo", text: "Nella fascia oraria indicata, compatibilmente con la disponibilità." },
                  { title: "Fissiamo la consulenza", text: "Un confronto per capire obiettivi, servizi e prossimi passi." },
                ].map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="tabular flex size-7 shrink-0 items-center justify-center rounded-full border border-turq-500 font-display text-xs font-semibold text-turq-700">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-display font-semibold text-navy-900">{step.title}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-slate">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-turq-700 underline underline-offset-4"
                >
                  Scegli direttamente un orario disponibile
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              ) : null}
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border border-line bg-white p-6 sm:p-8 md:p-10">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

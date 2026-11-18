import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/content/services";

export function ServicesOverview() {
  return (
    <section aria-labelledby="servizi-title" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl" data-reveal>
            <p className="eyebrow">Servizi</p>
            <h2 id="servizi-title" className="heading-2 mt-5 text-navy-900">
              Ogni dettaglio, sotto controllo.
            </h2>
            <p className="lead mt-6 text-slate">
              Otto aree di servizio, coordinate da un unico interlocutore, per seguire l&apos;immobile in ogni fase: dalla
              pubblicazione dell&apos;annuncio al rendiconto.
            </p>
          </div>
          <div className="hidden lg:block" data-reveal>
            <ButtonLink href="/servizi" variant="secondary" tone="light">
              Esplora tutti i servizi
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {services.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              style={{ "--reveal-delay": `${(index % 4) * 80}ms` } as React.CSSProperties}
              className="group relative flex flex-col bg-white p-7 transition-colors duration-500 hover:bg-paper md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-turq-500 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-within:scale-x-100"
              />
              <div className="flex items-start justify-between">
                <ServiceIcon
                  name={service.icon}
                  className="text-navy-900 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                />
                <span className="tabular font-display text-xs font-semibold tracking-[0.12em] text-slate">{service.number}</span>
              </div>
              <h3 className="heading-3 mt-10 text-[1.125rem] text-navy-900">
                <Link href={`/servizi#${service.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {service.homeTitle}
                </Link>
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">{service.homeDescription}</p>
              <span
                aria-hidden="true"
                className="mt-auto inline-flex items-center gap-1.5 pt-8 font-display text-sm font-semibold text-turq-700"
              >
                Approfondisci
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 ring-2 ring-turq-500 ring-inset opacity-0 group-has-[:focus-visible]:opacity-100" />
            </li>
          ))}
        </ul>

        <div className="mt-10 lg:hidden">
          <ButtonLink href="/servizi" variant="secondary" tone="light">
            Esplora tutti i servizi
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

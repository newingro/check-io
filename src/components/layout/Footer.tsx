import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { legalNavigation, mainNavigation, primaryCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { phoneHref, whatsappHref } from "@/lib/contact";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { LogoImage } from "./Logo";

function companyDetails() {
  const c = siteConfig.company;
  const details: string[] = [];
  if (c.registeredOffice) details.push(`Sede legale: ${c.registeredOffice}`);
  if (c.vatNumber) details.push(`P. IVA ${c.vatNumber}`);
  if (c.taxCode && c.taxCode !== c.vatNumber) details.push(`C.F. ${c.taxCode}`);
  if (c.reaNumber) details.push(`REA ${c.reaNumber}`);
  if (c.shareCapital) details.push(`Capitale sociale ${c.shareCapital}`);
  if (c.pec) details.push(`PEC ${c.pec}`);
  return details;
}

export function Footer() {
  const details = companyDetails();
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 pb-28 text-white lg:pb-0" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Informazioni su CHECK-iO
      </h2>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-turq-500/40 to-transparent" />
      <div className="container-site grid grid-cols-2 gap-x-8 gap-y-14 pt-20 pb-14 lg:grid-cols-12 lg:gap-10 lg:gap-10 lg:pt-24">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-block w-[200px]" aria-label="CHECK-iO — Torna alla home">
            <LogoImage variant="full" tone="light" />
          </Link>
          <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
            Property management per proprietari di immobili destinati agli affitti brevi: gestione operativa, ospiti e
            rendicontazione, con un unico interlocutore.
          </p>
          <Link
            href={primaryCta.href}
            className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-turq-500/60 font-display text-[0.9375rem] font-semibold text-white transition-colors hover:border-turq-400 hover:text-turq-300"
          >
            {primaryCta.label}
          </Link>
        </div>

        <nav aria-label="Pagine del sito" className="lg:col-span-2 lg:col-start-6">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-white/55 uppercase">Navigazione</p>
          <ul className="mt-5 space-y-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center text-[0.9375rem] text-white/75 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servizi" className="lg:col-span-2">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-white/55 uppercase">Servizi</p>
          <ul className="mt-5 space-y-1">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/servizi#${service.id}`}
                  className="inline-flex min-h-10 items-center text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3 lg:col-start-10">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-white/55 uppercase">Contatti</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={phoneHref} className="group inline-flex min-h-10 items-center gap-3 text-[0.9375rem] text-white/85 transition-colors hover:text-white">
                <Phone aria-hidden="true" className="size-4 text-turq-400" strokeWidth={1.75} />
                <span>
                  <span className="sr-only">Telefono: </span>
                  {siteConfig.contact.phone.display}
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-10 items-center gap-3 text-[0.9375rem] text-white/85 transition-colors hover:text-white"
              >
                <MessageCircle aria-hidden="true" className="size-4 text-turq-400" strokeWidth={1.75} />
                Scrivici su WhatsApp
                <span className="sr-only"> (si apre in una nuova scheda)</span>
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-white/50">
            Operiamo con proprietari di immobili in Italia. La disponibilità del servizio nella tua zona viene verificata durante la consulenza.
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        <div className="container-site flex flex-col gap-5 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p>
              © <CurrentYear /> {siteConfig.name} — Nome commerciale di {siteConfig.company.legalName}
            </p>
            {details.length > 0 ? <p>{details.join(" · ")}</p> : null}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

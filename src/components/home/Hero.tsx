import Link from "next/link";
import { ArchitecturalArt } from "@/components/art/ArchitecturalArt";
import { ButtonLink } from "@/components/ui/Button";
import { primaryCta } from "@/config/navigation";
import { HeroScene } from "./HeroScene";

const focusAreas = ["Prenotazioni", "Ospiti", "Prezzi dinamici", "Rendicontazione"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white lg:min-h-[max(100svh,46rem)]"
    >
      {/* Livelli di sfondo */}
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_68%_45%,black_5%,transparent_68%)]" />
      <div aria-hidden="true" className="absolute top-[8%] right-[-12%] -z-20 size-[48rem] rounded-full bg-[radial-gradient(circle,rgb(8_183_169/0.16),transparent_60%)]" />
      <div aria-hidden="true" className="absolute bottom-[-20%] left-[-10%] -z-20 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(34_65_93/0.55),transparent_65%)]" />

      {/* Composizione architettonica */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[4%] right-[-38%] -z-10 aspect-square w-[150vw] max-w-none opacity-40 sm:right-[-22%] sm:w-[110vw] md:top-[10%] md:opacity-55 lg:top-1/2 lg:right-[-5%] lg:w-[60%] lg:max-w-[58rem] lg:-translate-y-[47%] lg:opacity-100"
      >
        <HeroScene>
          <ArchitecturalArt form="residenza" id="hero" />
        </HeroScene>
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(6_17_29/0.92)_0%,rgb(6_17_29/0.55)_42%,transparent_70%)] max-lg:bg-[linear-gradient(180deg,rgb(6_17_29/0.2)_0%,rgb(6_17_29/0.75)_55%,rgb(6_17_29/0.95)_100%)]" />

      <div className="container-site flex flex-1 flex-col justify-center pt-36 pb-14 lg:pt-40">
        <div className="max-w-[42rem]">
          <p className="eyebrow eyebrow-dark animate-rise [animation-delay:80ms]">Property management in Italia</p>
          <h1 id="hero-title" className="heading-display mt-7 text-white">
            <span className="block animate-lift">Il tuo immobile.</span>
            <span className="block animate-lift [animation-delay:90ms]">
              Il suo <span className="text-turq-400">massimo potenziale.</span>
            </span>
          </h1>
          <p className="lead mt-8 max-w-[36rem] animate-rise text-white/72 [animation-delay:420ms]">
            Dalla gestione delle prenotazioni all&apos;assistenza agli ospiti, ci prendiamo cura del tuo immobile con un
            servizio professionale, attento e orientato ai risultati.
          </p>
          <div className="mt-10 flex animate-rise flex-col gap-3 xs:flex-row xs:flex-wrap [animation-delay:540ms]">
            <ButtonLink href={primaryCta.href} variant="primary" tone="dark">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/servizi" variant="secondary" tone="dark" arrow={false}>
              Scopri i nostri servizi
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="container-site animate-fade [animation-delay:900ms]">
        <div className="flex items-center justify-between gap-8 border-t border-white/[0.09] py-6">
          <Link
            href="#valore"
            className="group inline-flex min-h-11 items-center gap-4 font-display text-xs font-semibold tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-white"
          >
            <span className="relative block h-9 w-px overflow-hidden bg-white/15" aria-hidden="true">
              <span className="absolute inset-0 animate-scroll-cue bg-turq-400" />
            </span>
            Scorri per scoprire
          </Link>
          <ul className="hidden items-center gap-8 text-sm text-white/50 md:flex" aria-label="Aree di gestione">
            {focusAreas.map((area) => (
              <li key={area} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-1 rounded-full bg-turq-500" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

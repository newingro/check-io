import type { Metadata } from "next";
import Link from "next/link";
import { ArchitecturalArt } from "@/components/art/ArchitecturalArt";
import { ButtonLink } from "@/components/ui/Button";
import { mainNavigation } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-32 pb-20 text-white">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-[-20%] -z-10 hidden aspect-square w-[44rem] -translate-y-1/2 opacity-80 md:block lg:right-0">
        <ArchitecturalArt form="simbolo" id="not-found" camera={{ yaw: -0.25, pitch: 0.2 }} />
      </div>
      <div className="container-site">
        <p className="eyebrow eyebrow-dark">Errore 404</p>
        <h1 className="heading-1 mt-5 max-w-2xl text-white">Questa porta non conduce da nessuna parte.</h1>
        <p className="lead mt-6 max-w-xl text-white/70">
          La pagina che cerchi non esiste o è stata spostata. Ecco alcuni percorsi utili per proseguire.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" variant="primary" tone="dark">
            Torna alla home
          </ButtonLink>
        </div>
        <nav aria-label="Pagine principali" className="mt-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {mainNavigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-turq-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

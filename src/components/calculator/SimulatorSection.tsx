import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevenueSimulator } from "./RevenueSimulator";

export function SimulatorSection({ id = "simulatore" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="on-dark relative isolate overflow-hidden bg-navy-950 py-24 text-white md:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(8_183_169/0.12),transparent_65%)]" />
      <div className="container-site">
        <SectionHeader
          id={`${id}-title`}
          eyebrow="Simulatore di redditività"
          tone="dark"
          title="Quanto potrebbe rendere il tuo immobile?"
          description="Esplora uno scenario ipotetico e scopri come possono incidere occupazione, tariffa media e commissione di gestione."
        />
        <div className="mt-14 md:mt-16" data-reveal>
          <RevenueSimulator />
        </div>
      </div>
    </section>
  );
}

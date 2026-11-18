import { processSteps } from "@/content/home";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessTimeline({
  id = "metodo",
  title = "Affidare il tuo immobile è semplice.",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="on-dark relative isolate overflow-hidden bg-navy-900 py-24 text-white md:py-32 lg:py-40">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(180deg,transparent,black_30%,black_70%,transparent)]" />
      <div className="container-site">
        <SectionHeader
          id={`${id}-title`}
          eyebrow="Come funziona"
          tone="dark"
          title={title}
          description="Un percorso in quattro fasi, costruito sul dialogo: ogni decisione viene condivisa con te prima di essere messa in pratica."
        />

        <ol className="relative mt-16 grid gap-0 md:mt-24 lg:grid-cols-4 lg:gap-10">
          {/* Linea orizzontale (desktop) */}
          <span aria-hidden="true" className="absolute top-[1.375rem] right-0 left-0 hidden h-px bg-white/12 lg:block" />
          <span aria-hidden="true" data-reveal-line className="absolute top-[1.375rem] left-0 hidden h-px w-full bg-gradient-to-r from-turq-500 via-turq-400 to-turq-500/0 lg:block" />
          {/* Linea verticale (mobile) */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-white/12 lg:hidden" />

          {processSteps.map((step, index) => (
            <li
              key={step.number}
              data-reveal
              style={{ "--reveal-delay": `${index * 140}ms` } as React.CSSProperties}
              className="relative grid grid-cols-[2.75rem_1fr] gap-x-6 pb-12 last:pb-0 lg:block lg:pb-0"
            >
              <span className="tabular relative z-10 flex size-11 items-center justify-center rounded-full border border-turq-500/70 bg-navy-900 font-display text-sm font-semibold text-turq-300">
                {step.number}
              </span>
              <div className="lg:mt-10">
                <h3 className="heading-3 text-[1.3125rem] text-white">{step.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-white/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-2xl border-l border-turq-500/60 pl-5 text-sm leading-relaxed text-white/55 md:mt-20" data-reveal>
          L&apos;avvio della gestione avviene dopo la verifica dell&apos;immobile, gli eventuali sopralluoghi e la
          sottoscrizione dell&apos;accordo di gestione.
        </p>
      </div>
    </section>
  );
}
